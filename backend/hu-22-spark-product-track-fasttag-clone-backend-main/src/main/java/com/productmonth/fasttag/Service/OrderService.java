package com.productmonth.fasttag.Service;

import com.productmonth.fasttag.Dto.OrderDemoDto;
import com.productmonth.fasttag.Dto.OrderDto;
import com.productmonth.fasttag.Entity.*;
import com.productmonth.fasttag.Exception.AlreadyFoundException;
import com.productmonth.fasttag.Exception.NotFoundException; //custom exception hai
import com.productmonth.fasttag.Exception.VehicleExistException;
import com.productmonth.fasttag.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Random;


@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    VehicleRepository vehicleRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    TollStationRepository tollStationRepository;

    @Autowired
    TollStationService tollStationService;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    /*->we have to make sure that this should run only once so that pincode is not repeated as it is
    set as a unique inside the entity*/
    public String addingOfficeTollStation() {

        /*this is used to add an office toll station that will further attached with the transaction
        at the time of purchasing the card and recharging the card*/
        if(!tollStationRepository.findById(1).isPresent()) {
            TollStation tollStation=new TollStation();
            Location location=new Location();
            location.setState("Karnataka");
            location.setPincode("123456"); //unique..
            location.setHighway("NH-1");
            location.setCity("Bangalore");

            Location officeLocation=locationRepository.save(location);
            //now we will do the association of toll-station and the location
            tollStation.setLocation(officeLocation);
            tollStation.setTollStationId(1);
            tollStation.setName("Main Office");

            tollStationRepository.save(tollStation);

            return "Head Office added successfully";
        }

        return "Already Present";
    }

    private Vehicle createVehicle(OrderDto orderDto) {

        if(vehicleRepository.findById(orderDto.getNumberPlate()).isPresent()) {
            throw new VehicleExistException("Vehical with " + orderDto.getNumberPlate() + "  number plate is already exist");
        }
        Vehicle vehicle=new Vehicle();
        vehicle.setVehicleType(orderDto.getVehicleType());
        vehicle.setNumberPlate(orderDto.getNumberPlate());
        vehicle.setRegistrationNo(orderDto.getRegistrationNo());
        return vehicle;
    }


    private Wallet createWallet(OrderDto orderDto) {
        Wallet wallet=new Wallet();
        if(orderDto.getVehicleType()== VehicleType.BIKE)
            wallet.setBalance(50);
        else if(orderDto.getVehicleType()== VehicleType.CAR)
            wallet.setBalance(100);
        else if(orderDto.getVehicleType()==VehicleType.BUS)
            wallet.setBalance(150);
        else if(orderDto.getVehicleType()==VehicleType.TRUCK)
            wallet.setBalance(200);
        return wallet;
    }

    static String getAlphaNumericString(int n)
    {

        // chose a Character random from this String
        String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                + "0123456789";

        // create StringBuffer size of AlphaNumericString
        StringBuilder sb = new StringBuilder(n);

        for (int i = 0; i < n; i++) {

            // generate a random number between
            // 0 to AlphaNumericString variable length
            int index
                    = (int)(AlphaNumericString.length()
                    * Math.random());

            // add Character one by one in end of sb
            sb.append(AlphaNumericString
                    .charAt(index));
        }

        return sb.toString();
    }



    String getRandomCardId() {
        String generatedString = getAlphaNumericString(8);
        System.out.println(generatedString);
        String cardID = "";
        for(int i = 0; i < 8; i++) {
            cardID += generatedString.charAt(i);
            if(i % 2 != 0) {
                cardID += " ";
            }
        }
        return cardID;
    }


    private Card createCard(Vehicle savedVehicle, String cardId) {
        Card card = new Card();
        if(cardId == null) {
            cardId = getRandomCardId();
        }
        card.setCardId(cardId);
        card.setVehicle(savedVehicle);
        return cardRepository.save(card);
    }


    private Order createOrder(Card card, String username) {

        Order order=new Order();
        order.setCardId(card.getCardId());

        //now we will fetch the username from the jwt-token
        order.setUsername(username);

        //now we will fetch the exact-date at which the order-has been-placed
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = new Date();
        System.out.println("format of date is "+formatter.format(date));
        order.setOrder_date(date);
        //now we will make an entry-inside the order-table
        return orderRepository.save(order);
    }


    private Transaction createTransaction(Card card, OrderDto orderDto, String username) {

        Transaction transaction=new Transaction();
        transaction.setCardId(card.getCardId());

        Date date = new Date();
        transaction.setDate(date);

        if(orderDto.getVehicleType()== VehicleType.BIKE)
            transaction.setAmount(150);
        else if(orderDto.getVehicleType()== VehicleType.CAR)
            transaction.setAmount(200);
        else if(orderDto.getVehicleType()==VehicleType.BUS)
            transaction.setAmount(250);
        else if(orderDto.getVehicleType()==VehicleType.TRUCK)
            transaction.setAmount(300);

        TollStation officeTollStation=tollStationService.getTollStationById(1);
        //purchase-card and recharge-card is done at the office-tollstation only
        transaction.setTollStation(officeTollStation);
        transaction.setUsername(username);
        return transactionRepository.save(transaction);
    }


    public String purchaseCard(OrderDto orderDto) {

        // Get User from the jwt token
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByName(username);

        Vehicle vehicle = createVehicle(orderDto);

        Wallet wallet = createWallet(orderDto);

        //  entry in the vehicle table has been done...
        Wallet savedWallet=walletRepository.save(wallet);

        //  the association between the vehicle and the wallet is done
        vehicle.setWallet(savedWallet);

        //  entry in the vehicle table is done
        Vehicle savedVehicle=vehicleRepository.save(vehicle);

        // Add Vehicle Into the User.
        //this is the association and it will set the username entry inside the vehicle entity
        user.addVehicle(savedVehicle);
        userRepository.save(user);

        // Create Card.
        Card savedCard = createCard(savedVehicle, null);

        Order placedOrder = createOrder(savedCard, username);

        Transaction savedTransaction = createTransaction(savedCard, orderDto, username);

        return "Card Purchased Successfully";
    }


    public String purchaseCardDemo(OrderDemoDto orderDemoDto) {

        OrderDto orderDto = new OrderDto();
        orderDto.setNumberPlate(orderDemoDto.getNumberPlate());
        orderDto.setRegistrationNo(orderDemoDto.getRegistrationNo());
        orderDto.setVehicleType(orderDemoDto.getVehicleType());

        // Get User from the jwt token
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByName(username);

        Vehicle vehicle = createVehicle(orderDto);

        Wallet wallet = createWallet(orderDto);

        //  entry in the vehicle table has been done...
        Wallet savedWallet=walletRepository.save(wallet);

        //  the association between the vehicle and the wallet is done
        vehicle.setWallet(savedWallet);

        //  entry in the vehicle table is done
        Vehicle savedVehicle=vehicleRepository.save(vehicle);

        // Add Vehicle Into the User.
        //this is the association and it will set the username entry inside the vehicle entity
        user.addVehicle(savedVehicle);
        userRepository.save(user);

        // Create Card.
        Card savedCard = createCard(savedVehicle, orderDemoDto.getCardId());

        Order placedOrder = createOrder(savedCard, username);

        Transaction savedTransaction = createTransaction(savedCard, orderDto, username);

        return "Card Purchased Successfully";
    }




    //get the order list corresponding to a particular user
    public List<Order> orderListforUser(){
        //now here we need to query the Order table and for that we need to define a method inside OrderRepo
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        if(userRepository.findById(username).isPresent()) {
            return orderRepository.findByusername(username);
        }
        throw  new NotFoundException("User with that username "+username+" is not present");
    }


    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }


    public String deleteOrderById(Integer orderId){
        if(orderRepository.findById(orderId).isPresent()){
            orderRepository.deleteById(orderId);
            return "Order is deleted successfully";
        }
        throw new NotFoundException("Order with the order id "+orderId+" is not present");
    }
}
