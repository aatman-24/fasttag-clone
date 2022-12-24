import React from "react";
import {render,screen,fireEvent, createEvent} from '@testing-library/react'
import AddTollStation from './../../TollStation/index' //the component which we wanted to test
import { BrowserRouter } from "react-router-dom";


//this will check whether the component is loaded correctly or not
test('renders learn react link',()=>{
    //the issue is how to render this compoent standalone
    render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const linkElement=screen.getByText(/Add Toll Station/i);
    expect(linkElement).toBeInTheDocument();
})

//this will check whether the html element have the correct text or not
test('header contains the correct text or not',()=>{
    const component=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const headerEle=component.getByTestId("header");
    expect(headerEle.textContent).toBe("Add Toll Station")
})



test('name of the toll-station should be initially an empty string',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const nameEle=getByTestId("name");
    expect(nameEle.textContent).toBe("")
})




test('city field should be initially an empty string',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const cityEle=getByTestId("city");
    expect(cityEle.textContent).toBe("")
})

test('state field should be initially an empty string',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const stateEle=getByTestId("state");
    expect(stateEle.textContent).toBe("")
})


test('highway field should be initially an empty string',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const highwayEle=getByTestId("highway");
    expect(highwayEle.textContent).toBe("")
})


test('pincode field should be initially an empty string',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const pincodeEle=getByTestId("pincode");
    expect(pincodeEle.textContent).toBe("")
})


test('button should render the Submit',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const buttonEle=getByTestId("submit")
    expect(buttonEle.textContent).toBe("Submit")
})


test('name of the toll-station should be changed correctly',()=>{
    const {getByTestId}=render(<BrowserRouter><AddTollStation/></BrowserRouter>)
    const nameEle=getByTestId("name")
    
    expect(nameEle.textContent).toBe("");
    //now we will fire an-event that is basically the user is changing the name of the toll-station
    fireEvent.change(nameEle,{
        target:{
            name:nameEle,
            value:""
        }
    })
    expect(nameEle.textContent).toBe("")
})





