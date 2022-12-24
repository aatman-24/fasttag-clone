import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {PlaceOrder} from "../../api.service"
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import {OrderCard,OrderCardError} from "../../model"
import "./index.css";

const PurchaseCard = () => {

    const history=useHistory();

    const defaultValue: OrderCard = {
        numberPlate: '',
        registrationNo: ''
    }
    const defaultErrorValue: OrderCardError = {};

    const [formValue, setFormValue] = useState(defaultValue);
    const [errorValue, setErrorValue] = useState(defaultErrorValue);
    const [type, setType] = useState('');
    const [isPurchased,setIsPurchased]=useState(true);
   
    
    const validate=(value:OrderCard,type:string)=>{
        const error:OrderCardError={};

        if(!value.numberPlate){
            error.numberPlate="Enter the Number Plate";
        }
        if(!value.registrationNo){
            error.registrationNo="Enter the registration no";
        }
        if(!type){
            error.type="Choose the vehilce type";
        }
        return error;
    }


    const onClick = (event: any) => {
        //in the event.target.value we will fetch the value of the type of the vehicle that is selected
        const { value } = event.target;
        if (value == '1') {
            setType("CAR");
        }
        else if (value == '2') {
            setType("BUS");
        }
        else if (value == '3') {
            setType("TRUCK");
        }
        else {
            setType("BIKE");
        }

    }

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;

        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const onSubmit = (event: any) => {
        event.preventDefault();
        //console.log(formValue);
        //console.log(type)

        //now we will do the validation and after the validation we will make an api call
        setErrorValue(validate(formValue,type));

        if(formValue.numberPlate && formValue.registrationNo && type){
            
            const response=PlaceOrder(formValue,type);

            response.then((res)=>{
                if(res && res.status===200)
                {
                    console.log("order of card is placed succeessfully");
                    history.push('/dashboard');
                }
                else{
                    setIsPurchased(false);
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



                <section className="order-card-intro" >
                    { //here we will add the line that will be shown when the order can't be placed
                        !isPurchased && <p className="show-creating-error">Order Can't be placed!!</p>
                    }
                    <div className="bg-image h-100" style={{ backgroundImage: ('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg') }}>
                        
                        <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f6f6f6" }}>
                            
                            <div className="container">
                                
                                <div className="row justify-content-center">
                                    
                                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                        
                                        <div className="card gradient-custom-new">
                                            
                                            <div className="card-body p-5 text-white">

                                                <div>
                                                    <img className="logo-image-5" src="images/fastTag.png"></img>
                                                </div>

                                                <div className="my-md-5">

                                                    <div className="text-center pt-1">
                                                        <i className="fas fa-user-astronaut fa-3x"></i>
                                                        <h1 className="fw-bold my-5 text-uppercase add-toll-station">Purchase Card</h1>
                                                    </div>
                                                    
                                                    <form onSubmit={onSubmit}>
                                                        
                                                        <div className="form-outline form-white mb-4">
                                                            <input type="text" id="typeEmail" className="form-control form-control-lg number-plate-input"
                                                                name="numberPlate"
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Number Plate" />

                                                            <label className="form-label" ></label>
                                                            {
                                                                (!formValue.numberPlate && errorValue.numberPlate) ? <p>
                                                                    {errorValue.numberPlate}
                                                                </p> : ''
                                                            }
                                                        </div>
                                                        
                                                        <div className="form-outline form-white mb-4">
                                                            <select className="form-select vehicle-input"
                                                                aria-label="Default select example"
                                                                data-testid="vehicletype"
                                                                onClick={onClick}
                                                            >
                                                                <option disabled selected value="" className="vehicle-type-place"
                                                                data-testid="default">Select vehicle Type</option>
                                                                <option value="1" className="vehicle-type-place">Car</option>
                                                                <option value="2" className="vehicle-type-place">Bus</option>
                                                                <option value="3" className="vehicle-type-place">Truck</option>
                                                                <option value="4" className="vehicle-type-place">Bike</option>
                                                            </select>

                                                            <label className="form-label" ></label>
                                                            {
                                                                !type && errorValue.type ? <p>
                                                                    {errorValue.type}
                                                                </p> :
                                                                    ''
                                                            }

                                                        </div>
                                                        
                                                        <div className="form-outline form-white mb-4">
                                                            <input type="text" id="typeEmail" className="form-control form-control-lg registration-input"
                                                                name="registrationNo"
                                                                onChange={handleInputChange}
                                                                placeholder="Enter Registration no for Vehicle" />

                                                            <label className="form-label" ></label>
                                                            {
                                                                !formValue.registrationNo && errorValue.registrationNo ? <p>
                                                                    {errorValue.registrationNo}
                                                                </p> : ''
                                                            }
                                                        </div>

                                                        <div className="form-outline form-white mb-4">
                                                            <button className="button-order"

                                                            >Place Order</button>

                                                            {/* btn btn-lg px-5  */}


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

export default PurchaseCard




















