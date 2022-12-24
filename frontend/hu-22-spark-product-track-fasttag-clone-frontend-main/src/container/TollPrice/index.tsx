import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addTollPrice, getTollStation } from "../../api.service"
import { TollPrice, TollPriceError } from "../../model"
import "./index.css"
import fastTag from "../../static/fastTag.png"
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";

type Params = {
    tollStationId: string
}

const AddTollPrice = () => {
    const { tollStationId } = useParams<Params>();
    const history = useHistory();
    const defaultValue: TollPrice = {
        tollStationId: tollStationId,
        price: '',
    }
    const [tollprices, setTollPrices] = useState([]);


    //just a simple normal js-object
    //0 will simply means that we have declared the price for that type
    var vehicle_type = {
        bus: 0,
        car: 0,
        truck: 0,
        bike: 0
    }

    useEffect(() => {
        /*->we got the toll-station id now we can make the api-call and will get all the details of
        the toll-station. 
        ->we will get the toll-price array from their we can check that ...and will only show those
        types in the list whose price is not yet declared */
        getTollStation(tollStationId).then((res) => {
            if (res && res.status == 200) {
                //console.log(res.data.body.tollPrices);
                setTollPrices(res.data.body.tollPrices);
            }
            else {
                console.log("error while loading the toll-station");
            }
        })

    }, [])



    const defaultErrorValue: TollPriceError = {
    }
    const [formValue, setFormValue] = useState(defaultValue);
    const [errorValue, setErrorValue] = useState(defaultErrorValue);
    const [type, setType] = useState('');
    const [isCreated, setIsCreated] = useState(true);


    const validate = (value: TollPrice, type: string) => {
        //this will gonna to return an object of erro..
        const error: TollPriceError = {};

        if (!value.price) {
            error.price = "Enter the price for the vehicle";
        }
        else {
            //the price shoud be valid...it should only contain numbers not alpabets
            //backend ke sath datatype ka issue nhi hoga kya??
            //postman mei tu price ka data-type double he aa rha hai
            var entered_price: string = value.price;
            for (var i = 0; i < entered_price.length; i++) {
                var ele = entered_price.charAt(i);
                if (!(ele === '1' || ele === '2' || ele === '3' || ele === '4' || ele === '5'
                    || ele === '6' || ele === '7' || ele === '8' || ele === '9' || ele === '0' || ele === '.')) {
                    error.price = "Enter the proper price";
                }
            }
        }
        /* ->no need for this as it is coming from the url user will not have to add it
        if(!value.tollStationId){
            error.tollStationId="Enter the toll-station id";
        }*/
        if (!type) {
            error.type = "Choose the type of vehcile";
        }

        return error;
    }

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const onClick = (event: any) => {
        console.log(event.target.value)
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

    const onSubmit = (event: any) => {
        event.preventDefault();
        console.log('the value entered by the user is ', formValue);
        console.log("the type of the vechicle choosen is ", type);

        //first we will have to do the validation part...
        setErrorValue(validate(formValue, type));//we will pass the updated error-value inside it


        if (formValue.price.length > 0 && formValue.tollStationId.length > 0 && type.length > 0) {
            //admin has entered all the 3 things now we will have to make a call..
            const res = addTollPrice(formValue, type);
            console.log(res);
            res.then((res: any) => {
                if (res && res.status === 200) {
                    console.log("Toll-price is added successfully");
                    //now we can use the usehistory hook to redirect it to any other web-page
                    history.push(`/toll-station-detail/${tollStationId}`)
                }
                else {
                    setIsCreated(false);
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


                    <section className="toll-price-intro" >
                        { //here we will add the line that will be shown when the toll-price is not adde
                            !isCreated && <p className="show-creating-error">Toll Price not Added!!!</p>
                        }
                        <div className="bg-image h-100" style={{ backgroundImage: ('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg') }}>
                            
                            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f6f6f6" }}>
                                
                                <div className="container">
                                    
                                    <div className="row justify-content-center">
                                        
                                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                            
                                            <div className="card gradient-custom-new-3">
                                                
                                                <div className="card-body p-5 text-white">

                                                    <div>
                                                        <img className="logo-image-8" src={fastTag}></img>
                                                    </div>

                                                    <div className="my-md-5">

                                                        <div className="text-center pt-1">
                                                            <i className="fas fa-user-astronaut fa-3x"></i>
                                                            <h1 className="fw-bold my-5 text-uppercase add-toll-station"
                                                            data-testid="header">Add Toll Price</h1>
                                                        </div>
                                                        
                                                        <form onSubmit={onSubmit}>
                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg toll-price-id"
                                                                    name="tollStationId"
                                                                    data-testid="id"
                                                                    value={tollStationId}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Toll Station Id" />

                                                                <label className="form-label" ></label>

                                                            </div>
                                                            
                                                            <div className="form-outline form-white mb-4">
                                                                <select className="form-select toll-price-vehicle"
                                                                    aria-label="Default select example"
                                                                    onClick={onClick}
                                                                >
                                                                    {//-> 1 simply indicates that the price has been declared for that type
                                                                        tollprices.map((tollprice: any) => {
                                                                            console.log(tollprice);
                                                                            if (tollprice.type == 'CAR') {
                                                                                vehicle_type.car = 1;
                                                                            }
                                                                            if (tollprice.type == 'BUS') {
                                                                                vehicle_type.bus = 1;
                                                                            }
                                                                            if (tollprice.type == 'TRUCK') {
                                                                                vehicle_type.truck = 1;
                                                                            }
                                                                            if (tollprice.type == 'BIKE') {
                                                                                vehicle_type.bike = 1;
                                                                            }

                                                                        })
                                                                    }
                                                                    <option disabled selected value=""className="vehicle-type"
                                                                    data-testid="default">Select vehicle Type</option>
                                                                    {vehicle_type.car == 0 &&<option value="1">Car</option>}
                                                                    {vehicle_type.bus == 0 && <option value="2">Bus</option>}
                                                                    {vehicle_type.truck == 0 &&<option value="3">Truck</option>}
                                                                    {vehicle_type.bike == 0 &&<option value="4">Bike</option> }
                                                                        
                                                                
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
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg vehicle-price"
                                                                    name="price"
                                                                    data-testid="price"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter Price for Vehicle" />

                                                                <label className="form-label" ></label>
                                                                {
                                                                    !formValue.price && errorValue.price ? <p>
                                                                        {errorValue.price}
                                                                    </p> :
                                                                        errorValue.price == "Enter the proper price" && <p>{errorValue.price}</p>
                                                                }
                                                            </div>

                                                            <div className="form-outline form-white mb-4">
                                                                <button className="button-toll-price"
                                                                data-testid="submit"> Submit</button>

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

export default AddTollPrice;


/*  Old-form code
    <>
            <div className="container-fluid bg-secondary p-3 text-center">
                <h1> Add Toll Price</h1>
            </div>
            <div className="container col-md-4 offset-md-4 mt-5" style={{ backgroundColor: 'burlywood' }}>
                <div className="row">
                    <div className="col-md-6 offset-md-3" >
                        <form className="mt-3">
                            <div className="form-group mb-3">
                                <label className="form-label">Id of Toll-Station</label>
                                <input type="number" className="form-control" placeholder="Enter Id"></input>

                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Type of Vehicle</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Select vehicle Type</option>
                                    <option value="1">Car</option>
                                    <option value="2">Bus</option>
                                    <option value="3">Truck</option>
                                    <option value="4">Bike</option>
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label className="form-label">Price </label>
                                <input type="number" className="form-control" placeholder="Enter Price">
                                </input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         </>*/
















         