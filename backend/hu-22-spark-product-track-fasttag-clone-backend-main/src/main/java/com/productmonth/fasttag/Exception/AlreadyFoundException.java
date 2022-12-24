package com.productmonth.fasttag.Exception;

public class AlreadyFoundException extends RuntimeException{

    public AlreadyFoundException(String message) {
        super(message);
    }

    public AlreadyFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public AlreadyFoundException(Throwable cause) {
        super(cause);
    }
}
