package com.productmonth.fasttag.Dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;

@Data //this will generate the boiler-plate code that will have the Getters and Setters
@ToString
public class TollStationDto {
    /*->at the time of adding a toll-station the admin will gonna to add these details and we will split them
    into 2 separate table one is the TollStation(name) and another is the Location(name,state,city,pincode,
    highway)
    */
    private String name;
    private String state;
    private String city;
    private String pincode;
    private String highway;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getHighway() {
        return highway;
    }

    public void setHighway(String highway) {
        this.highway = highway;
    }
}
