package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.BalanceDto;
import com.productmonth.fasttag.Dto.DeductBalanceDto;
import com.productmonth.fasttag.Dto.RechargeCardDto;
import com.productmonth.fasttag.Entity.Card;
import com.productmonth.fasttag.Entity.Vehicle;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.CardServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CardControllers {

    @Autowired
    CardServices cardServices;

    @RequestMapping(value = "/user/check-balance/{cardId}", method = RequestMethod.GET)
    public Response<BalanceDto> checkBalance(@PathVariable("cardId") String cardId){
        BalanceDto balancedto = cardServices.checkBalance(cardId);
        Response<BalanceDto> response=new Response<>();
        response.setBody(balancedto);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/user/vehicle-info/{cardId}",method = RequestMethod.GET)
    public Response<Vehicle> vehicleInfo(@PathVariable("cardId") String cardId){
        Vehicle vehicle=cardServices.vehicleInfo(cardId);
        Response<Vehicle> response=new Response<>();
        response.setBody(vehicle);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value="/user/recharge-card/{cardId}",method = RequestMethod.POST)
    public Response<BalanceDto> rechargeCard(@PathVariable("cardId") String cardId, @RequestBody  RechargeCardDto rechargeCardDto) {
        BalanceDto balanceDto = cardServices.rechargeCard(cardId, rechargeCardDto);
        Response<BalanceDto> response = new Response<>();
        response.setBody(balanceDto);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    //I think this api will be hit from the node-red server....
    @RequestMapping(value = "/user/deduct-balance", method = RequestMethod.POST)
    @PreAuthorize("hasRole('Admin')")
    public Response<BalanceDto> deductBalance(@RequestBody DeductBalanceDto deductBalanceDto){
        BalanceDto balanceDto = cardServices.deductBalance(deductBalanceDto);
        Response<BalanceDto> response=new Response<>();
        response.setBody(balanceDto);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value="/user/card/{cardId}",method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('Admin')")
    public Response<String> deleteCard(@PathVariable("cardId") String cardId){
        String message = cardServices.deleteCard(cardId);
        Response<String> response = new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/admin/cards",method = RequestMethod.GET)
    @PreAuthorize("hasRole('Admin')")
    public Response<List<Card>> getAllCards(){
        List<Card> cards = cardServices.getAllCards();
        Response<List<Card>> response=new Response<>();
        response.setBody(cards);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    //adding pagination here also
    @RequestMapping(value = "/user/cards",method = RequestMethod.GET)
    public Response<ArrayList<Card>> getLoggedUserCards(
            @RequestParam(value="pageNumber",defaultValue = "0",required = false) Integer pageNumber,
            @RequestParam(value="pageSize", defaultValue = "3",required = false) Integer pageSize
    ){
        ArrayList<Card> cards = cardServices.getLoggedUserCards(pageNumber,pageSize);
        Response<ArrayList<Card>> response=new Response<>();
        response.setBody(cards);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/user/number/card",method = RequestMethod.GET)
    public Response<Integer> noOfCardsForLoggedUser(){
        Integer cardNumber=cardServices.noOfCardsForLoggedUser();
        Response<Integer> response=new Response<>();
        response.setBody(cardNumber);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }
}
