package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.OrderDemoDto;
import com.productmonth.fasttag.Dto.OrderDto;
import com.productmonth.fasttag.Entity.Order;
import com.productmonth.fasttag.Entity.Transaction;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostConstruct //will run for 1 time the moment we start our application...
     public Response<String> addingOfficeTollStation(){
         String res = orderService.addingOfficeTollStation();
         Response<String> response=new Response<>();
         response.setBody(res);
         response.setStatus(new Status(200, "SUCCESS", "office-toll-station-added"));
         return response;
     }

    @RequestMapping(value = "/purchase-card",method = RequestMethod.POST)
    public Response<String> purchaseCard(@RequestBody OrderDto orderDto){
        String message=orderService.purchaseCard(orderDto);
        Response<String> response=new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "card is" +
                " purchased successfully"));
        return  response;
    }


    @RequestMapping(value = "/purchase-card/demo",method = RequestMethod.POST)
    public Response<String> purchaseCard(@RequestBody OrderDemoDto orderDto){
        String message=orderService.purchaseCardDemo(orderDto);
        Response<String> response=new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "card is" +
                " purchased successfully"));
        return  response;
    }


    //now we need to fetch all the orders on the basis of the username
    @RequestMapping(value = "/user/recent-orders",method = RequestMethod.GET)
    public Response<List<Order>> orderListforUser(){
        List<Order> list = orderService.orderListforUser();
        Response<List<Order>> response=new Response<>();
        response.setBody(list);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/orders",method = RequestMethod.GET)
    @PreAuthorize("hasRole('Admin')")
    public Response<List<Order>> getAllOrders(){
        List<Order> allOrders=orderService.getAllOrders();
        Response<List<Order>> response=new Response<>();
        response.setBody(allOrders);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/order/{OrderID}",method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('Admin')")
    public Response<String> deleteOrderById(@PathVariable("OrderID") Integer orderId){
         String res=orderService.deleteOrderById(orderId);
         Response<String> response=new Response<>();
         response.setBody(res);
         response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
         return  response;
    }
}
