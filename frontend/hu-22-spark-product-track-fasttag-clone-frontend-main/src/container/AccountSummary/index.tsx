import React, { FC, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { getUser } from "../../api.service";
import { IUser } from "../../model";
import { useHistory } from "react-router-dom";

interface AccountSummaryProps {}

const AccountSummary: FC<AccountSummaryProps> = () => {
  const history = useHistory();

  const defaultValue: IUser = {
    firstName:"",
    lastName:"",
    email:"",
    mobileNumber:"",

  };

  let [user, setUser] = useState(defaultValue);

  const onClick = () => {
    history.push("/order-card");
  };

  const onEdit=()=>{
    history.push('/editprofile')
  }

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        alert(err.message);
        history.push("/signin");
      });
  }, []);

  return (
    <>
      <div className="account-main">
        <div className="account-profile-details">
          <div className="card account-card">
            <div className="card-body">
              <div className="card-field-wrap">
                <div className="fieldcontrol">
                  <p className="account-fieldcontrol-name"
                  data-testid="name">Name</p>
                  <div>
                    <p className="account-name-value account-name-field"
                    data-testid="nameval">
                      {user.firstName + " " + user.lastName}
                    </p>
                  <button className="account-edit-profile" onClick={onEdit}>Edit Profile</button>                    
                  </div>

                </div>

                        <div className="fieldcontrol">
                            <p className="account-fieldcontrol-name"
                            data-testid="email">
                                Email Address
                            </p>
                            <p className="account-name-value"
                            data-testid="emailval">
                                {user.email}
                            </p>
                        </div>
                <div className="fieldcontrol">
                  <p className="account-fieldcontrol-name" data-testid="number">Mobile Number</p>
                  <p className="account-name-value" data-testid="numberval">{user.mobileNumber}</p>
                </div>

                
              </div>
            </div>
          </div>
        </div>

        <div className="account-fasttag-info">
          <div className="card account-card">
            <div className="card-body">
              <div className="account-fasttag-info-fieldcontrol">
                <p className="account-fieldcontrol-name account-fasttag-info-header"
                data-testid="fastTag">
                  Fastags
                </p>
                <p className="account-name-value account-fasttag-info-value">
                  {user.vehicles === undefined ? 0 : user.vehicles.length}
                </p>
              </div>

              <div className="account-fasttag-info-fieldcontrol">
                <p className="account-fieldcontrol-name account-fasttag-info-header"
                data-testid="vehicle">Vehicles</p>
                <p className="account-name-value account-fasttag-info-value">
                  {user.vehicles === undefined ? 0 : user.vehicles.length}
                </p>
              </div>

              <div className="account-fasttag-info-fieldcontrol">

                <button
                      className="btn-secondary account-order-fasttag "
                      onClick={onClick}
                      data-testid="order"
                    >
                      Order FastTag
                </button>
              </div>




              {/* <div className="fieldcontrol">
                            <p className="account-fieldcontrol-name">
                                Current Wallet Balance
                            </p>
                            <p className="account-name-value">
                                2000
                            </p>
                        </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSummary;