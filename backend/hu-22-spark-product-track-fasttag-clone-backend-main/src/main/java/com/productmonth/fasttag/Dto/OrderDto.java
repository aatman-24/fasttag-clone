package com.productmonth.fasttag.Dto;

import com.productmonth.fasttag.Entity.VehicleType;
import lombok.Data;

//here we will add those details that the user will gonna to add at the time of purchasing the card
@Data
public class OrderDto {
    private String numberPlate;
    private VehicleType vehicleType;
    private String registrationNo;


    public String getNumberPlate() {
        return numberPlate;
    }

    public void setNumberPlate(String numberPlate) {
        this.numberPlate = numberPlate;
    }

    public VehicleType getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getRegistrationNo() {
        return registrationNo;
    }

    public void setRegistrationNo(String registrationNo) {
        this.registrationNo = registrationNo;
    }
}
