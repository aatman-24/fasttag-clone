import React from "react";
import {render,screen} from '@testing-library/react'
import AccountSummary from "./../../AccountSummary/index";
import { BrowserRouter } from "react-router-dom";

test("Component should renders correclty",()=>{
    render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const linkElement=screen.getByText(/Name/i);
    expect(linkElement).toBeInTheDocument();
})

test("element should hold some more test-cases",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameEle=getByTestId("name");
    expect(nameEle.textContent).toBe("Name")
})

test("value should be correct",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameValEle=getByTestId("nameval");
    expect(nameValEle.textContent).toBe(" ")
})

test("element should hold some more test-cases",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameEle=getByTestId("number");
    expect(nameEle.textContent).toBe("Mobile Number")
})

test("value should be correct",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameValEle=getByTestId("numberval");
    expect(nameValEle.textContent).toBe("")
})

test("element should hold some more test-cases",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameEle=getByTestId("email");
    expect(nameEle.textContent).toBe("Email Address")
})

test("value should be correct",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameValEle=getByTestId("emailval");
    expect(nameValEle.textContent).toBe("")
})

test("element should hold some more test-cases",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameEle=getByTestId("fastTag");
    expect(nameEle.textContent).toBe("Fastags")
})

test("element should hold some more test-cases",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameEle=getByTestId("order");
    expect(nameEle.textContent).toBe("Order FastTag")
})

test("element should hold some more test-cases",()=>{
    const {getByTestId}=render(<BrowserRouter><AccountSummary/></BrowserRouter>)
    const nameEle=getByTestId("vehicle");
    expect(nameEle.textContent).toBe("Vehicles")
})

