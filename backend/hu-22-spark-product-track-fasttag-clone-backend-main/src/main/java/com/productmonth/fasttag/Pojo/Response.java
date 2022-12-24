package com.productmonth.fasttag.Pojo;

public class Response<T> {

    private T body;
    private Status status;

    public Response() {
    }

    public Response(T body, Status status) {
        this.body = body;
        this.status = status;
    }

    public T getBody() {
        return body;
    }

    public void setBody(T body) {
        this.body = body;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
