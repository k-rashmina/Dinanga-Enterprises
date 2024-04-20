import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../common/AdminHeader";

export default function ConsultantAdmin() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Get uSer Details
    function GetRecord() {
      axios
        .get(
          "http://localhost:5000/consultantAppointment/getpendingappointments"
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
    GetRecord();
    // Get Location Details
    function GetLocation() {
      axios
        .get(
          // ""Location APi Link
        )
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
    }
    GetLocation();
  }, []);


  useEffect


  return (
    <>
      <AdminHeader pageName={'Consultancy List'} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div
                className="col-12 "
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "0px",
                }}
              >
                <div className="row ">
                  <div className="col-12 border border-1 border-black rounded rounded-3 ">
                    <div className="row">
                      <div className="col-12" style={{backgroundColor:'#d9d9d9'}}>
                        <div className="row">
                          <div className="col-1 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Appointment Number</span>
                          </div>

                          <div className="col-3 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Customer Email</span>
                          </div>

                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Customer Name</span>
                          </div>

                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Date</span>
                          </div>

                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Location</span>
                          </div>

                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Employee</span>
                          </div>
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
                            <div className="col-2 ">
                              <div className="row">
                                <div className="col-12 text-center">
                                  <span>{appointment.Date.substring(0,10)}</span>
                                </div>
                                <div className="col-12 text-center">
                                  <span>{appointment.Time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-2 text-center">
                              <span>{appointment.location}</span>
                            </div>
                            <div className="col-2 text-center ">
                              <select>
                                <option value="">Amasha Dewduni</option>
                                <option value="">Amasha Dewduni</option>
                                <option value="">Amasha Dewduni</option>
                                <option value="">Amasha Dewduni</option>
                                <option value="">Amasha Dewduni</option>
                                <option value="">Amasha Dewduni</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* <div className="col-12 p-4">
                        <div className="row">
                          <div className="col-1 text-center">
                            <span>1</span>
                          </div>
                          <div className="col-3 text-center">
                            <span>Amasha@gmail.com</span>
                          </div>
                          <div className="col-2  text-center">
                            <span>Amasha Hewagama</span>
                          </div>
                          <div className="col-2 ">
                            <div className="row">
                              <div className="col-12 text-center">
                                <span>0/4/05/2023</span>
                              </div>
                              <div className="col-12 text-center">
                                <span>11:30:30</span>
                              </div>
                            </div>
                          </div>
                          <div className="col-2 text-center">
                            <span>Galle</span>
                          </div>
                          <div className="col-2 text-center ">
                            <select>
                              <option value="">Amasha Dewduni</option>
                              <option value="">Amasha Dewduni</option>
                              <option value="">Amasha Dewduni</option>
                              <option value="">Amasha Dewduni</option>
                              <option value="">Amasha Dewduni</option>
                              <option value="">Amasha Dewduni</option>
                            </select>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
