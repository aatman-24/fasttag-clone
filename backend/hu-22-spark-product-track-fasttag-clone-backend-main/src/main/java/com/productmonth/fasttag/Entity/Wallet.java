package com.productmonth.fasttag.Entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="Wallet")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Wallet {
    public Long getWalletId() {
        return walletId;
    }

    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="wallet_id")
    private Long walletId;

    @Column(nullable = false)
    private double balance;


}
