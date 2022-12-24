package com.productmonth.fasttag.Repository;


import com.productmonth.fasttag.Entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, String> {
    Vehicle findByNumberPlate(String numberPlate);
    String deleteByNumberPlate(String numberPlate);
}
