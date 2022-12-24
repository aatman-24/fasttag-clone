package com.productmonth.fasttag.Dto;

import com.productmonth.fasttag.Entity.VehicleType;
import lombok.Data;
import lombok.NoArgsConstructor;

//at the time of adding the toll-price by the admin he will give us these 3 details...
//the tollStationId he will get from the page where all the toll-station are listed out
@Data
@NoArgsConstructor
public class TollPriceDto {

    private double price;
    private VehicleType type;
    private int tollStationId;

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

    public int getTollStationId() {
        return tollStationId;
    }

    public void setTollStationId(int tollStationId) {
        this.tollStationId = tollStationId;
    }
}
