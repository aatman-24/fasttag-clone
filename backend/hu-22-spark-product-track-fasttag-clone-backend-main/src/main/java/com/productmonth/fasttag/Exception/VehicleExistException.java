package com.productmonth.fasttag.Exception;

public class VehicleExistException extends RuntimeException{

    public VehicleExistException() {
    }

    public VehicleExistException(String message) {
        super(message);
    }

    public VehicleExistException(String message, Throwable cause) {
        super(message, cause);
    }

    public VehicleExistException(Throwable cause) {
        super(cause);
    }
}
