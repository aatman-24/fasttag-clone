import React from "react";
import {render,screen} from '@testing-library/react'
import TollPrice from './../../TollPrice/index'
import ReactRouter from 'react-router'
import { BrowserRouter } from "react-router-dom";

//as this compoent fetches the TollStationId from the url so we need to fetch that also
test("Component should renders correclty",()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    render(<BrowserRouter><TollPrice/></BrowserRouter>)
    const linkElement=screen.getByText(/Add Toll Price/i);
    expect(linkElement).toBeInTheDocument();
})

test("header ele should contain the correct data",()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    const {getByTestId}=render(<BrowserRouter><TollPrice/></BrowserRouter>)
    const headerEle=getByTestId("header");
    expect(headerEle.textContent).toBe("Add Toll Price")
})

test('should correctly set default option', () => {
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    render(<BrowserRouter><TollPrice/></BrowserRouter>)
    expect(screen.getByRole('option', { name: 'Select vehicle Type' }).textContent).toBe("Select vehicle Type")
  })

test('should display the correct number of options', () => {
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    render(<BrowserRouter><TollPrice/></BrowserRouter>)
    expect(screen.getAllByRole('option').length).toBe(5)
})

it('checking whether the default option is selected or not', () => {
    //expect(screen.getByRole('option', { name: 'Select a country' }).selected).toBe(true)
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    const {getByTestId}=render(<BrowserRouter><TollPrice/></BrowserRouter>)
    const optionEle=getByTestId("default");
    expect(optionEle.textContent).toBe("Select vehicle Type")
  })

test('toll-station-id should be correclty fetched from the url',()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    const {getByTestId}=render(<BrowserRouter><TollPrice/></BrowserRouter>)
    const tollStationEle=getByTestId("id")
    expect(tollStationEle.textContent).toBe("");
  })


test("the price should be initially empty",()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    const {getByTestId}=render(<BrowserRouter><TollPrice/></BrowserRouter>)
    const priceEle=getByTestId("price")
    expect(priceEle.textContent).toBe("");
}) 

test("button should show the submit to the user",()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({tollStationId:"2"})
    const {getByTestId}=render(<BrowserRouter><TollPrice/></BrowserRouter>)
    const buttonEle=getByTestId("submit")
    expect(buttonEle.textContent).toBe(" Submit")
})




