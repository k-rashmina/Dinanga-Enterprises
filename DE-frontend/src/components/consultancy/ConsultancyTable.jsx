import { useRef } from "react";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ConsultancyTable() {
  const [data, setData] = useState([]);

  const hasPageLoaded = useRef(false);
  
  useEffect(() => {
    function GetRecord() {
      axios
        .get(
          "http://localhost:5000/consultantAppointment/getpendingappointments"
        )
        .then((res) => {
          hasPageLoaded.current = true;
          setData(res.data)})
        .catch((err) => console.log(err));
    }
    GetRecord();
  }, []);
  return (
    <div className="container-fluid">
      <h1 class="text-black text-center mt-0">
               Consultancy Service History
         </h1>
      <div className="row">
        <div className="col-10 offset-1">
        <div className="row mt-0">
         
            <div
              className="col-12 "
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "150vh",
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              
              <div className="row ">
                <div className="col-12 border border-1 border-black rounded rounded-3 mt-0">
                  <div className="row">
                    <div className="col-12" style={{backgroundColor:'#d9d9d9'}}>
                      <div className="row">
                        <div className="col-2 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Appointment Number</span>
                        </div>

                        <div className="col-3 text-center center border border-bottom border-0 border-dark">
                          <span className="fw-bold"> Customer Email</span>
                        </div>

                

                        <div className="col-2 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Date & TIme</span>
                        </div>

                        <div className="col-1 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Location</span>
                        </div>

                        <div className="col-2 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Employee</span>
                        </div>
                        <div className="col-2 text-center border border-bottom border-0 border-dark"></div>
                      </div>
                    </div>

                    {data.map((appointment) => (
                      <div key={appointment._id} className="col-12 p-4">
                        <div className="row">
                          <div className="col-2 text-center">
                            <span>{appointment.consultantNumber}</span>
                          </div>
                          <div className="col-3 text-center">
                            <span>{appointment.Email}</span>
                          </div>
                          
                          <div className="col-2 ">
                            <div className="row">
                              <div className="col-12 text-center">
                                <small>{appointment.Date.substring(0,10)}</small>
                              </div>
                              <div className="col-12 text-center">
                                <span>{appointment.Time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-1 text-center">
                            <span>{appointment.location}</span>
                          </div>
                          <div className="col-2 text-center ">
                            <span>{hasPageLoaded.current && (appointment.assignedEmployee && appointment.assignedEmployee.name)}</span>
                          </div>
                          <div className="col-2 text-center ">
                            <Link to={`/consultancy/customer/${appointment._id}`}>
                              <button className="btn btn-outline-info rounded rounded-5">
                                view
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
