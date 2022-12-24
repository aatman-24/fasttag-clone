import React from "react";
import {render,screen} from '@testing-library/react'
import ReactRouter from 'react-router'
import RechargeCard from "..";
import { BrowserRouter } from "react-router-dom";

test("Component should renders correclty",()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({cardId:"2"})
    const {getByTestId}=render(<BrowserRouter><RechargeCard/></BrowserRouter>)
    const rechargeEle=getByTestId("recharge")
    expect(rechargeEle.textContent).toBe("Recharge Card")
})

test('Buuton should render recharge Card',()=>{
    jest.spyOn(ReactRouter,'useParams').mockReturnValue({cardId:"2"})
    const {getByTestId}=render(<BrowserRouter><RechargeCard/></BrowserRouter>)
    const buttonEle=getByTestId("rechargecard")
    expect(buttonEle.textContent).toBe("Recharge Card")
})
