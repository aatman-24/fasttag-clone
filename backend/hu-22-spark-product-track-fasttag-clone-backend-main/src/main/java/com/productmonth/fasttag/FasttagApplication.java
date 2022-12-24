package com.productmonth.fasttag;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/*1st exclude was to remove the by-default security that was added and 2nd exclude was done to
resolve the error "Error creating bean with name 'dataSource' defined in class path resource"*/
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class FasttagApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(FasttagApplication.class, args);
	}

}
