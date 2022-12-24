package com.productmonth.fasttag.Dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class RechargeCardDto {

    @Column(nullable = false)
    private double amount;

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
