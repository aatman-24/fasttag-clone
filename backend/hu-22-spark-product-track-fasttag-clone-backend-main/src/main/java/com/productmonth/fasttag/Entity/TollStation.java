package com.productmonth.fasttag.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "toll_station")
@Data
public class TollStation {

    @Id
    @Column(name="toll_station_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tollStationId;

    @Column(nullable = false)
    private String name;


    public int getTollStationId() {
        return tollStationId;
    }

    public void setTollStationId(int tollStationId) {
        this.tollStationId = tollStationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<TollPrice> getTollPrices() {
        return tollPrices;
    }

    public void setTollPrices(List<TollPrice> tollPrices) {
        this.tollPrices = tollPrices;
    }

    //the toll-station have one to one mapping with the location
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id",referencedColumnName = "location_id")
    private Location location; //this is the fk and it will map to the pk in the location table


    //a particular toll-station will have a list of price depending upon the type of vehicle
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="toll_station_id", referencedColumnName = "toll_station_id")
    List<TollPrice> tollPrices;
}
