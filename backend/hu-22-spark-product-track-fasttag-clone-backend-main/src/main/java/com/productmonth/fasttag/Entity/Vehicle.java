package com.productmonth.fasttag.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "Vehicle")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
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

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Id
    @Column(name="vehicle_id")
    private String numberPlate;

    @Column(nullable = false)
    private VehicleType vehicleType;

    @Column(nullable = false)
    private String registrationNo;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="wallet_id", referencedColumnName = "wallet_id")
    private Wallet wallet;

    //this is the fk...
    private String username;
}



