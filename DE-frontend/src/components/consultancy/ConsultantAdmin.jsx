import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../common/AdminHeader";
import SupLogo from "../../assets/DELogo.png";

export default function ConsultantAdmin() {
  const [data, setData] = useState([]);
  const [employee, setEmployee] = useState({});
  const hasPageLoaded = useRef(false);

  const [availableEmployees, setAvailableEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/getAvailableConsultancyEmployees")
      .then((res) => setAvailableEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  

  useEffect(() => {
    axios
      .get("http://localhost:5000/consultantAppointment/getpendingappointments")
      .then((res) => {
        const initialEmployeeState = res.data.reduce((acc, consul) => {
          acc[consul._id] = consul.assignedEmployee
            ? consul.assignedEmployee._id
            : ""; // Initialize with existing employee name if present
          console.log("initial", consul);
          hasPageLoaded.current = true;
          return acc;
        }, {});
        console.log("initial", initialEmployeeState);
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
  console.log(employee);

  const handleDownloadPDF = () => {
    // Call the function to print the interface as a PDF
    printPDF();
  };

  // Function to print the interface as a PDF
  const printPDF = () => {
    const htmlContent = generateHTMLForPDF();
    const windowContent = "" + htmlContent + "</body></html>";
    const printWin = window.open("", "", "width=1024,height=768");
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.print();
  };

  const generateHTMLForPDF = () => {
    let html =
    `<div style="text-align: center; font-size: 40px; font-family: Calibri; margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
      <img src="${SupLogo}" alt="Company logo" style="height: 120px; width: 120px;">
      <b>Dinanga Enterprises</b>
    </div>
    <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
      <b>Address: 68 Paraththa Rd, Panadura 12500</b>
    </div>
    <div style="text-align: center; font-size: 14px; font-family: Calibri; margin-bottom: 10px;">
      <b>Telephone: +94 71 126 1449</b>
    </div
     <hr/>`;

    html += `<h1 style="text-align: center; font-size: 24px;">Consultant Appointment History</h1>
        <table border="1" style="width: 80%; margin: 0 auto; text-align: center;">
          <tr>
            <th>Appointment Number</th>
            <th>Customer Email</th>
            <th style="width: 20%;">Date & Time</th>
            <th>Location</th>
            <th>Employee</th>
          </tr>`;

    html += data
      .map(
        (appointment) =>
          `<tr key=${appointment._id}>
        <td>${appointment.consultantNumber}</td>
        <td>${appointment.Email}</td>
        <td style="width: 20%;">${appointment.Date.substring(0, 10)}  ${
            appointment.Time
          }</td>
        <td>${appointment.location}</td>
        <td>${
          hasPageLoaded.current &&
          (appointment.assignedEmployee
            ? appointment.assignedEmployee.name
            : "Not Assigned")
        }</td>
      </tr>`
      )
      .join("");

    html += "</table>";

    html +=
      '<div style="text-align: center; font-size: 16px; font-weight: bold; margin-top: 20px;">' +
      "  Today Total Number of Consultancy Appointments: " +
      data.length +
      "</div>";

    return html;
  };

  return (
    <>
      <div className="col-12">
        <AdminHeader pageName={"Consultancy List"} />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="row">
              <div
                className="col-12 "
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  height: "160vh",
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                  marginTop: "0px",
                }}
              >
                <div className="row ">
                  <div className="col-12 border border-1 border-black rounded rounded-3 ">
                    <div className="row">
                      <div
                        className="col-12"
                        style={{ backgroundColor: "#d9d9d9" }}
                      >
                        <div className="row">
                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Appointment Number</span>
                          </div>

                          <div className="col-3 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Customer Email</span>
                          </div>

                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Date & Time</span>
                          </div>

                          <div className="col-2 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Location</span>
                          </div>

                          <div className="col-3 text-center border border-bottom border-0 border-dark">
                            <span className="fw-bold">Employee</span>
                          </div>
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
                            <div className="col-3 text-center">
                              <select
                                value={employee[appointment._id] || ""}
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

                   
                    </div>
                    <div className="col-12">
                        <div className="row">
                          <div className="col-12 text-center mb-3">
                            <span className="fw-bold">
                              Today Total Number of Consultancy Appointments:{" "}
                              {data.length}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                       style={{
                        width: "400px",
                        margin: "0 auto",
                        display: "block",
                        marginTop: "20px"
                      }}
                       onClick={handleDownloadPDF}>Print</button>
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
