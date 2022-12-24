import React from "react";
import {render,screen,fireEvent} from '@testing-library/react'
import PurchaseCard from '../../OrderCard'
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

test('renders learn react link',()=>{
    render(<BrowserRouter><PurchaseCard/></BrowserRouter>)
    const linkElement=screen.getByText(/Purchase Card/i);
    expect(linkElement).toBeInTheDocument();

})

test('check for vehicle type',()=>{
    const {getByTestId}=render(<BrowserRouter><PurchaseCard/></BrowserRouter>);
    const ele=getByTestId("vehicletype");
    expect(ele.textContent).toBe("Select vehicle TypeCarBusTruckBike");

})

test('should correctly set default option', () => {
    render(<BrowserRouter><PurchaseCard/></BrowserRouter>);
    expect(screen.getByRole('option', { name: 'Select vehicle Type' }).textContent).toBe("Select vehicle Type")
  })

test('should display the correct number of options', () => {
    render(<BrowserRouter><PurchaseCard/></BrowserRouter>)
    expect(screen.getAllByRole('option').length).toBe(5)
})

it('checking whether the default option is selected or not', () => {
    //expect(screen.getByRole('option', { name: 'Select a country' }).selected).toBe(true)
    const {getByTestId}= render(<BrowserRouter><PurchaseCard/></BrowserRouter>);
    const optionEle=getByTestId("default");
    expect(optionEle.textContent).toBe("Select vehicle Type")
  })

