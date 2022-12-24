package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.TollStationDto;
import com.productmonth.fasttag.Entity.TollPrice;
import com.productmonth.fasttag.Entity.TollStation;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.TollStationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@Slf4j
public class TollStationController {
    
    @Autowired
    TollStationService tollStationService;

    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value = "/admin/toll-station",method = RequestMethod.POST)
    public Response<TollStation> addTollStation(@RequestBody TollStationDto tollStationDto){
        TollStation tollStation=tollStationService.addTollStation(tollStationDto);
        Response<TollStation> response=new Response<>();
        response.setBody(tollStation);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value = "/admin/toll-station/{tollStationId}",method = RequestMethod.PATCH)
    public Response<TollStation> updateTollStation(@RequestBody TollStationDto tollStationDto, @PathVariable("tollStationId") Integer tollStationId){
        TollStation updatedTollStation=tollStationService.updateTollStation(tollStationDto,tollStationId);
        Response<TollStation> response=new Response<>();
        response.setBody(updatedTollStation);
        response.setStatus(new Status(200, "SUCCESS", "Toll Station is updated"));
        return response;
    }

    //here we have to add the pagination...the pageNumber and pageSize will come alongwith the url as parameter
    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value="/admin/toll-stations",method = RequestMethod.GET)
    public Response<List<TollStation>> getAllTollStation(
            @RequestParam(value = "pageNumber",defaultValue = "0",required = false) Integer pageNumber,
            @RequestParam(value="pageSize", defaultValue = "2",required = false) Integer pageSize
    ){
        log.info("the value of pagenumber is "+pageNumber+" and that of size is "+pageSize);
        List<TollStation> tollStations=tollStationService.getAllStation(pageNumber,pageSize);
        Response<List<TollStation>> response=new Response<>();
        response.setBody(tollStations);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value = "/admin/toll-station/{tollStationId}",method = RequestMethod.GET)
    public Response<TollStation> getTollStationById(@PathVariable("tollStationId") Integer tollStationId){
        TollStation tollStation=tollStationService.getTollStationById(tollStationId);
        Response<TollStation> response=new Response<>();
        response.setBody(tollStation);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value="/admin/toll-station/{tollStationId}",method = RequestMethod.DELETE)
    public Response<String> deleteTollStationById(@PathVariable("tollStationId") Integer tollStationId){
        String message = tollStationService.deleteTollStationById(tollStationId);
        Response<String> response=new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }



    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value = "/admin/toll-station/{tollStationId}/toll-prices",method = RequestMethod.GET)
    public Response<List<TollPrice>> getTollPricesOfTollStation(@PathVariable("tollStationId") Integer tollStationId){
        List<TollPrice> tollPrices = tollStationService.getTollPricesOfTollStation(tollStationId);
        Response<List<TollPrice>> response = new Response<>();
        response.setBody(tollPrices);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @PreAuthorize("hasRole('Admin')")
    @RequestMapping(value="/admin/total/toll-station",method = RequestMethod.GET)
    public Response<Long> totalNoofTollSation(){
        Long total=tollStationService.totalNoofTollSation();
        Response<Long> response=new Response<>();
        response.setBody(total);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }
}
