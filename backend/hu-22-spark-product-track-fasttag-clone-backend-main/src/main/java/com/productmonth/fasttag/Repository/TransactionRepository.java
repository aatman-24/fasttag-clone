package com.productmonth.fasttag.Repository;

import com.productmonth.fasttag.Entity.TollStation;
import com.productmonth.fasttag.Entity.Transaction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "SELECT t FROM Transaction t WHERE t.cardId =:cardId ORDER BY t.date desc")
    public List<Transaction> findByCardId(@Param("cardId") String cardId);

    @Query(value = "SELECT t FROM Transaction t WHERE t.date =:date")
    public List<Transaction> findByDate(@Param("date") Date date);

    @Query(value = "SELECT t FROM Transaction t WHERE t.username =:username ORDER BY t.date desc")
    public List<Transaction> findByUsername(@Param("username") String username, Pageable pageable);

    @Query(value = "SELECT t FROM Transaction t WHERE t.tollStation =:tollStation")
    public List<Transaction> findByTollStation(@Param("tollStation") TollStation tollStation);

    @Query(value = "SELECT t FROM Transaction t WHERE t.username =:username ORDER BY t.date desc")
    public List<Transaction> getNoOfTransaction(@Param("username") String username);

    @Query(value = "SELECT t FROM Transaction t WHERE t.cardId=:cardId AND t.tollStation =:tollStation AND t.amount < 0 ORDER BY t.date desc")
    public List<Transaction> getRecentTransactions(@Param("cardId") String cardId, @Param("tollStation") TollStation tollStation);
}
