package com.productmonth.fasttag.Dto;

import com.productmonth.fasttag.Entity.VehicleType;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
public class VehicleDto {

    @Id
    @Column(name="vehicle_id")
    private String numberPlate;

    @Column(nullable = false)
    private VehicleType vehicleType;

    @Column(nullable = false)
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
