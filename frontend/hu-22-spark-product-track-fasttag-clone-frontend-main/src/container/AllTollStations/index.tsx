import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import "./index.css"
import { getTotalNumberofTollStation, loadAllTollStations } from "../../api.service";
import ReactPaginate from "react-paginate";

const AllTollStations = () => {

    //to implement the pagination we have to update this state
    const [tollStations, setTollStations] = useState([]);
    const [pageCount,setPageCount]=useState(0);
    const history = useHistory();
    var response: any;

    var pageNumber=0;
    var pageSize=4; //no of toll-station that will be loaded on a page

    /*->the issue in the pagination is that if the component get re-render then the states will
    have the default-value and the changes done in the state won't be visible */
    const setTheTollStations=(pageNumber:number)=>{
        loadAllTollStations(pageNumber, pageSize).then((res: any) => {
            if (res && res.status == 200) {
                setTollStations(res.data.body);
            }
            else {
                console.log("Error while loading the toll-station from the backend")
            }
        })

        
    }

    useEffect(() => {
        setTheTollStations(pageNumber);

        getTotalNumberofTollStation().then((res:any)=>{
            if(res && res.status==200){
                console.log(res.data.body); //total no of toll-station
                var total=res.data.body
                setPageCount(Math.ceil(total/pageSize));
            }
            else{
                console.log("number of toll-station can't be loaded")
            }
        })
     }, [])



    const onClick = (event: any) => {
        history.push('/add-toll-station')
    }


    const moreDetails = (id: any) => {
        console.log(id); //this is the toll-station id whose details user wants to see...
        /*->we will use the useParams hook to fetch the id from the url */
        history.push(`/toll-station-detail/${id}`);
    }
    //var tollStations=response.data.body;
    console.log(tollStations); //we are getting all the toll-station

    
    //here we will again make a call to the server with the updated no
    const handlePageClick=async (event:any)=>{
        console.log(event);
        pageNumber=event.selected;
        setTheTollStations(pageNumber);
    }


    return (
        <>

            <NavBar />

            <section>

                <div className="toll-station-dashboard-main">

                    <SideBar />

                    <div className="toll-station-dashboard-content">

                        <div className="toll-stations-main">

                            <div className="toll-stations-container">

                                <div className="toll-station-header">
                                    <h1 className="toll-stations-heading">TOLL STATIONS</h1>
                                    <div className="tollstation-button-div">
                                        <button className="new-tollstation-btn" onClick={onClick}>Add Toll Station</button>
                                    </div>

                                </div>

                                <div className="toll-stations-entries">

                                    <div className="toll-station-grid tollstation-heading-container">
                                        <p className="toll-station-field toll-station-header-field">Toll Station ID</p>
                                        <p className="toll-station-field toll-station-header-field">Name</p>
                                        <p className="toll-station-field toll-station-header-field">State</p>
                                        <p className="toll-station-field toll-station-header-field">City</p>
                                        <p className="toll-station-field toll-station-header-field">Pincode</p>
                                        <p className="toll-station-field toll-station-header-field">Highway</p>
                                        <p className="toll-station-field toll-station-header-field">Details</p>

                                    </div>

                                    {
                                        tollStations.map((tollStation: any) => {

                                            return (

                                                <>


                                                    <div className="toll-station-grid">


                                                        <p className="toll-station-field">
                                                            {tollStation.tollStationId}
                                                        </p>


                                                        <p className="toll-station-field">
                                                            {tollStation.name}
                                                        </p>


                                                        <p className="toll-station-field">
                                                            {tollStation.location.state}
                                                        </p>


                                                        <p className="toll-station-field">
                                                            {tollStation.location.city}
                                                        </p>


                                                        <p className="toll-station-field">
                                                            {tollStation.location.pincode}
                                                        </p>


                                                        <p className="toll-station-field">
                                                            {tollStation.location.highway}
                                                        </p>

                                                        <button className="toll-station-field details-btn" onClick={
                                                            //this is used when we have to pass something in the argument
                                                            () => {
                                                                return moreDetails(tollStation.tollStationId)
                                                            }}>
                                                            More Details
                                                        </button>

                                                    </div>




                                                </>


                                            )
                                        })

                                    }


                                </div>
                                
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    breakLabel={"..."}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination justify-content-center"}
                                    pageClassName={"page-item"}
                                    pageLinkClassName={"page-link"}
                                    previousClassName={"page-item"}
                                    previousLinkClassName={"page-link"}
                                    nextClassName={"page-item"}
                                    nextLinkClassName={"page-link"}
                                    breakClassName={"page-item"}
                                    breakLinkClassName={"page-link"}
                                    activeClassName={"active"}
                                />
                                
                                

                            </div>

                        </div>
                    </div>

                </div>
            </section>
        </>

    )
}

export default AllTollStations

