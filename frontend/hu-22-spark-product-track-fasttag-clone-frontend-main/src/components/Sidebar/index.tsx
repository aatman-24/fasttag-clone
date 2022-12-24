import React, { useEffect, useState } from "react";
import "./index.css";
import dashBoardImg from "../../static/dashboard.png"
import TransactionHistoryImg from "../../static/transaction-history.png"
import userProfileImg  from "../../static/user-profile.svg"
import tollStationImg from "../../static/barrier.png"
import { IUser } from "../../model";
import { getUser } from "../../api.service";
import { Link } from "react-router-dom";


/*->we wll not use the anchor tag bcz it will gonna to refresh the entire page instead of that
we will use the link Tag and it will gonna to render only the desired component this will increase
the performance of our app */
const SideBar: React.FC = () => {

  /*->we also need the currenlty logged in user here bcz we all-toll-station option should be visible only
  to admin not to the normal user*/
  const defaultValue: IUser = {};
  const [user, setUser] = useState(defaultValue);

  useEffect(() => {
    //this getUser is fetching the details of the logged user
    getUser().then((res) => {
      setUser(res);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])
  return (
    <>
      <aside className="sidebar-main">

        <div className="sidebar-images">
          <Link to="/dashboard">
            <img
              src={dashBoardImg}
              alt="dashboard"
              className="sidebar-img"
            />
          </Link>
          <br />
          <Link to="/recent-transactions">
            <img
              src={TransactionHistoryImg}
              alt="Transaction-History"
              className="sidebar-img"
            />
          </Link>
          <br />




         {
           user.admin && 
          <Link to="/all-toll-station">
          <img
              src={tollStationImg}
              alt="toll-station"
              className="sidebar-img toll-station-img"
            />
          </Link>
         }


          
          
        </div>
      </aside>
    </>
  );
};

export default SideBar;