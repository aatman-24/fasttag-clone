import React, { FC } from "react";
import "./index.css";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import AccountSummary from "../AccountSummary"
import FastTagDetails from "../FastTagDetails"

interface DashboardProps {}

const Dashboard: FC<DashboardProps> = () => (
  <>

    <NavBar />

    <section>
      
       <div className="dashboard-main">
        
        <SideBar />

        <div className="dashboard-content">
          
          <div className="dashboard-account-summary">
            <h1 className="dashboard-head" data-testid="account"> Account Summary </h1>
            <AccountSummary />
          </div>

          <div className="dashboard-your-fastag">
            <h1 className="dashboard-head" data-testid="fastTag">Your Fastags</h1>
            <FastTagDetails />
          </div>

        </div>

      </div> 
    </section>
  </>
);

export default Dashboard;
