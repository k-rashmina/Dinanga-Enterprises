import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../common/AdminHeader";

export default function ConsultantAdmin() {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState({});

  const [availableEmployees, setAvailableEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/getAvailableConsultancyEmployees")
      .then((res) => setAvailableEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const availableEmpsElems = availableEmployees.map((emp) => {
  //   return <option value={emp._id}>{emp.name}</option>;
  // });

   

  useEffect(() => {
    axios
      .get("http://localhost:5000/consultantAppointment/getpendingappointments")
      .then((res) => {
        const initialEmployeeState = res.data.reduce((acc, consul) => {
          acc[consul._id] = consul.assignedEmployee ? consul.assignedEmployee._id : ""; // Initialize with existing employee name if present
          console.log('initial', consul)
          return acc;
        }, {});
        console.log('initial', initialEmployeeState)
        setEmployee(initialEmployeeState);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (event, appointment) => {
    const { value } = event.target;
    setEmployee((prevState) => ({
      ...prevState,
      [appointment._id]: value,
    }));

    axios
      .put(
        `http://localhost:5000/consultantAppointment/updaterespond/${appointment._id}`,
        {
          jobService: appointment.jobService,
          assignedEmployee: value,
          respond: appointment.respond,
          status: appointment.status,
        }
      )
      .then(() => {
        alert("Employee added");
      })
      .catch((err) => {
        console.log(err); // Log error to console for debugging
        alert("Error occurred while adding employee");
      });
  };
  console.log(employee)
  return (
    <>
      <AdminHeader pageName={"Consultancy List"} />
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
                  <div id="page" className="col-12 border border-1 border-black rounded rounded-3 ">
                    <div className="row">
                      <div
                        className="col-12"
                        style={{ backgroundColor: "#d9d9d9" }}
                      >
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
                            <span className="fw-bold">Date & Time</span>
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
                        <div  key={appointment._id} className="col-12 p-4">
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
                                  <span>
                                    {appointment.Date.substring(0, 10)}
                                  </span>
                                </div>
                                <div className="col-12 text-center">
                                  <span>{appointment.Time}</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-2 text-center">
                              <span>{appointment.location}</span>
                            </div>
                            <div className="col-2 text-center">
                              <select value={employee[appointment._id] || ""}
                                onChange={(e) => handleChange(e, appointment)}
                              >
                                 <option value=""> Select Employee</option>
                                 {availableEmployees.map((emp) => (
                                   <option value={emp._id}>{emp.name}</option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 text-center mb-3">
                              <span className="fw-bold">Today Total Number of Consultancy Appointments: {data.length}</span>
                          </div>
                          </div>
                          </div>

                      <button
                        onClick={function printInvoice() {
                          var restorepage = document.body.innerHTML;
                          var page = document.getElementById("page").innerHTML;
                          document.body.innerHTML = page;
                          window.print();
                          document.body.innerHTML = restorepage;
                        }}
                      >
                        Print
                      </button>
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
