import React from "react";
import { Link } from "react-router-dom";


export default function ConsultancyHome() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-12 "
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"whitesmoke"
          }}
        >
          <div className="row ">
            <div className="col-10 offset-1" style={{boxShadow:"10px 10px 20px black", backgroundColor:"white"}}>
              <div className="row">
                <div className="col-12 d-flex justify-content-center mt-5">
                  <h1>Welcome to the Concultancy Service</h1>
                </div>
                <div className="col-12 mt-5">
                  <div className="row d-flex justify-content-center">
                    <div className="col-8 ">
                      <p className="fs-5 fw-bold text-black-50">
                        An innovative online hybrid vehicle spare parts
                        consultancy system designed to give advanced algorithms
                        and expert guidance, it offers real-time availability
                        updates, and the service is Free of Charge .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center mt-5 mb-5">
                <Link to="/consultancy">
                  <button className="fs-1 btn btn-outline-info">
                    Request Consultancy Service
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
