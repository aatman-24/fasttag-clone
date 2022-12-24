package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Entity.Transaction;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class TransactionController {

    @Autowired
    TransactionService transactionService;

    @RequestMapping(value="/transactions", method = RequestMethod.GET)
    @PreAuthorize("hasRole('Admin')")
    public Response<List<Transaction>>getAllTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        Response<List<Transaction>> response = new Response<>();
        response.setBody(transactions);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;
    }

    //we can see the transactions corresponding to a particular card
    @RequestMapping(value="/transactions/card/{cardId}", method = RequestMethod.GET)
    public Response<List<Transaction>> getTransactionsByCardId(@PathVariable("cardId") String cardId) {
        System.out.println(cardId);
        List<Transaction> transactions = transactionService.getTransactionsByCardId(cardId);
        Response<List<Transaction>> response = new Response<>();
        response.setBody(transactions);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;

    }

    @RequestMapping(value="/transactions/{date}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('Admin')")
    public Response<List<Transaction>> getTransactionsByDate(@PathVariable("date") Date date){
        List<Transaction> transactions = transactionService.getTransactionByDate(date);
        Response<List<Transaction>> response = new Response<>();
        response.setBody(transactions);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    //this will give us all the transactions of the logged in user
    @RequestMapping(value="/user/transactions", method = RequestMethod.GET)
    public Response<List<Transaction>>  getTransactionsByUsername(
            @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
            @RequestParam(value = "pageSize",defaultValue = "3",required = false) Integer pageSize
    ){
        List<Transaction> transactions = transactionService.getTransactionsByUsername(pageNumber,pageSize);
        Response<List<Transaction>> response= new Response<>();
        response.setBody((transactions));
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    //the admin will be able to see all the transactions corresponding to a particular toll-station
    @RequestMapping(value="/admin/transactions/toll-station/{tollStationId}", method = RequestMethod.GET)
    @PreAuthorize("hasRole('Admin')")
    public Response<List<Transaction>> getTransactionByTollStation(@PathVariable("tollStationId") int tollStationId){
        List<Transaction> transactions = transactionService.getTransactionByTollStation(tollStationId);
        Response<List<Transaction>> response= new Response<>();
        response.setBody((transactions));
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value="/user/number/transaction",method = RequestMethod.GET)
    public Response<Long> getNoOfTransactions(){
        Long transactions=transactionService.getNoOfTransactions();
        Response<Long> response=new Response<>();
        response.setBody(transactions);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }
}
