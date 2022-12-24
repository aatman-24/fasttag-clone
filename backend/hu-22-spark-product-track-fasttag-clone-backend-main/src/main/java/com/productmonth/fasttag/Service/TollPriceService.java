package com.productmonth.fasttag.Service;
import com.productmonth.fasttag.Dto.TollPriceDto;
import com.productmonth.fasttag.Entity.TollPrice;
import com.productmonth.fasttag.Entity.TollStation;
import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Repository.TollPriceRepository;
import com.productmonth.fasttag.Repository.TollStationRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class TollPriceService {

    @Autowired
    TollStationRepository tollStationRepository;

    @Autowired
    TollPriceRepository tollPriceRepository;

    //we can autowire a service inside another service and use all of it's method...
    @Autowired
    TollStationService tollStationService;


    public TollStation addTollPrice(TollPriceDto tollPriceDto) {

        TollPrice tollPrice = new TollPrice();
        tollPrice.setPrice(tollPriceDto.getPrice());
        tollPrice.setType(tollPriceDto.getType());

        //on this particular toll-station this toll-price have been added
        Integer tollStationId = tollPriceDto.getTollStationId();
        tollPrice.setTollStationId(tollStationId);
        TollStation tollStation=tollStationService.getTollStationById(tollStationId);
        List<TollPrice> tollPrices=tollStation.getTollPrices();
        tollPrices.add(tollPrice);
        tollStation.setTollPrices(tollPrices);
        return tollStationRepository.save(tollStation);
        /*this is the toll-station where in the list we will add the toll-price corresponding to a vehicle-type
        if(tollStationRepository.findById(tollStationId).isPresent()) {
            TollStation tollStation = tollStationService.getTollStationById(tollStationId);




            List<TollPrice> tollPrices = tollStation.getTollPrices();
            tollPrices.add(tollPrice); //we have added it in the toll-station..

            tollStation.setTollPrices(tollPrices);

            //TollPrice savedTollPrice = tollPriceRepository.save(tollPrice);

            //TollStation savedTollStation = tollStationRepository.save(tollStation);
            //this was causing the double entry inside the table we have done cascade-all just association is enough
            //TollPrice savedTollPrice=tollPriceRepository.save(tollPrice);
            //return savedTollStation;

            return tollStationRepository.save(tollStation);
        }
        else{
            throw new NotFoundException("Toll Station with that id " + tollStationId + " is not present ");
        }*/

    }


    public TollStation updateTollPrice(TollPriceDto tollPriceDto) {

        //we have to do some updation regarding the price of a vehicle type on this tollStaion

        TollPrice tollPrice = new TollPrice();
        tollPrice.setPrice(tollPriceDto.getPrice());
        tollPrice.setType(tollPriceDto.getType());

        Integer tollStationId = tollPriceDto.getTollStationId();

        //this is the toll-station where in the list we will add the toll-price corresponding to a vehicle-type
        TollStation tollStation = tollStationService.getTollStationById(tollStationId);

        tollPrice.setTollStationId(tollStationId);

        List<TollPrice> tollPrices = tollStation.getTollPrices();

        tollPrices.removeIf(tollPrice1 -> tollPrice1.getType() == tollPriceDto.getType());
        tollPrices.add(tollPrice);
        //it is not required to specifically save here when we will save the toll-station it will happen automatically
        tollPrice = tollPriceRepository.save(tollPrice);

        // Attach the Toll Price with Toll Station again.
        tollStation.setTollPrices(tollPrices);

        return tollStationRepository.save(tollStation);
    }


    public TollPrice getTollPriceById(Integer tollPriceId) {
        if(tollPriceRepository.findById(tollPriceId).isPresent()) {
            return tollPriceRepository.findById(tollPriceId).get();
        }
        throw new NotFoundException("Toll Price with " + tollPriceId + " toll price id not found");
    }


    public List<TollPrice> getAllTollPrice() {
        return tollPriceRepository.findAll();
    }

    public String deleteTollPrice(Integer tollPriceId) {
        TollPrice tollPrice = getTollPriceById(tollPriceId);
        tollPriceRepository.delete(tollPrice);
        return "Toll Price with " + tollPriceId + " toll price id is deleted successfully";
    }
}
