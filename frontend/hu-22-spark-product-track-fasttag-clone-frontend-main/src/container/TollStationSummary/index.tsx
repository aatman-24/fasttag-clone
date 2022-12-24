import React from "react";
import "./index.css";


const TollStationSummary = () => {

    return (
        
        <div className="summary-container">

            <div className="toll-station-div">

                <div className="toll-station-details">

                    <div>
                        <h1 className="toll-station-heading">Toll Station Details</h1>
                    </div>
                    

                    <div className="toll-station-inner-div">

                        <div className="left-div-1">

                            <div className="enteries">
                                <p className="enteries-para">TOLL STATION ID</p>
                                <h1 className="enteries-heading">1</h1>
                            </div>

                            <div className="enteries">
                                <p className="enteries-para">TOLL STATION NAME</p>
                                <h1 className="enteries-heading">Station-1</h1>
                            </div>

                            <div className="enteries">
                                <p className="enteries-para">STATE</p>
                                <h1 className="enteries-heading">KARNATAKA</h1>
                            </div>

                        </div>

                        <div className="right-div-2">

                            <div className="enteries">
                                <p className="enteries-para">CITY</p>
                                <h1 className="enteries-heading">Bengaluru</h1>
                            </div>

                            <div className="enteries">
                                <p className="enteries-para">PINCODE</p>
                                <h1 className="enteries-heading">201011</h1>
                            </div>

                            <div className="enteries">
                                <p className="enteries-para">HIGHWAY</p>
                                <h1 className="enteries-heading">NH-24</h1>
                            </div>

                        </div>

                    </div>

                </div>


                <div className="toll-prices-div">

                    <div className="toll-prices-details">

                        <h1 className="toll-prices-heading">Toll Prices</h1>
                    
                        <div className="button-div">
                            <button className="add-tollprice-btn">Add Toll Price</button>
                        </div>


                        <div className="toll-prices-inner-div">

                            <div className="heading-container-1">

                                <div className="vehicle-type"><h3 className="vehicle-heading">Vehicle Type</h3></div>
                                <div className="single-journey"><h3 className="single-heading">Single Journey</h3></div>
                                <div className="return-journey"><h3 className="return-heading">Return Journey</h3></div>
                                <div className="daily"><h3 className="daily-heading">Daily Journey</h3></div>
            
                            </div>


                            <div className="enteries-prices">

                                <div><h4 className="values">CAR</h4></div>
                                <div><h4 className="values">₹210</h4></div>
                                <div><h4 className="values">₹420</h4></div>
                                <div><h4 className="values">₹400</h4></div>

                            </div>

                            <div className="enteries-prices">

                                <div><h4 className="values">BUS</h4></div>
                                <div><h4 className="values">₹410</h4></div>
                                <div><h4 className="values">₹820</h4></div>
                                <div><h4 className="values">₹800</h4></div>

                            </div>

                            <div className="enteries-prices">

                                <div><h4 className="values">TRUCK</h4></div>
                                <div><h4 className="values">₹510</h4></div>
                                <div><h4 className="values">₹1020</h4></div>
                                <div><h4 className="values">₹1000</h4></div>

                            </div>


                        </div>

                    </div>

                </div>


                <div className="footer">
                
                <p className="footer-para">
                    © CopyRights 2015-2022.
                    All Rights are Reserved. 
                </p>

            </div>


            </div>
            
            




        </div>

    )
}

export default TollStationSummary;