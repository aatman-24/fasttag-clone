package com.productmonth.fasttag.Repository;

import com.productmonth.fasttag.Entity.User;
import org.springframework.data.repository.CrudRepository;



public interface UserRepository extends CrudRepository<User, String> {
}
