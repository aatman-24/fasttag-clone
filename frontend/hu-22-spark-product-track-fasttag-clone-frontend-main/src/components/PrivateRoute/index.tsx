import React from "react";
import { Redirect, Route } from "react-router-dom";


const PrivateRoute=({...rest})=>{
    const token=localStorage.getItem('token')
    return(
        <>
        {
           token ? <Route {...rest}></Route> : <Redirect to="/signin"></Redirect>
        }
        </>
    )

}

export default PrivateRoute