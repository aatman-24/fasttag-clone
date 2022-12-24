import React from "react";
import {render,screen} from '@testing-library/react'
import SignIn from '../../Signin'
import { BrowserRouter } from "react-router-dom";


test('renders learn react link',()=>{
    render(<BrowserRouter><SignIn/></BrowserRouter>)
    const linkElement=screen.getByText(/Login/i);
    expect(linkElement).toBeInTheDocument();

})

test('header contains the correct text or not',()=>{
    const component=render(<BrowserRouter><SignIn/></BrowserRouter>)
    const headerEle=component.getByTestId("header");
    expect(headerEle.textContent).toBe("Login")
})

test('button will show login',()=>{
    const {getByTestId}=render(<BrowserRouter><SignIn/></BrowserRouter>)
    const loginEle=getByTestId("login")
    expect(loginEle.textContent).toBe("Log In")
})


test('username should be an empyt string in the start',()=>{
    const {getByTestId}=render(<BrowserRouter><SignIn/></BrowserRouter>)
    const usernameEle=getByTestId("username");
    expect(usernameEle.textContent).toBe("UsernameUsername")
})

test('password should be an empyt string in the start',()=>{
    const {getByTestId}=render(<BrowserRouter><SignIn/></BrowserRouter>)
    const passwordEle=getByTestId("password");
    expect(passwordEle.textContent).toBe("PasswordPassword")
})
