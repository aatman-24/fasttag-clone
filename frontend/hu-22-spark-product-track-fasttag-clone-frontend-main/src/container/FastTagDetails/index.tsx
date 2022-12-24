import React, { FC, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { getCardDetails, noOfCardsForLoggedUser } from "../../api.service"
import { ICard } from "../../model"
import { useHistory } from "react-router-dom"
import ReactPaginate from 'react-paginate'

type ICardArr = ICard[];

interface FastTagDetailsProps { }

const FastTagDetails: FC<FastTagDetailsProps> = () => {

    const history = useHistory();

    const defaultValue: ICard[] = [];

    let [cardData, setCardData] = useState(defaultValue);
    const [pageCount, setPageCount] = useState(0);

    var pageNumber = 0;
    var pageSize = 3;

    const setDataCard = (pageNumber: number, pageSize: number) => {
        getCardDetails(pageNumber, pageSize).then((res: any) => {
            setCardData(res.body);
        })
            .catch((err) => {
                alert(err.message);
                history.push('/signin');
            });
    }

    //here we need to pass the username of the logged in user..
    //no need to pass the username we are fetching the username from the jwt token
    useEffect(() => {
        setDataCard(pageNumber, pageSize);

        noOfCardsForLoggedUser().then((res:any)=>{
            if(res && res.status===200){
                var total=res.data.body;
                setPageCount(Math.ceil(total/pageSize));
            }
        })
    }, [])

    const handlePageClick=(event:any)=>{
        pageNumber=event.selected;
        setDataCard(pageNumber,pageSize)
    }


    const onClick = (cardId: any) => {
        history.push(`/recharge-card/${cardId}`);
    }

    console.log(cardData);

    let topSixData: ICardArr = cardData.slice(0, Math.min(6, cardData.length));

    return (

        <>

            <div className="fasttag-details-main">

                <div className="fasttag-details-grid fasttag-details-header">

                    <p className="fasttag-details-header" data-testid="fastTag">FASTTAG ID</p>
                    <p className="fasttag-details-header" data-testid="vehicle">VEHICLE NUMBER</p>
                    <p className="fasttag-details-header" data-testid="type">VEHICLE TYPE</p>
                    <p className="fasttag-details-header" data-testid="balance">BALANCE</p>
                    <p className="fasttag-details-header"></p>

                </div>


                {

                    topSixData.map((card: ICard) => {

                        if (card !== undefined)

                            return (

                                <>

                                    <div className="fasttag-details-grid">
                                        <p className="fasttag-details-field">{card.cardId}</p>
                                        <p className="fasttag-details-field">{card.vehicle === undefined ? "-" : card.vehicle.numberPlate}</p>
                                        <p className="fasttag-details-field">{card.vehicle === undefined ? "-" : card.vehicle.vehicleType}</p>
                                        <p className="fasttag-details-field">{card.vehicle === undefined ? "-" : card.vehicle.wallet === undefined ? 0 : card.vehicle.wallet.balance}</p>
                                        <button type="submit" className="fasttag-details-reachragebutton" onClick={() => {
                                            onClick(card.cardId)

                                        }}>Recharge</button>
                                    </div>
                                    
                                </>

                            );

                    })
                }
                

            </div>
            <div className="page">
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
        </>

    );
};

export default FastTagDetails;



