import React, { Component } from "react";
import ServiceList from "./ServiceList";
import homeimage from "../images/home-image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { withRouter } from "./withRouter";

class Home extends Component {
  render() {
    return (
      <div>
        {/* Hero Section */}
        <section className="hero-section d-flex align-items-center">
          <div className="container-fluid">
            <div className="row align-items-center min-vh-100">
              {/* Left side - Text */}
              <div className="col-12 col-md-4 text-center text-md-start ps-md-5">
                <h1 className="display-4 fw-bold">
                  Full Home/ Move-in Cleaning
                </h1>
                <p className="lead">
                  Experience the best Cleanliness with Our Professional Full
                  House Cleaning Services
                </p>
              </div>

              {/* Right side - Image */}
              <div className="col-12 col-md-8 pe-md-5 text-center">
                <img
                  src={homeimage}
                  alt="Book My Clean"
                  className="img-fluid hero-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Below content (hidden until scroll) */}
        <section className="below-section">
          <ServiceList />
          <br />
          <br />
        </section>

        <footer
          className="container-fluid "
          style={{
            backgroundColor: "#f5f5f5",
            height: "75 vh",
            width: "100%",
          }}
        >
          <div className=" row pt-4 mt-4">
            <div className="col-4  mt-5 text-center">
              <h4>Company</h4>
              <p className="fw-light mt-3">About Us</p>
              <p className="fw-light">Terms & conditions </p>
              <p className="fw-light">Privacy policy </p>
              <p className="fw-light">Careers </p>
            </div>
            <div className="col-4  mt-5 text-center">
              <h4>For Customers</h4>
              <p className="fw-light mt-3">Reviews</p>
              <p className="fw-light">Contact us</p>
            </div>
            <div className="col-4  mt-5 text-center">
              <h4>For Professionals</h4>
              <p
                className="fw-light mt-3"
                style={{ cursor: "pointer" }}
                onClick={() => this.props.navigate("/add-professional")}
              >
                Register as a professional
              </p>
            </div>
          </div>
          <br />
          <br />
          <hr className="ms-4 me-4" />
          <br />
          <p className="fw-light ms-5 mb-0 " style={{ fontSize: "14px" }}>
            * as on Novermber 6,2025
          </p>
          <p className="fw-light ms-5 " style={{ fontSize: "14px" }}>
            © Copyright 2025 BookMyClean All rights reserved.
          </p>
        </footer>
      </div>
    );
  }
}

export default withRouter(Home);
