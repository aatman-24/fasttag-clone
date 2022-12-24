package com.productmonth.fasttag.Service;

import com.productmonth.fasttag.Dto.TollStationDto;
import com.productmonth.fasttag.Entity.Location;
import com.productmonth.fasttag.Entity.TollPrice;
import com.productmonth.fasttag.Entity.TollStation;
import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Repository.LocationRepository;
import com.productmonth.fasttag.Repository.TollStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TollStationService {

    @Autowired
    TollStationRepository tollStationRepository;


    @Autowired
    LocationRepository locationRepository;


    public TollStation addTollStation(TollStationDto tollStationDto) {

        Location location = new Location();
        location.setCity(tollStationDto.getCity());
        location.setHighway(tollStationDto.getHighway());
        location.setPincode(tollStationDto.getPincode());
        location.setState(tollStationDto.getState());

        //an entry has been made inside the location table
        //i think it is not required to do a separate entry like this we hava one to one mapping
        //Location savedLocation = locationRepository.save(location);

        TollStation tollStation = new TollStation();
        tollStation.setName(tollStationDto.getName());

        //here we have done the association of the toll-station with the location table.
        //an entry will be automatically made inside the location table with a new location_id
        tollStation.setLocation(location);

        //here we have  done  the entry inside the TollStation Table
        return tollStationRepository.save(tollStation);
    }



    public List<TollStation> getAllStation(Integer pageNumber,Integer pageSize) {
        Pageable pageable= PageRequest.of(pageNumber,pageSize);
        Page<TollStation> tollStationPage=tollStationRepository.findAll(pageable);
        List<TollStation> tollStationList=tollStationPage.getContent();
        return tollStationList;
        //List<TollStation> tollStationList=tollStationRepository.findAll();
    }

    public Long totalNoofTollSation(){
        return tollStationRepository.count();
    }


    /*->this fn will be used when-ever  we need to find a tollStation by it's Id this is done so that
    we don't have to repeatedly return the same exception again and again
    ->we can use this function anywhere inside our application by just doing the dependency-injection
    of this service and then we can use all the methods that are defined here*/
    public TollStation getTollStationById(Integer tollStationId) {
        if (tollStationRepository.findById(tollStationId).isPresent()) {
            return tollStationRepository.findById(tollStationId).get();
        }
        throw new NotFoundException("the TollStation with the Id " + tollStationId + " is not present");
    }




    public TollStation updateTollStation(TollStationDto tollStationDto, Integer tollStationId) {

        TollStation tollStation = getTollStationById(tollStationId);
        tollStation.setName(tollStationDto.getName());

        Location location = tollStation.getLocation();
        location.setCity(tollStationDto.getCity());
        location.setHighway(tollStationDto.getHighway());
        location.setPincode(tollStationDto.getPincode());
        location.setState(tollStationDto.getState());
        //it will happen-automatically bcz all the type of cascading is applied
        //location = locationRepository.save(location);

        // set the updated location back to the toll-station.
        tollStation.setLocation(location);

        System.out.println(tollStation);

        return  tollStationRepository.save(tollStation);
    }


    public String deleteTollStationById(Integer tollStationId) {
        TollStation tollStation=getTollStationById(tollStationId);
        tollStationRepository.delete(tollStation);
        return "Toll Station with " + tollStationId + " toll station id is deleted successfully!!!";
        /*->this is done already in the function no need to write here again
        if (tollStationRepository.findById(tollStationId).isPresent()) {
            TollStation tollStation = tollStationRepository.findById(tollStationId).get();
            //due to cascade.All the corresponding location entry will be deleted automatically
            tollStationRepository.delete(tollStation);
            return "Toll Station with " + tollStationId + " toll station id is deleted successfully.";
        }
        throw new NotFoundException("the TollStation with the Id " + tollStationId + " is not present");*/
    }


    public List<TollPrice> getTollPricesOfTollStation(Integer tollStationId) {
        TollStation tollStation = getTollStationById(tollStationId);
        return tollStation.getTollPrices();
    }
}
