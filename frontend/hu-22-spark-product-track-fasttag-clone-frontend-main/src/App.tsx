import React from 'react';
import SignIn from "./container/Signin"
import Signup from "./container/Signup"
import Dashboard from "./container/Dashboard"
import RecentTransaction from './container/RecentTransaction';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

import Home from './container/Home';
import AllTollStations from './container/AllTollStations';
import RechargeCard from './container/RechargeCard';
import TollStationDetail from './container/TollStationDetail';
import PurchaseCard from './container/OrderCard';
import AddTollPrice from './container/TollPrice';
import AddTollStation from './container/TollStation';
import PrivateRoute from './components/PrivateRoute';
import UpdateTollPrice from './container/UpdateTollPrice';
import EditProfile from './container/EditProfile';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/add-toll-station" component={AddTollStation}/>
            <PrivateRoute path="/add-toll-price/:tollStationId" component={AddTollPrice}/>
            <PrivateRoute path="/update-toll-price/:tollStationId" component={UpdateTollPrice}></PrivateRoute>
            <Route path="/home" component={Home}></Route>
            <PrivateRoute path="/order-card" component={PurchaseCard}/>
            <PrivateRoute path="/recharge-card/:cardId" component={RechargeCard}/>
            <PrivateRoute path="/toll-station-detail/:tollStationId" component={TollStationDetail}/>
            <PrivateRoute path="/all-toll-station" component={AllTollStations}></PrivateRoute>
            <PrivateRoute path="/recent-transactions" component={RecentTransaction}></PrivateRoute>
            <PrivateRoute path="/editprofile" component={EditProfile}></PrivateRoute>

          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;
