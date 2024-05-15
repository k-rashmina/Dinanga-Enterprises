import React from "react";
import { Link } from "react-router-dom";
import gifImage from "../../assets/giphy.gif";

export default function ConsultancyHome() {
  return (
    <div className="container-fluid" sty>
      <div className="row">
        <div
          className="col-12 "
          
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${gifImage})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "100%",
            fillOpacity: "10p",
          }}
        >
          
          <div className="row ">
            <div
              className="col-10 offset-0"
              style={{
                boxShadow: "10px 10px 20px black",
                backgroundColor: "transparent",
                backdropFilter:`blur(14px)`,
              }}
            >
              <div className="row">
                <div className="col-12 text-white d-flex justify-content-center mt-5">
                  <h1>Welcome to the Concultancy Service</h1>
                </div>
                <div className="col-12 mt-5">
                  <div className="row d-flex justify-content-center">
                    <div className="col-8 ">
                      <p className="fs-5 fw-bold text-white">
                        An innovative online hybrid vehicle spare parts
                        consultancy system designed to give advanced algorithms
                        and expert guidance, it offers real-time availability
                        updates, and the service is Free of Charge .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 mb-5">
                  <Link to={localStorage.getItem('loggedUser') ? "/consultancy" : "/cuslogin"}>
                    <button className="fs-1 btn btn-dark">
                      Request Consultancy Service
                    </button>
                  </Link>
                </div>

                <div className="col-12 d-flex justify-content-center mt-1 mb-3">
                  <Link to={localStorage.getItem('loggedUser') ? `/consultancyhistory` : `/cuslogin`}>
                    <button className="fs-1 btn btn-dark">
                      View Consultancy History
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
