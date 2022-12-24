package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.TollPriceDto;
import com.productmonth.fasttag.Entity.TollPrice;
import com.productmonth.fasttag.Entity.TollStation;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.TollPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TollPriceController {

    @Autowired
    private TollPriceService tollPriceService;

    @RequestMapping(value = "/admin/toll-price", method = RequestMethod.POST)
    public Response<TollStation> addTollPrice(@RequestBody TollPriceDto tollPriceDto){
        TollStation tollStation = tollPriceService.addTollPrice(tollPriceDto);
        Response<TollStation> response=new Response<>();
        response.setBody(tollStation);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/admin/toll-price",method = RequestMethod.PUT)
    public Response<TollStation> updateTollPrice(@RequestBody TollPriceDto tollPriceDto){
        TollStation updatedTollStation = tollPriceService.updateTollPrice(tollPriceDto);
        Response<TollStation> response=new Response<>();
        response.setBody(updatedTollStation);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/admin/toll-prices",method = RequestMethod.GET)
    public Response<List<TollPrice>> getAllTollPrice(){
        List<TollPrice> tollPrices=tollPriceService.getAllTollPrice();
        Response<List<TollPrice>> response=new Response<>();
        response.setBody(tollPrices);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/admin/toll-price/{tollPriceId}", method = RequestMethod.PUT)
    public Response<TollPrice> updateTollPrice(@PathVariable("tollPriceId") Integer tollPriceId){
        TollPrice tollPrice = tollPriceService.getTollPriceById(tollPriceId);
        Response<TollPrice> response=new Response<>();
        response.setBody(tollPrice);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/admin/toll-price/{tollPriceId}",method = RequestMethod.DELETE)
    public Response<String> deleteTollPrice(@PathVariable("tollPriceId") Integer tollPriceId){
        String message  = tollPriceService.deleteTollPrice(tollPriceId);
        Response<String> response=new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }
}
