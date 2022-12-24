package com.productmonth.fasttag.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="Card")
public class Card {

    @Id
    @Column(name="card_id")
    private String cardId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="vehicle_id",referencedColumnName = "vehicle_id")
    private Vehicle vehicle;


    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
