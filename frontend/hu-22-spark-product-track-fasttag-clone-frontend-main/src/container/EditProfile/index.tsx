import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUser, updateUser } from "../../api.service";
import { IPersonError, IUser } from "../../model";
import "./index.css"

import fastTag from "../../static/fastTag.png"
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";

//their is no-need to pass anything we have the api to fetch the logged user that will do the job
const EditUser = () => {
    const history = useHistory();
    const defaultValue: IUser = {};
    const defaultErrorValue: IPersonError = {
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:""
    };
    const [user, setUser] = useState(defaultValue);
    const [error, setError] = useState(defaultErrorValue);
    const [isUpdated,setIsUpdated]=useState(true);

    //the moment the fn is rendred useEffect will be triggered and the api-call to the backend will be made
    useEffect(() => {
        getUser().then((res) => {
            setUser(res);
        })

    }, [])

    const onChange = (event: any) => {
        const { name, value } = event.target;
        console.log(name); //this will be the fieldname like firstName,lastName and email
        console.log(value);

        setUser({
            ...user,
            [name]: value
        })
    }
    const validate = (user: IUser) => {
        const error: IPersonError = {};

        if (!user.firstName) {
            error.firstName = "their should be a firstName";
        }
        

        if (!user.lastName) {
            error.lastName = "their should be a lastName";
        }

        if (!user.email) {
            error.email = "their sould be a email";
        }

        if (!user.mobileNumber) {
            error.phoneNumber = "their should be a mobile number";
        }
        else if (user.mobileNumber.length !== 10) {
            error.phoneNumber = "mobile number should be of 10 digits";
        }

        return error;
    }
    const onSubmit = (event: any) => {
        event.preventDefault();
        //we will have to do the validation....
        setError(validate(user));
        //we should not send the password their is the issue
        console.log("the complete user is ",user)
        //if all the fields inside the error is empty then only we will make a call
        if (user.firstName && user.lastName && user.email && user.mobileNumber && user.mobileNumber.length==10) {
            const res = updateUser(user);
            res.then((res: any) => {
                if (res && res.status) {
                    history.push('/dashboard');
                }
                else{
                    setIsUpdated(false);
                }

            })
        }

    }
    return (

        <>

            <NavBar />

            <section>
            
                <div className="dashboard-main">
                    
                    <SideBar />

                    <section className="edit-user-intro" >
                        {  !isUpdated && <p className="show-creating-error" >Updation Can't be done</p>
                        }
                        <div className="bg-image h-100" style={{ backgroundImage: ('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg') }}>
                            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f6f6f6" }}>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                            <div className="card gradient-custom-new-9">
                                                <div className="card-body p-5 text-white">

                                                    <div>
                                                        <img className="logo-image-14" src={fastTag}></img>
                                                    </div>


                                                    <div className="my-md-5">

                                                        <div className="text-center pt-1">
                                                            <i className="fas fa-user-astronaut fa-3x"></i>
                                                            <h1 className="fw-bold my-5 text-uppercase add-toll-station" data-testid="header">Update User</h1>
                                                        </div>
                                                        <form onSubmit={onSubmit}>
                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg edit-profile-firstName"
                                                                    name="firstName"
                                                                    value={user.firstName}
                                                                    onChange={onChange}
                                                                    placeholder="First Name" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    { !user.firstName &&error.firstName && error.firstName }
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg edit-profile-lastName"
                                                                    name="lastName"
                                                                    value={user.lastName}
                                                                    onChange={onChange}
                                                                    placeholder="Last Name" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    { !user.lastName && error.lastName && error.lastName}
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg edit-profile-phone"
                                                                    name="mobileNumber"
                                                                    value={user.mobileNumber}
                                                                    onChange={onChange}
                                                                    placeholder="Mobile Number" />

                                                                <label className="form-label" ></label>
                                                                <p className="show-error">
                                                                    { !user.mobileNumber && error.phoneNumber ? error.phoneNumber:
                                                                    error.phoneNumber="mobile number should be of 10 digits" && error.phoneNumber}
                                                                </p>
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg edit-profile-email"
                                                                    name="email"
                                                                    value={user.email}
                                                                    onChange={onChange}
                                                                    placeholder="Email " />

                                                                <label className="form-label"></label>
                                                                <p className="show-error">
                                                                    {!user.email && error.email && error.email }
                                                                </p>
                                                            </div>


                                                            <div className="form-outline form-white mb-4">
                                                                <button className="button-edit-profile"
                                                                    data-testid="submit"
                                                                    type="submit"
                                                                >Update</button>
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

export default EditUser;





