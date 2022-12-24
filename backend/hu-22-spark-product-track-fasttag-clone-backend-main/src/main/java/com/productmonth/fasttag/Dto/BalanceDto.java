package com.productmonth.fasttag.Dto;

import lombok.Data;

//whenever we need to return an-amount to the client-side we will return it in this form only
@Data
public class BalanceDto {

    private double balance;

    private boolean open;

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }
}
