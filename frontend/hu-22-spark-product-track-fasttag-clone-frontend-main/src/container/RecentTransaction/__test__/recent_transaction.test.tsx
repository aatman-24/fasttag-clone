import React from "react";
import {render,screen} from '@testing-library/react'
import RecentTransaction from '../../RecentTransaction'
import { BrowserRouter } from "react-router-dom";



test('renders learn react link',()=>{
    render(<BrowserRouter><RecentTransaction/></BrowserRouter>)
    const linkElement=screen.getByText(/TRANSACTION HISTORY/i);
    expect(linkElement).toBeInTheDocument();

})


test('tag contain the correct value or not',()=>{
    const {getByTestId}=render(<BrowserRouter><RecentTransaction/></BrowserRouter>)
    const TransactionEle=getByTestId("id")
    expect(TransactionEle.textContent).toBe("Transaction ID")
})



test('tag contain the correct value or not',()=>{
    const {getByTestId}=render(<BrowserRouter><RecentTransaction/></BrowserRouter>)
    const TransactionEle=getByTestId("date")
    expect(TransactionEle.textContent).toBe("Date")
})


test('tag contain the correct value or not',()=>{
    const {getByTestId}=render(<BrowserRouter><RecentTransaction/></BrowserRouter>)
    const TransactionEle=getByTestId("location")
    expect(TransactionEle.textContent).toBe("Location")
})


test('tag contain the correct value or not',()=>{
    const {getByTestId}=render(<BrowserRouter><RecentTransaction/></BrowserRouter>)
    const TransactionEle=getByTestId("fastTagId")
    expect(TransactionEle.textContent).toBe("FastTag ID")
})


test('tag contain the correct value or not',()=>{
    const {getByTestId}=render(<BrowserRouter><RecentTransaction/></BrowserRouter>)
    const TransactionEle=getByTestId("amount")
    expect(TransactionEle.textContent).toBe("Amount")
})









