package com.productmonth.fasttag.Entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Transaction")
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="transactionId")
    private int transactionId;

    @Column(name="card_id",nullable = false)
    private String cardId; //will act as a fk

    @Column(nullable = false)
    private Date date;

    public int getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(int transactionId) {
        this.transactionId = transactionId;
    }

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public TollStation getTollStation() {
        return tollStation;
    }

    public void setTollStation(TollStation tollStation) {
        this.tollStation = tollStation;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    //instead of using toll-station-id as the fk we have done the one to one mapping of the transaction with toll-station
//   @Column(name="toll_station_id")
//   private Integer tollStationId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="toll_station_id",referencedColumnName = "toll_station_id", nullable = false)
    private TollStation tollStation;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String username; //to tackle the person who has made this transaction...
}
