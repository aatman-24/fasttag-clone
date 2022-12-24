import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {createTollStation} from '../../api.service'
import "./index.css"
import {TollStation,TollStationError} from "../../model"
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";

//we will make 2 interface one for the details that is entered by the admin and another for handling the error

const AddTollStation = () => {

    const history=useHistory();
    //this is the initial value of our state
    const defaultValue: TollStation = {
        name: '',
        state: '',
        city: '',
        pincode: '',
        highway: ''
    }
    //here no issue is their bcz all of the fields are optional 
    const defaultErrorValue: TollStationError = {}

    const [formValue, setFormValue] = useState(defaultValue);
    const [errorValue, setErrorValue] = useState(defaultErrorValue);
    const [isSubmit, setIsSubmit] = useState(false);
    
    const [isCreated,setIsCreated]=useState(true);

    //this fn is used to set the error value
    const validate = (value: TollStation) => {

        //we will create an object for the error response that we are getting...
        const error: TollStationError = {};

        if (!value.name) {
            error.name = "Enter the name of the toll-station";
        }
        if (!value.city) {
            error.city = "Enter the name of the city";
        }
        if (!value.highway) {
            error.highway = "Enter the name of the highway";
        }
        if (!value.state) {
            error.state = "Enter the state"
        }
        if (!value.pincode) {
            error.pincode = "Enter the pincode";
        }
        else if (value.pincode.length < 6) {
            error.pincode = "Enter the valid pincode";
        }
        return error;
    }

    const handleInputChange = (event: any) => {
        //console.log(event);
        //event.target.value will give us the content that the user has added
        const { name, value } = event.target
        //console.log(name);
        //console.log(value)
        //the name should be separately assigned to the input field

        //inside the setFormValue we need to pass the updated state..
        //and the state is immutable in React so we can't change it we have to override it
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        //console.log("form is submittted")
        //console.log(formValue) we are able to fetch the details added by the admin..

        //now we will do the validation and passed the updated state in the setErrorValue fn
        setErrorValue(validate(formValue));
        setIsSubmit(true);


        console.log(Object); //nothing is getting printed??
        if (formValue.name && formValue.city && formValue.highway && formValue.pincode && formValue.state) {
            //after the validation we have to make an api-call to the server.
            const res = createTollStation(formValue);

            res.then((res: any) => {
                //console.log("yahan pr kaise karenge ",res);
                //we have a key status present inside the response
                if (res && res.status == 200) {
                    /*->the toll-station is created successfully now with the help of useHistory we can
                    redirect him.*/
                    console.log("Toll-Station is created successfullu");
                    history.push('/all-toll-station')
                }
                else {
                    console.log("Toll-Station is not created  ");
                    setIsCreated(false);
                }
            })
        }


    }

    




    //now we need a bootstrap form to be displayed here
    return (
        
        <>

            <NavBar />

            <section>


                <div className="dashboard-main">

                    <SideBar />


                    <section className="toll-station-intro" >
                    
                        {!isCreated && <p className="show-creating-error">Error in Creating Toll-Station!!!</p>
                        }
                        
                        <div className="bg-image h-100" style={{ backgroundImage: ('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg') }}>
                            
                            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f6f6f6" }}>
                                
                                <div className="container">
                                    
                                    <div className="row justify-content-center">
                                        
                                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                            
                                            <div className="card gradient-custom-new-1">
                                                
                                                <div className="card-body p-5 text-white">

                                                    <div>
                                                        <img className="logo-image-6" src="images/fastTag.png"></img>
                                                    </div>

                                                    <div className="my-md-5">

                                                        <div className="text-center pt-1">
                                                            <i className="fas fa-user-astronaut fa-3x"></i>
                                                            <h1 className="fw-bold my-5 text-uppercase add-toll-station"
                                                            data-testid="header">Add Toll Station</h1>
                                                        </div>
                                                        <form onSubmit={onSubmit}>
                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg toll-station-input"
                                                                    name="name"
                                                                    data-testid="name"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Toll Station Name" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    {!formValue.name ? errorValue.name : ''}
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg toll-station-city"
                                                                    name="city"
                                                                    data-testid="city"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter City Name" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    {!formValue.city ? errorValue.city : ''}
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg toll-station-state"
                                                                    name="state"
                                                                    data-testid="state"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter State" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    {!formValue.state ? errorValue.state : ''}
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg toll-station-highway"
                                                                    name="highway"
                                                                    data-testid="highway"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Highway" />

                                                                <label className="form-label"></label>
                                                                <p className="show-error">
                                                                    {!formValue.highway ? errorValue.highway : ''}
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg toll-station-pincode"
                                                                    name="pincode"
                                                                    data-testid="pincode"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Pincode" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    {!formValue.pincode ? errorValue.pincode : ''}
                                                                </p>
                                                            </div>
                                                            <div className="form-outline form-white mb-4">
                                                                <button className="button-toll-station"
                                                                    data-testid="submit"
                                                                    type="submit">Submit</button>
                                                            </div>



                                                            {/* <div className="text-center py-5">
                                                                <button className="btn btn-light btn-lg btn-rounded   px-5" 
                                                            
                                                                type="submit">Submit</button>
                                                            </div> */}
                                                        </form>




                                                    </div>



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>










                </div>
            
            </section>
        </>

    )


}

export default AddTollStation
