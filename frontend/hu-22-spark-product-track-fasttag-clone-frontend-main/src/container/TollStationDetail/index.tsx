import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { loadTollStation } from "../../api.service";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import { GetTollStation } from "../../model";
import "./index.css"


type Params = {
    tollStationId: string
}



const TollStationDetail = () => {
    //we need to fetch the id of the toll-station then only we can proceed further in this..
    const history = useHistory();
    const defaultValue: GetTollStation = {
        tollStationId: 0,
        name: "",
        location: {
            state: "",
            city: "",
            highway: "",
            pincode: ""
        },
        tollPrices: [{
            type: "",
            price: 0
        }]
    }
    const { tollStationId } = useParams<Params>();
    const [tollStation, setTollStation] = useState(defaultValue)
    
    


    useEffect(() => {
        loadTollStation(tollStationId).then((res: any) => {
            if (res && res.status == 200) {
                setTollStation(res.data.body);
            }
            else {
                console.log("error while loading the toll-station from the backend ");
            }
        })
    }, [])
    const token = localStorage.getItem('token');

    const onClickUpdate = () => {
        console.log("update the toll-price");
        history.push(`/update-toll-price/${tollStationId}`)
    }
    const onClickAdd = () => {
        console.log(tollStationId);
        /*->now we will redirect it to the add toll price page and pass the tollStationId in the url
        and later we fetch them in the TollPrice Component with the help of the useParams hook*/
        history.push(`/add-toll-price/${tollStationId}`)
    }


    return (

        <>

            <NavBar />

            <section>

                <div className="toll-station-details-main">

                    <SideBar />

                    <div className="toll-station-details-content">

                        <div className="toll-station-details-prices-details">

                            <div className="toll-station-details-toll-price-header-wrap">

                                <h1 className="toll-station-details-toll-prices-heading">Toll Prices</h1>

                                <div className="toll-station-details-toll-price-button-div">
                                    <button className="toll-station-details-add-tollprice-btn tollprice-add" onClick={onClickAdd}>Add Toll Price</button>
                                    <button className="toll-station-details-add-tollprice-btn tollprice-update" onClick={onClickUpdate}>Update Toll Price</button>
                                </div>
                            </div>


                            <div className="toll-station-details-toll-prices-inner-div">

                                <div className="toll-station-details-container-grid toll-station-details-container-grid-header">

                                    <p className="toll-station-view-field toll-station-view-header-field">Vehicle Type</p>
                                    <p className="toll-station-view-field toll-station-view-header-field">Single Journey</p>
                                    <p className="toll-station-view-field toll-station-view-header-field">Return Journey</p>
                                    <p className="toll-station-view-field toll-station-view-header-field">Daily Journey</p>

                                </div>


                                {
                                    tollStation.tollPrices.map((tollPrice) => {

                                        return <div className="toll-station-details-container-grid">

                                         
                        
                        
                        
                                            <p className="toll-station-view-field">
                                                {tollPrice.type}
                                            </p>

                                            <p className="toll-station-view-field">
                                                {tollPrice.price}
                                            </p>

                                            <p className="toll-station-view-field">
                                                {2 * tollPrice.price}
                                            </p>

                                            <p className="toll-station-view-field">
                                                {2 * tollPrice.price - 20}
                                            </p>
                                        </div>

                                    })

                                }

                            </div>

                        </div>

                    </div>


                </div>

            </section>






        </>
    )
}

export default TollStationDetail