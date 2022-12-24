package com.productmonth.fasttag.Repository;

import com.productmonth.fasttag.Entity.Card;
import com.productmonth.fasttag.Entity.Order;
import com.productmonth.fasttag.Entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, String> {

    @Query(value = "SELECT c FROM Card c where c.vehicle=:vehicle")
    Card findByVehicle(@Param("vehicle") Vehicle vehicle);

}
