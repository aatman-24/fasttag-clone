import React from "react";
import {render,screen} from '@testing-library/react'
import Signup from '../../Signup'
import { BrowserRouter } from "react-router-dom";

test('renders learn react link',()=>{
    render(<BrowserRouter><Signup/></BrowserRouter>)
    const linkElement=screen.getByText(/Create User/i);
    expect(linkElement).toBeInTheDocument();
})

test('header contains the correct text or not',()=>{
    const component=render(<BrowserRouter><Signup/></BrowserRouter>)
    const headerEle=component.getByTestId("fastTag");
    expect(headerEle.textContent).toBe("Fast Tag")
})

test('button will show submit',()=>{
    const {getByTestId}=render(<BrowserRouter><Signup/></BrowserRouter>)
    const buttonEle=getByTestId("button")
    expect(buttonEle.textContent).toBe("Submit")
})

test('firstName should be initially an empty string',()=>{
    const {getByTestId}=render(<BrowserRouter><Signup/></BrowserRouter>)
    const firstNameEle=getByTestId("firstName")
    expect(firstNameEle.textContent).toBe("First NameFirst Name")
})