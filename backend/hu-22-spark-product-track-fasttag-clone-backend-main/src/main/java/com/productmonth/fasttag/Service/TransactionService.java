package com.productmonth.fasttag.Service;

import com.productmonth.fasttag.Entity.TollStation;
import com.productmonth.fasttag.Entity.Transaction;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class TransactionService {

    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    TollStationService tollStationService;

    public List<Transaction> getAllTransactions() {
        return (List<Transaction>) transactionRepository.findAll();
    }


    public List<Transaction> getTransactionsByCardId(String cardId) {
        List<Transaction> transactions = transactionRepository.findByCardId(cardId);
        return transactions;
    }


    public List<Transaction> getTransactionByDate(Date date) {
        List<Transaction> transactions = transactionRepository.findByDate(date);
        return transactions;

    }

    //this will give us the transactions of the logged in user
    public List<Transaction> getTransactionsByUsername(Integer pageNumber,Integer pageSize) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Pageable pageable= PageRequest.of(pageNumber,pageSize);
        List<Transaction> transactions = transactionRepository.findByUsername(username,pageable);
        return transactions;
    }

    public List<Transaction> getTransactionByTollStation(Integer tollStationId) {
        TollStation tollStation = tollStationService.getTollStationById(tollStationId);
        System.out.println("START");
        List<Transaction> transactions = transactionRepository.findByTollStation(tollStation);
        System.out.println("END");
        return transactions;
    }

    public Long getNoOfTransactions(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return transactionRepository.getNoOfTransaction(username).parallelStream().count();
    }

    public Transaction getRecentTransactionOfCard(String cardID, TollStation tollStation) {
        List<Transaction> transactions = transactionRepository.getRecentTransactions(cardID, tollStation);
        if(transactions.size() > 0) {
            return  transactions.get(0);
        }
        return null;
    }
}
