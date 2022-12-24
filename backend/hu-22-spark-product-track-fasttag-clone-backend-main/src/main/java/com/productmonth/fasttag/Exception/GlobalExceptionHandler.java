package com.productmonth.fasttag.Exception;

import com.productmonth.fasttag.Entity.User;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    //it will be handle all the not-found exception that occur anywhere inside our application
    @ExceptionHandler
    public ResponseEntity<Response<User>> handleNotFoundException(NotFoundException exc) {

        Status errorStatus = new Status();
        errorStatus.setStatus("ERROR");
        errorStatus.setMessage(exc.getMessage()); //here that message will come that we have thrown from the Service
        errorStatus.setStatusCode(HttpStatus.NOT_FOUND.value());

        Response<User> response = new Response<>();
        response.setBody(null);
        response.setStatus(errorStatus);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    public ResponseEntity<Response<User>> handleVehicleExistException(VehicleExistException exc) {

        Status errorStatus = new Status();
        errorStatus.setStatus("ERROR");
        errorStatus.setMessage(exc.getMessage()); //here that message will come that we have thrown from the Service
        errorStatus.setStatusCode(HttpStatus.BAD_REQUEST.ordinal());

        Response<User> response = new Response<>();
        response.setBody(null);
        response.setStatus(errorStatus);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public ResponseEntity<Response<User>> handleBalanaceInSufficientException(BalanaceInSufficientException exc) {

        Status errorStatus = new Status();
        errorStatus.setStatus("ERROR");
        errorStatus.setMessage(exc.getMessage()); //here that message will come that we have thrown from the Service
        errorStatus.setStatusCode(HttpStatus.BAD_REQUEST.ordinal());

        Response<User> response = new Response<>();
        response.setBody(null);
        response.setStatus(errorStatus);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler
    public ResponseEntity<Response<User>> handleAlreadyFoundException(AlreadyFoundException exc) {

        Status errorStatus = new Status();
        errorStatus.setStatus("ERROR");
        errorStatus.setMessage(exc.getMessage()); //here that message will come that we have thrown from the Service
        errorStatus.setStatusCode(HttpStatus.BAD_REQUEST.ordinal());

        Response<User> response = new Response<>();
        response.setBody(null);
        response.setStatus(errorStatus);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler
    public ResponseEntity<Response<User>> handleException(Exception exc) {

        Status errorStatus = new Status();
        errorStatus.setStatus("ERROR");
        errorStatus.setMessage(exc.getMessage());
        errorStatus.setStatusCode(HttpStatus.NOT_FOUND.value());

        Response<User> response = new Response<>();
        response.setBody(null);
        response.setStatus(errorStatus);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

}
