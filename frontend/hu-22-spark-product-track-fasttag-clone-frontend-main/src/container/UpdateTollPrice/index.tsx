import { type } from "os";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validateLocaleAndSetLanguage } from "typescript";
import { getTollStation, updateTollPrice } from "../../api.service";
import { TollPrice, TollPriceError } from "../../model";
import "./index.css"
import fastTag from "../../static/fastTag.png"
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";

type Params={
    tollStationId:string
}
const UpdateTollPrice=()=>{
    //we fetched the toll-station-id from the url
    const {tollStationId}=useParams<Params>();
    const history=useHistory();

    const defaultValue:TollPrice={
        tollStationId:tollStationId, //this is fixed will not gonna to change
        price:''
    }
    const defaultErrorValue:TollPriceError={}

    const[formValue,setFormValue]=useState(defaultValue);
    const[errorValue,setErrorValue]=useState(defaultErrorValue);
    const[type,setType]=useState('');
    const[isUpadted,setIsUpdated]=useState(true);
    const [tollprices, setTollPrices] = useState([]);

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
    
    //0 means the price is not added for it...if not added then how the update is possible
    var vehicle_type = {
        bus: 0,
        car: 0,
        truck: 0,
        bike: 0
    }

    const validate=()=>{
        const error:TollPriceError={};
        if(!formValue.price){
            error.price="Enter the upadted price";
        }
        else{
            //the price should be proper...
            var entered_price: string = formValue.price;
            for (var i = 0; i < entered_price.length; i++) {
                var ele = entered_price.charAt(i);
                if (!(ele === '1' || ele === '2' || ele === '3' || ele === '4' || ele === '5'
                    || ele === '6' || ele === '7' || ele === '8' || ele === '9' || ele === '0' || ele === '.')) {
                    error.price = "Enter the proper price";
                }
            }
        }
        if(!type){
            error.type="Select a vehicle";
        }
        //no need to check for the tollStationId it will come from the url only...
        return error;
    }

    const onSubmit=(event:any)=>{
        //here we will make an api call that will gonna to do the updation of the toll-price
        event.preventDefault();

        // we will do the validation and show certain messages if the admin has missed some of the fields
        setErrorValue(validate()); 

        //now we will make an api call to the backend server for the updation of toll-price
        const res=updateTollPrice(formValue,type);
        res.then((res)=>{
            if(res && res.status==200)
            {
                console.log("updation is done successfully");
                history.push(`/toll-station-detail/${tollStationId}`)
            }
            else{
               setIsUpdated(false);
            }
        })
    }

    const onClick=(event:any)=>{
        console.log(event.target.value);
        const {value}=event.target;
        if(value=="1"){
            setType("CAR");
        }
        else if(value=="2"){
            setType("BUS");
        }
        else if(value=="3"){
            setType("TRUCK");
        }
        else{
            setType("BIKE");
        }
    }

    const handleInputChange=(event:any)=>{
        const {name,value}=event.target;
        setFormValue({
            ...formValue,
            [name]:value
        })
    }

    return(


        <>

            <NavBar />

            <section>
            
                <div className="dashboard-main">
                    
                    <SideBar />


                        <section className="update-toll-price-intro" >
                            { //here we will add the line that will be shown when the toll-price is not upadted
                                !isUpadted && <p className="show-creating-error">Updation can't be done!!!</p>
                            }
                            <div className="bg-image h-100" style={{ backgroundImage: ('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg') }}>
                                
                                <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f6f6f6" }}>
                                    
                                    <div className="container">
                                        
                                        <div className="row justify-content-center">
                                            
                                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                                
                                                <div className="card gradient-custom-new-7">
                                                    
                                                    <div className="card-body p-5 text-white">

                                                        <div>
                                                            <img className="logo-image-10" src={fastTag}></img>
                                                        </div>

                                                        <div className="my-md-5">

                                                            <div className="text-center pt-1">
                                                                <i className="fas fa-user-astronaut fa-3x"></i>
                                                                <h1 className="fw-bold my-5 text-uppercase add-toll-station">Update Toll Price</h1>
                                                            </div>
                                                            
                                                            <form onSubmit={onSubmit}>
                                                                <div className="form-outline form-white mb-4">
                                                                    <input type="text" id="typeEmail" className="form-control form-control-lg update-toll-price"
                                                                        name="tollStationId"
                                                                        value={tollStationId}
                                                                        onChange={handleInputChange}
                                                                        placeholder="Enter Toll Station Id" />

                                                                    <label className="form-label" ></label>

                                                                </div>
                                                                
                                                                <div className="form-outline form-white mb-4">
                                                                    <select className="form-select update-vehicle"
                                                                        aria-label="Default select example"
                                                                        onClick={onClick}
                                                                    >
                                                                        {//-> 1 simply indicates that the price has been declared for that type
                                                                        //and we will show that type only when that is already added..
                                                                                tollprices.map((tollprice: any) => {
                                                                                    
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
                                                                        
                                                                        <option disabled selected value="" className="vehicle-type">Select vehicle Type</option>
                                                                        {vehicle_type.car==1 &&<option value="1">Car</option>}
                                                                        {vehicle_type.bus==1 && <option value="2">Bus</option>}
                                                                        {vehicle_type.truck==1 && <option value="3">Truck</option>}
                                                                        {vehicle_type.bike==1 && <option value="4">Bike</option>} 
                                                                            
                                                                    
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
                                                                    <input type="text" id="typeEmail" className="form-control form-control-lg update-price-vehicle"
                                                                        name="price"
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
                                                                    <button className="update-toll-price-button"

                                                                    >Submit</button>
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

export default UpdateTollPrice










 

