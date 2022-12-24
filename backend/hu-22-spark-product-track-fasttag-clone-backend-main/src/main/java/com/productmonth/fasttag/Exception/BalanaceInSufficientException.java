package com.productmonth.fasttag.Exception;

public class BalanaceInSufficientException extends RuntimeException{

    public BalanaceInSufficientException() {
    }

    public BalanaceInSufficientException(String message) {
        super(message);
    }

    public BalanaceInSufficientException(String message, Throwable cause) {
        super(message, cause);
    }

    public BalanaceInSufficientException(Throwable cause) {
        super(cause);
    }
}
