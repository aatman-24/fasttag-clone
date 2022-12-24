package com.productmonth.fasttag.Service;


import com.productmonth.fasttag.Dto.VehicleDto;
import com.productmonth.fasttag.Entity.Card;
import com.productmonth.fasttag.Entity.User;
import com.productmonth.fasttag.Entity.Vehicle;
import com.productmonth.fasttag.Entity.Wallet;

import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Repository.UserRepository;

import com.productmonth.fasttag.Repository.VehicleRepository;
import com.productmonth.fasttag.Repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class VehicleServices {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private CardServices cardServices;


    // To get all vehicle details present in database
    public List<Vehicle> getAllVehicles() {
        return (List<Vehicle>) vehicleRepository.findAll();
    }


    public  List<Vehicle> getLoggedVehicles() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByName(username);
        return user.getVehicles();
    }


    // To add new Vehicle
    public Vehicle addNewVehicle(VehicleDto vehicleDetails) {
        String username=SecurityContextHolder.getContext().getAuthentication().getName();
        /*->this is done bcz when we are doing the junit-test then we are getting the null-pointer excepttion
        on fetching the user from the jwt
        try{
            username = SecurityContextHolder.getContext().getAuthentication().getName();
        }
        catch (Exception ex){
            username="test";
        }*/
        User user = userService.getUserByName(username);

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleType(vehicleDetails.getVehicleType());
        vehicle.setRegistrationNo(vehicleDetails.getRegistrationNo());
        vehicle.setNumberPlate(vehicleDetails.getNumberPlate());
        vehicle.setUsername(username); //fk ko set kiya hai.

        Wallet wallet = new Wallet();
        wallet.setBalance(100);

        // An entry has been made in wallet table.
        Wallet savedWallet = walletRepository.save(wallet);

        // Association has been done.
        vehicle.setWallet(savedWallet);

        user.addVehicle(vehicle);
        user = userRepository.save(user);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);

        return savedVehicle;
    }


    // to get vehicle by their number plate
    public Vehicle getVehicleByNumberPlate(String vehicleNumberPlate) {

        Vehicle vehicle = vehicleRepository.findByNumberPlate(vehicleNumberPlate);

        if(vehicle==null)
        {
            throw new NotFoundException("Vehicle Not Found for " + vehicleNumberPlate);
        }
        return vehicle;
    }



    // to delete vehicle by numberPlate
    public String deleteVehicleByNumberPlate(String vehicleNumberPlate) {
        Vehicle vehicle = getVehicleByNumberPlate(vehicleNumberPlate);
        Card card = cardServices.getCardByVehicle(vehicle);
        String message = cardServices.deleteCard(card.getCardId());
        return "Vehicle Found and Removed Successfully";
    }



    // update Vehicle by their number plate
    public Vehicle updateVehicleByNumberPlate(VehicleDto vehicleDetails, String vehicleNumberPlate) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.getUserByName(username);

        Vehicle vehicle = getVehicleByNumberPlate(vehicleNumberPlate);

        if(!user.getVehicles().contains(vehicle)) {
            throw new NotFoundException("No Vehicle Found with " + vehicleNumberPlate + " number plate with " + username);
        }

        vehicle.setRegistrationNo(vehicleDetails.getRegistrationNo());
        vehicle.setVehicleType(vehicleDetails.getVehicleType());
        return  vehicleRepository.save(vehicle);
    }
}
