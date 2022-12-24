import React from "react";
import {render,screen,fireEvent, createEvent, cleanup} from '@testing-library/react'
import Dashboard from "..";
import { BrowserRouter } from "react-router-dom";

test('component loaded correctly or not',()=>{
    //the issue is how to render this compoent standalone
    render(<BrowserRouter><Dashboard/></BrowserRouter>)
    const linkElement=screen.getByText(/Account Summary/i);
    expect(linkElement).toBeInTheDocument();
})
afterEach(cleanup)


test('component loaded correctly or not',()=>{
    //the issue is how to render this compoent standalone
    render(<BrowserRouter><Dashboard/></BrowserRouter>)
    const linkElement=screen.getByText(/Your Fastags/i);
    expect(linkElement).toBeInTheDocument();
})

test("element contains the correct value or not",()=>{
    const {getByTestId}=render(<BrowserRouter><Dashboard/></BrowserRouter>)
    const accountEle=getByTestId("account");
    expect(accountEle.textContent).toBe(" Account Summary ")
})

// test("element contains the correct value or not",()=>{
//     const {getByTestId}=render(<Dashboard/>)
//     const FastTagEle=getByTestId("fastTag");
//     expect(FastTagEle.textContent).toBe("Your Fastags")
// })