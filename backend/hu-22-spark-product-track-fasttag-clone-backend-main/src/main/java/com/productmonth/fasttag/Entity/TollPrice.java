package com.productmonth.fasttag.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="toll_price")
@Data
public class TollPrice {
    @Id
    @Column(name="toll_price_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tollPriceId;

    public int getTollPriceId() {
        return tollPriceId;
    }

    public void setTollPriceId(int tollPriceId) {
        this.tollPriceId = tollPriceId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public VehicleType getType() {
        return type;
    }

    public void setType(VehicleType type) {
        this.type = type;
    }

    public Integer getTollStationId() {
        return tollStationId;
    }

    public void setTollStationId(Integer tollStationId) {
        this.tollStationId = tollStationId;
    }

    private double price;

    //now the issue is how to add the enum here and it will basically be the vehicle type...
    //the vehicle type and it's price will be added by the admin from the client-side
    // @Enumerated(EnumType.STRING)
    // @Column(name = "vehicle_type")
    //private VehicleType type;  // we can access the enum like type.BUS, type.CAR in this way..

    /*->As a rule of thumb, we should always use the AttributeConverter interface and @Converter annotation
    if we're using JPA 2.1 or later.
    ->this is the best method for mapping the enum inside the database*/
    @Column(name="vehicle_type")
    private VehicleType type;

    @Column(name="toll_station_id")
    private Integer tollStationId; //this will be the fk
}
