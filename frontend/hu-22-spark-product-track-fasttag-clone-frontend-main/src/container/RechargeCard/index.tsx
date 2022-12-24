import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {recharge} from "../../api.service"
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import "./index.css";
import fastTag from "../../static/fastTag.png"

/*we will receive the cardId as the props from the Dashboard...amd
this cardId will be sent in the url from the frontend to hit the api at the back-end*/
type Params={
    cardId:string
}
const RechargeCard=()=>{
    const {cardId}=useParams<Params>();
    const history=useHistory();
    const[amount,setAmount]=useState('');
    const[error,setError]=useState('');
    const[isRecharged,setIsRecharged]=useState(true);

    const handleInputChange=(event:any)=>{
        console.log(event);
        setAmount(event.target.value)
    }
    // const cardId:string="CARD1"; //for testing
    const onSubmit=(event:any)=>{
        event.preventDefault();
        console.log(amount) //we fetched the amoount that is entered by the user on the client-side

        //will do the validation..
        if(!amount){
            setError('Enter the amount');
        }

        if(amount)
        {
            const res=recharge(cardId,amount);

            res.then((res:any)=>{
                if(res && res.status===200){
                    console.log("card is recharged successfully");
                    history.push('/dashboard')
                }
                else{
                    setIsRecharged(false);
                }
            })
        }
    }
    return(
        
    <>

        <NavBar />

        <section>
            
            <div className="dashboard-main">
                
                <SideBar />


                <section className="recharge-card-intro" >
                    { //here we will add the line that will be shown when the order can't be placed
                        !isRecharged && <p className="show-creating-error">Recharge can't be done!!!</p>
                    }
                        <div className="bg-image h-100" style={{ backgroundImage: ('https://mdbootstrap.com/img/Photos/new-templates/search-box/img4.jpg') }}>
                            
                            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#f6f6f6" }}>
                                
                                <div className="container">
                                    
                                    <div className="row justify-content-center">
                                        
                                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                            
                                            <div className="card gradient-custom-new-2" >
                                                
                                                <div className="card-body p-5 text-white">

                                                <div className="form-outline form-white mb-4">
                                                    {/* <button className="btn btn-light btn-lg btn-rounded   px-5"
                                                    data-testid="rechargecard"
                                                    >Recharge Card</button> */}
                                                </div>
                                                    <div>
                                                        <img className="logo-image-7" src={fastTag}></img>
                                                    </div>


                                                    <div className="my-md-5">

                                                        <div className="text-center pt-1">
                                                            <i className="fas fa-user-astronaut fa-3x"></i>
                                                            <h1 className="fw-bold my-5 text-uppercase add-toll-station"
                                                            data-testid="recharge">Recharge Card</h1>
                                                        </div>
                                                        
                                                        <form onSubmit={onSubmit}>
                                                            <div className="form-outline form-white mb-4">
                                                                <input type="text" id="typeEmail" className="form-control form-control-lg amount-input"
                                                                    name="amount"
                                                                    onChange={handleInputChange}
                                                                    placeholder="Enter the Amount" />

                                                                <label className="form-label" ></label>
                                                                {
                                                                    // (!formValue.numberPlate && errorValue.numberPlate) ? <p>
                                                                    //     {errorValue.numberPlate}
                                                                    // </p> : ''
                                                                    !amount && error?<p>{error}</p>:'' 
                                                                }
                                                            </div>
                                                            
                                                            

                                                            <div className="form-outline form-white mb-4">
                                                                <button className="button-recharge-card"
                                                               
                                                                >Recharge Card</button>
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

export default RechargeCard

