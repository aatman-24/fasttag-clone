import React, { FC } from "react";
import "./index.css";
import fastTagLogo from "../../static/fasttag1.png";
import fastTagBackgroundImg from "../../static/home-fasttag.png";
import SmsAlert from "../../static/sms_alert.png";
import CashInHand from "../../static/cashInHand.png";
import onlineReacharge from "../../static/online_recharge.png";
import serachBrowser from "../../static/search_browser.png";
import RechargeOptions from "../../static/recharge-options.png";
import INR from "../../static/inr.png";
import pricing from "../../static/pricing.png";
import LocationImg from "../../static/location.png";
import mailImg from "../../static/mail.png";
import callImg from "../../static/call.png";
import twitterImg from "../../static/twitter.png"
import facebookImg from "../../static/facebook.png"
import instagramImg from "../../static/instagram.png"
import youtubeImg from "../../static/youtube.png"

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  return (
    <div className="home-screen">
      <div className="home-navBar">
        <div className="home-navbar-left">
          <img className="home-navBar-logo-image" src={fastTagLogo}></img>
        </div>

        <div className="home-navbar-right">
          <div>
            <a href="/">
              <h2 className="home-nav-items-heading">Home</h2>
            </a>
          </div>

          <div>
            <a href="#benefits">
              <h2 className="home-nav-items-heading">Benefits</h2>
            </a>
          </div>

          <div>
            <a href="#features">
              <h2 className="home-nav-items-heading">Features</h2>
            </a>
          </div>

          <div>
            <a href="#pricing">
              <h2 className="home-nav-items-heading">Pricing</h2>
            </a>
          </div>

          <div>
            <a href="#contact">
              <h2 className="home-nav-items-heading">Contact Us</h2>
            </a>
          </div>

          <div>
            <a href="/signin">
              <h2 className="home-nav-items-heading">Login</h2>
            </a>
          </div>
        </div>
      </div>

      <section className="home-main-section">
        <div className="home-fastTag-image-div">
          <img className="home-fastTag-image" src={fastTagBackgroundImg}></img>
        </div>

        <div className="home-benefits-div" id="benefits">
          <h1 className="home-benefits-main-heading">BENEFITS</h1>

          <div className="home-benefits-para-container">
            <p className="home-benefits-para">
              NHAI FASTag is a perfect solution for a hassle-free trip on
              national highways, it enables automatic deduction of toll charges
              and lets <br />
              you pass through the toll plaza without stopping for the cash
              transaction.
            </p>
          </div>

          <div className="home-benefits-container">
            <div className="home-benefits-subdiv">
              <img
                className="home-benefits-tag-image"
                src={RechargeOptions}
              ></img>

              <p className="home-benefits-heading benefits-heading">Wider Recharge Option</p>

              <p className="home-benefits-subdiv-para">
                NHAI Prepaid wallet offers variety of options to recharge, you
                can use your debit card, credit card, Net Banking and UPI to
                recharge your FASTag
              </p>
            </div>

            <div className="home-benefits-subdiv">
              <img className="home-benefits-tag-image" src={INR}></img>

              <p className="home-benefits-heading benefits-heading">Flexible Recharge Option</p>

              <p className="home-benefits-subdiv-para">
                Choose your recharge amount as per your own convenience and need
              </p>
            </div>
          </div>
        </div>

        <div className="home-benefits-div" id="features">
          <h1 className="home-benefits-main-heading ">FEATURES</h1>

          <div className="features-container">
            <div className="features-container-item-1">
              <div className="home-benefits-subdiv">
                <img className="home-benefits-tag-image" src={SmsAlert}></img>
                <p className="home-benefits-heading features-heading">
                  SMS Alerts For Transactions
                </p>

                <p className="home-benefits-subdiv-para">
                  Customer will receive SMS alerts on his registered mobile
                  numbers for all the transactions done in his tag account.
                </p>
              </div>

              <div className="home-benefits-subdiv">
                <img className="home-benefits-tag-image" src={CashInHand}></img>
                <p className="home-benefits-heading features-heading">No Need to Carry Cash</p>

                <p className="home-benefits-subdiv-para">
                  Customer don't need to worry about carrying cash for <br />
                  the toll payments.
                </p>
              </div>
            </div>

            <div className="features-container-item-2">
              <div className="home-benefits-subdiv">
                <img
                  className="home-benefits-tag-image"
                  src={onlineReacharge}
                ></img>
                <p className="home-benefits-heading features-heading">Online Recharge</p>

                <p className="home-benefits-subdiv-para">
                  Customer may recharge his tag account online through Debit{" "}
                  <br />
                  Card or Net Banking
                </p>
              </div>

              <div className="home-benefits-subdiv">
                <img
                  className="home-benefits-tag-image"
                  src={serachBrowser}
                ></img>
                <p className="home-benefits-heading features-heading">
                  Web Portal for Customers
                </p>

                <p className="home-benefits-subdiv-para">
                  Customers can access their statements by logging on the FASTag{" "}
                  <br />
                  customer portal.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home-benefits-div" id="pricing">
          <h1 className="home-benefits-main-heading">PRICING</h1>

          <div className="home-pricing-para-container">
            <p className="home-pricing-para">
              Charges applicable on FASTag Tag Joining Fee - 100 including all
              applicable taxes. *Taxes are different as per location of Toll
              Station.
            </p>

            <img className="pricing-image" src={pricing}></img>
          </div>
        </div>

        <div className="home-footer-div">
          <div className="footer-container">
            <div className="footer-card" id="contact">
              <h1 className="home-footer-div-main-heading">CONTACT US</h1>

              <div className="location-container">
                <img className="location-image" src={LocationImg}></img>

                <h4 className="location-para">
                  XYZ Building 3rd Floor, Sector-25 Noida Uttar-Pradesh, 201031,
                  India
                </h4>
              </div>

              <div className="mail-container">
                <img className="mail-image" src={mailImg}></img>

                <h4 className="mail-para">fastTag.info@ihmcl.com</h4>
              </div>

              <div className="telephone-container">
                <img className="telephone-image" src={callImg}></img>
                <h4 className="telephone-para">011-89010118</h4>
              </div>
            </div>

            <div className="footer-card">
              <h1 className="home-footer-div-main-heading">
                SCHEDULE A CALLBACK
              </h1>

              <div className="home-footer-callbackform">
                
                <div className="name-input-container">
                  <input className="name-input" placeholder="Name"></input>
                </div>

                <div className="email-input-container">
                  <input className="email-input" placeholder="Email"></input>
                </div>

                <div className="mobile-input-container">
                  <input
                    className="mobile-input"
                    placeholder="Mobile No"
                  ></input>
                </div>

                <div className="button-container">
                  <button className="send-button">Send</button>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="logos-div">
          
          <div className="logos-container">
            <a href="https://twitter.com">
              <img className="twitter-image" src={twitterImg}></img>
            </a>
            <a href="https://facebook.com">
              <img className="facebook-image" src={facebookImg}></img>
            </a>
            <a href="https://instagram.com">
              <img
                className="instagram-image"
                src={instagramImg}
              ></img>
            </a>
            <a href="https://youtube.com">
              <img className="youtube-image" src={youtubeImg}></img>
            </a>
            <p className="copyright-para">
              © CopyRights 2015-2022 All Rights are Reserved
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
