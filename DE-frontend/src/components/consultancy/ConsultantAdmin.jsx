import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../common/AdminHeader";

export default function ConsultantAdmin() {
  const [data, setData] = useState([]);
  const[employee, setEmployee]=useState({});
  // useEffect(() => {
  //   // Get uSer Details
  //   function GetRecord() {
  //     axios
  //       .get(
  //         "http://localhost:5000/consultantAppointment/getpendingappointments"
  //       )
  //       .then((res) => setData(res.data))
  //       .catch((err) => console.log(err));
  //   }
  //   GetRecord();
  //   // Get Location Details
  //   function GetLocation() {
  //     axios
  //       .get(
  //         // ""Location APi Link
  //       )
  //       .then((res) => setData(res.data))
  //       .catch((err) => console.log(err));
  //   }
  //   GetLocation();
  // }, []);
const[availableEmployees, setAvailableEmployees] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/employee/getAvailableConsultancyEmployees")
    .then(res=>setAvailableEmployees(res.data))
    .catch((err)=>console.log(err));
  },[]
)

const availableEmpsElems = availableEmployees.map(emp => {
  return (
    <option value= {emp._id}>{emp.name}</option>
  )
});

useEffect(() => {
  axios.get("http://localhost:5000/consultantAppointment/getpendingappointments")
    .then(res => {
      const initialEmployeeState = res.data.reduce((acc, consul) => {
        acc[consul._id] = consul.assignedEmployee || ''; // Initialize with existing employee name if present
        return acc;
      }, {});
      setEmployee(initialEmployeeState);
      setData(res.data);
    })
    .catch(err => console.log(err));
}, []);

const handleChange = (event, appointment) => {
  const { value } = event.target;
  setEmployee(prevState => ({
    ...prevState,
    [appointment._id]: value,
  }));


  axios.put(`http://localhost:5000/consultantAppointment/updaterespond/${appointment._id}`, {
    jobService: appointment.jobService,
    assignedEmployee: value ,
    respond: appointment.respond,
    status: appointment.status
    })
  .then(() => {
    alert("Employee added");
  })
  .catch((err) => {
    console.log(err); // Log error to console for debugging
    alert("Error occurred while adding employee");
  });

}


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
                              <select onChange={e => handleChange(e, appointment)}>
                                <option value=''> Select Employee</option>
                               {availableEmpsElems}
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
