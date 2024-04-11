import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ConsultancyTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    function GetRecord() {
      axios
        .get(
          "http://localhost:5000/consultantAppointment/getpendingappointments"
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
    GetRecord();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-10 offset-1">
          <div className="row">
            <div
              className="col-12 "
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <div className="row">
                <div className="col-12 border border-1 border-black rounded rounded-3 mt-5">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-1 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Appointment Number</span>
                        </div>

                        <div className="col-3 text-center center border border-bottom border-0 border-dark">
                          <span className="fw-bold"> Customer Email</span>
                        </div>

                        <div className="col-2 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Customer Name</span>
                        </div>

                        <div className="col-1 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Date</span>
                        </div>

                        <div className="col-2 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Location</span>
                        </div>

                        <div className="col-1 text-center border border-bottom border-0 border-dark">
                          <span className="fw-bold">Employee</span>
                        </div>
                        <div className="col-2 text-center border border-bottom border-0 border-dark"></div>
                      </div>
                    </div>

                    {data.map((appointment) => (
                      <div key={appointment._id} className="col-12 p-4">
                        <div className="row">
                          <div className="col-1 text-center">
                            <span>{appointment.consultantNumber}</span>
                          </div>
                          <div className="col-3 text-center">
                            <span>{appointment.Email}</span>
                          </div>
                          <div className="col-2  text-center">
                            <span>Amasha Hewagama</span>
                          </div>
                          <div className="col-1 ">
                            <div className="row">
                              <div className="col-12 text-center">
                                <span>{appointment.Date}</span>
                              </div>
                              <div className="col-12 text-center">
                                <span>{appointment.Time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 text-center">
                            <span>{appointment.location}</span>
                          </div>
                          <div className="col-1 text-center ">
                            <span>{appointment.assignedEmployee}</span>
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
