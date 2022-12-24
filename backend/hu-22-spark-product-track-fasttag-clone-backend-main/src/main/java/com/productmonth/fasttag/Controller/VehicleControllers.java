package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.VehicleDto;
import com.productmonth.fasttag.Entity.Vehicle;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.VehicleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.productmonth.fasttag.Pojo.Response;

import java.util.List;
import java.util.Optional;

@RestController
public class VehicleControllers {

    @Autowired
    private VehicleServices vehicleServices;


    // To get all vehicles
    @RequestMapping(value="/vehicles", method = RequestMethod.GET)
    @PreAuthorize("hasRole('Admin')")
    public Response<List<Vehicle>>getAllVehicles() {

        List<Vehicle>vehicles = vehicleServices.getAllVehicles();
        Response<List<Vehicle>> response = new Response<>();
        response.setBody(vehicles);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;
    }


    @RequestMapping(value="/user/vehicles", method = RequestMethod.GET)
    public Response<List<Vehicle>> loggedUserVehicles() {
        List<Vehicle>vehicles = vehicleServices.getLoggedVehicles();
        Response<List<Vehicle>> response = new Response<>();
        response.setBody(vehicles);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }



    // to get vehicle details from number plate
    @RequestMapping(value="/vehicle/{vehicleNumberPlate}", method = RequestMethod.GET)
    public Response<Vehicle> getVehicleByNumberPlate(@PathVariable("vehicleNumberPlate") String vehicleNumberPlate) {
        Vehicle vehicle = vehicleServices.getVehicleByNumberPlate(vehicleNumberPlate);
        Response<Vehicle>response = new Response<>();
        response.setBody(vehicle);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;
    }


    // to add new vehicle
    @RequestMapping(value="/vehicle", method = RequestMethod.POST)
    public Response<Vehicle> addNewVehicle(@RequestBody VehicleDto vehicleDetails)
    {
        Vehicle newVehicle = vehicleServices.addNewVehicle(vehicleDetails);
        Response<Vehicle> response = new Response<>();
        response.setBody(newVehicle);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;
    }


    // To delete vehicle by number plate
    @RequestMapping(value="/vehicle/{vehicleNumberPlate}", method = RequestMethod.DELETE)
    public Response<String> deleteVehicleByNumberPlate(@PathVariable("vehicleNumberPlate") String vehicleNumberPlate) {

        String message = vehicleServices.deleteVehicleByNumberPlate(vehicleNumberPlate);
        Response<String> response = new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;
    }


    // to update vehicle by their number plate
    @RequestMapping(value="/vehicle/{vehicleNumberPlate}", method = RequestMethod.PUT)
    public Response<Vehicle> updateVehicleByNumberPlate(@PathVariable("vehicleNumberPlate") String vehicleNumberPlate, @RequestBody VehicleDto vehicleDetails) {

        Vehicle updatedVehicle = vehicleServices.updateVehicleByNumberPlate(vehicleDetails, vehicleNumberPlate);

        Response<Vehicle> response = new Response<>();
        response.setBody(updatedVehicle);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));

        return response;
    }
}
