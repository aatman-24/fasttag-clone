package com.productmonth.fasttag.Service;


import com.productmonth.fasttag.Dto.BalanceDto;
import com.productmonth.fasttag.Dto.DeductBalanceDto;
import com.productmonth.fasttag.Dto.RechargeCardDto;
import com.productmonth.fasttag.Entity.*;
import com.productmonth.fasttag.Exception.BalanaceInSufficientException;
import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class CardServices {

    @Autowired
    CardRepository cardRepository;

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    VehicleServices vehicleServices;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TransactionService transactionService;

    @Autowired
    CardServices cardServices;

    @Autowired
    TollStationService tollStationService;

    private final long DURATION_MINTUES = 2;


    public Card getCardById(String cardId) {
        if (cardRepository.findById(cardId).isPresent()) {
            return cardRepository.findById(cardId).get();
        }
        throw new NotFoundException("Card with " + cardId + " card id not found");
    }

    public List<Card> getAllCards() {
        return cardRepository.findAll();
    }

    public ArrayList<Card> getLoggedUserCards(Integer pageNumber,Integer pageSize) {
        List<Vehicle> vehicles = vehicleServices.getLoggedVehicles();
        ArrayList<Card> cards = new ArrayList<Card>();
        for(Vehicle v: vehicles) {
            Card card = cardRepository.findByVehicle(v);
            cards.add(card);
        }
        //here we can't do normal by-default pagination that is their...
        if(cards.size()<=pageSize)
            return cards;
        ArrayList<Card> paginated_cards=new ArrayList<>();
        int start_index=pageNumber*pageSize;
        int i=start_index;
        int n=pageSize;
        while(i<cards.size()==true && n>0){
            paginated_cards.add(cards.get(i));
            i++;
            n--;
        }
        return paginated_cards;
    }

    public Integer noOfCardsForLoggedUser(){
        List<Vehicle> vehicles = vehicleServices.getLoggedVehicles();
        return vehicles.size();
    }



    public BalanceDto checkBalance(String cardId) {
        Card card = getCardById(cardId);
        Vehicle vehicle = card.getVehicle();
        Wallet wallet = vehicle.getWallet();
        BalanceDto balanceDto = new BalanceDto();
        balanceDto.setBalance(wallet.getBalance());
        return balanceDto;

    }

    public Vehicle vehicleInfo(String cardId) {
        /*->we have done all these checks inside a fn will-call that fn only
        if (cardRepository.findById(cardId).isPresent()) {
            Card card = cardRepository.findById(cardId).get();
            return card.getVehicle();
        }
        throw new NotFoundException("Card with that id " + cardId + " is not present ");*/
        Card card=getCardById(cardId);
        return card.getVehicle();
    }

    public Card getCardByVehicle(Vehicle vehicle) {
        return cardRepository.findByVehicle(vehicle);
    }


    public BalanceDto rechargeCard(String cardId, RechargeCardDto rechargeCardDto) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Card card = getCardById(cardId);
        Vehicle vehicle = card.getVehicle();
        Wallet wallet = vehicle.getWallet();

        double presentAmount = wallet.getBalance();
        double updatedAmount = presentAmount + rechargeCardDto.getAmount();
        wallet.setBalance(updatedAmount);
        Wallet updatedWallet = walletRepository.save(wallet);

        vehicle.setWallet(updatedWallet);
        Vehicle upadtedVehicle = vehicleRepository.save(vehicle);

        card.setVehicle(upadtedVehicle);
        cardRepository.save(card);

        Transaction transaction = new Transaction();
        transaction.setAmount(rechargeCardDto.getAmount());
        transaction.setCardId(cardId);

        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();

        TollStation tollStation = tollStationService.getTollStationById(1);
        transaction.setTollStation(tollStation);
        transaction.setDate(date);
        transaction.setUsername(username);
        transactionRepository.save(transaction);


        BalanceDto balanceDto = new BalanceDto();
        balanceDto.setBalance(updatedWallet.getBalance());
        return balanceDto;
    }


    public String deleteCard(String cardId) {
        Card card = getCardById(cardId);
        cardRepository.delete(card);
        return "Card is deleted successfully";
    }

    public long getDiffBetweenDate(Date start_date) {
        Date currDate = new Date();
        long difference_In_Time = currDate.getTime() - start_date.getTime();
        long mintues = (difference_In_Time / (1000 * 60));
        return mintues;
    }


    public BalanceDto deductBalance(DeductBalanceDto deductBalanceDto) {

        TollStation tollStation = tollStationService.getTollStationById(deductBalanceDto.getTollStationId());
        Card card = cardServices.getCardById(deductBalanceDto.getCardId());

        Vehicle vehicle = card.getVehicle();
        Wallet wallet = vehicle.getWallet();

        Transaction lastTransaction = transactionService.getRecentTransactionOfCard(card.getCardId(), tollStation);
        if(lastTransaction != null) {
            Date lastTransactionTime = lastTransaction.getDate();
            long minutes = getDiffBetweenDate(lastTransactionTime);
            if(minutes <= DURATION_MINTUES) {
                BalanceDto balanceDto = new BalanceDto();
                balanceDto.setBalance(wallet.getBalance());
                balanceDto.setOpen(true);
                return balanceDto;
            }
        }


        double currBalance = wallet.getBalance();
        double deductedBalance = 0;

        List<TollPrice> tollPrices = tollStation.getTollPrices();
        for (TollPrice tollPrice : tollPrices) {
            if (tollPrice.getType() == vehicle.getVehicleType())
                deductedBalance = tollPrice.getPrice();
        }

        // balance is not sufficient.
        if (currBalance < deductedBalance) {
            BalanceDto balanceDto = new BalanceDto();
            balanceDto.setBalance(currBalance);
            balanceDto.setOpen(false);
            return balanceDto;
        }

        Transaction transaction = new Transaction();
        transaction.setAmount(-1.0 * deductedBalance);
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        //System.out.println(formatter.format(date));
        transaction.setDate(date);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        transaction.setUsername(vehicle.getUsername());
        transaction.setCardId(deductBalanceDto.getCardId());
        transaction.setTollStation(tollStation);
        transactionRepository.save(transaction);

        //and we will return the remaining amount that is their left on the card..
        wallet.setBalance(currBalance - deductedBalance);
        Wallet savedWallet = walletRepository.save(wallet);

        vehicle.setWallet(savedWallet);
        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        card.setVehicle(savedVehicle);
        cardRepository.save(card);

        BalanceDto balanceDto = new BalanceDto();
        balanceDto.setBalance(wallet.getBalance());
        balanceDto.setOpen(true);
        return balanceDto;
    }
}

