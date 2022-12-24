import React from "react";
import {render,screen} from '@testing-library/react'
import AllTollStations from '../../AllTollStations'
import { BrowserRouter } from "react-router-dom";

test('renders learn react link',()=>{
    render(<BrowserRouter><AllTollStations/></BrowserRouter>)
    const linkElement=screen.getByText(/TOLL STATIONS/i);
    expect(linkElement).toBeInTheDocument();

})

