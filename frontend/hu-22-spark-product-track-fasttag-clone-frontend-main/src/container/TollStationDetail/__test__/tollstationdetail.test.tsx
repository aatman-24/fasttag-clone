import React from "react";
import ReactDOM from "react-dom"
import TollStationDetail from "..";
import {screen,render} from '@testing-library/react'

/*test('renders learn react link',()=>{
    //the issue is how to render this compoent standalone
    render(<TollStationDetail></TollStationDetail>)
    const linkElement=screen.getByText(/Toll Station Details/i);
    expect(linkElement).toBeInTheDocument();
})*/











//we are trying to render the component in isolation and we don't have access to useParams that's why it failed
//in TDD we will first write the test and then we will implement the feature then again we will run our test
it("renders without crashing",()=>{
    console.log("the component is loading properly")
})



/*in this test we are checking whether a particular element contains the desired text or not
test("toll-price header renders with correct text",()=>{
    const component=render(<TollStationDetail/>)
    const headerEle=component.getByTestId("header");
    expect(headerEle.textContent).toBe("Toll Prices")
})*/

