import React from "react";
import {render,screen} from '@testing-library/react'
import FastTagDetails from "..";

test("Component should renders correclty",()=>{
    render(<FastTagDetails/>)
    const linkElement=screen.getByText(/FastTag ID/i);
    expect(linkElement).toBeInTheDocument();
})


test("tag should contain the correct value",()=>{
    const {getByTestId}=render(<FastTagDetails/>)
    const fastTagEle=getByTestId("fastTag")
    expect(fastTagEle.textContent).toBe("FASTTAG ID")
})


test("tag should contain the correct value",()=>{
    const {getByTestId}=render(<FastTagDetails/>)
    const fastTagEle=getByTestId("vehicle")
    expect(fastTagEle.textContent).toBe("VEHICLE NUMBER")
})


test("tag should contain the correct value",()=>{
    const {getByTestId}=render(<FastTagDetails/>)
    const fastTagEle=getByTestId("type")
    expect(fastTagEle.textContent).toBe("VEHICLE TYPE")
})


test("tag should contain the correct value",()=>{
    const {getByTestId}=render(<FastTagDetails/>)
    const fastTagEle=getByTestId("balance")
    expect(fastTagEle.textContent).toBe("BALANCE")
})





