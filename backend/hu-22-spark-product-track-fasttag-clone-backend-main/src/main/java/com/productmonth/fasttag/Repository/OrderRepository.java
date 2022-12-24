package com.productmonth.fasttag.Repository;

import com.productmonth.fasttag.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer> {

    @Query(value = "SELECT o FROM Order o where o.username=:username")
    List<Order> findByusername(@Param("username") String username);

}
