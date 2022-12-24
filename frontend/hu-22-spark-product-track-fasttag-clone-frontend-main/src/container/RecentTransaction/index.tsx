import React, { FC, useEffect, useState } from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import { ITransactionDetail } from "../../model";
import { getNoofTransactionforUser, getTransactionDetails } from "../../api.service";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import ReactPaginate from "react-paginate";

type ITransactionDetailArr = ITransactionDetail[];

interface RecentTransactionProps { }

const getDateFormat = (date: Date) => {
  return date.toLocaleDateString;
};

const getTimeFormat = (date: Date) => {
  return date.toLocaleTimeString;
};

const RecentTransaction: FC<RecentTransactionProps> = () => {
  const history = useHistory();

  const defaultValue: ITransactionDetail[] = [];
  let [transactionData, setTransactionData] = useState(defaultValue);

  var pageNumber = 0;
  var pageSize = 5;
  const [pageCount,setPageCount]=useState(0);

  const setTransData = (pageNumber:number,pageSize:number) => {
    getTransactionDetails(pageNumber, pageSize)
      .then((res: any) => {
        setTransactionData(res.body);
      })
      .catch((err) => {
        alert(err.message);
        history.push("/signin");
      });
    
    getNoofTransactionforUser().then((res:any)=>{
      if(res && res.status==200){
          var total=res.data.body;
          setPageCount(Math.ceil(total/pageSize));
      }
      else{
        console.log("erro while fetching the number of transaction for the user")
      }
    })
  }



  useEffect(() => {
    setTransData(pageNumber,pageSize);
  }, []);

  const handlePageClick=(event:any)=>{
     console.log(event.selected);
     pageNumber=event.selected;
     setTransData(pageNumber,pageSize)
  }

  console.log(transactionData);

  let recentTransactions: ITransactionDetailArr = transactionData.slice(
    0,
    Math.min(10, transactionData.length)
  );

  return (
    <>
      <>
        <NavBar />

        <section>
          <div className="dashboard-main">
            <SideBar />

            <div className="recent-transaction-dashboard-content">
              <div className="recent-transaction-windup">
                <h1 className="transaction-header">TRANSACTION HISTORY</h1>
              </div>

              <div className="recent-transaction-main">
                <div className="recent-transaction-grid recent-transaction-header">
                  <p className="recent-transaction-field recent-transaction-header-field"
                    data-testid="id">Transaction ID</p>
                  <p className="recent-transaction-field recent-transaction-header-field"
                    data-testid="date">Date</p>
                  <p className="recent-transaction-field recent-transaction-header-field"
                    data-testid="location">Location</p>
                  <p className="recent-transaction-field recent-transaction-header-field"
                    data-testid="fastTagId">FastTag ID</p>
                  <p className="recent-transaction-field recent-transaction-header-field"
                    data-testid="amount">Amount</p>
                </div>

                {recentTransactions.map((transaction: ITransactionDetail) => {
                  if (
                    transaction !== undefined &&
                    transaction.tollStation !== null
                  )
                    return (
                      <>
                        <div className="recent-transaction-grid">

                          <p className="recent-transaction-field">
                            {transaction.transactionId}
                          </p>
                          <p className="recent-transaction-field">
                            {transaction.date.slice(0, 10) +
                              " " +
                              transaction.date.slice(11, 19)}
                          </p>
                          <p className="recent-transaction-field">
                            {transaction.tollStation === undefined
                              ? "-"
                              : transaction.tollStation.name}
                          </p>
                          <p className="recent-transaction-field">
                            {transaction.cardId}
                          </p>

                          <p className={transaction.amount !== undefined ? transaction.amount > 0 ? "recent-transaction-field amount-green" : "recent-transaction-field amount-red" : "recent-transaction"}>
                            {transaction.amount !== undefined && transaction.amount > 0 ? "+" + transaction.amount : transaction.amount}
                          </p>

                        </div>

                        
                      </>

                    );
                })}
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
              
              
              
            </div>
            
          </div>
        </section>
      </>
    </>
  );
};

export default RecentTransaction;