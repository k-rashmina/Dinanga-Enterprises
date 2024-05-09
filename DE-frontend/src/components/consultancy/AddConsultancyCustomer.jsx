import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddConsultancyCustomer() {
  const { id } = useParams(); // Extract userId from URL

  const [user, setUser] = React.useState(null); // State to hold user data

  const hasPageLoaded = useRef(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch user details when component mounts or userId changes
    function fetchUserDetails() {
      axios
        .get(
          `http://localhost:5000/consultantAppointment/getappointmentdetails/${id}`
        ) // Assuming your backend API endpoint is '/user/:userId'
        .then((res) => {
          hasPageLoaded.current = true;
          setUser(res.data); // Set user data in state
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }

    fetchUserDetails();
  }, [id]); // useEffect dependency array, re-runs effect when userId changes

  // Function to format date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Default values for date and time
  const defaultDate = user ? formatDate(user.Date) : "";

  

  return (
    <div className="container-fluid" style={{ backgroundColor: "#F0F0F0" }}>
      <div className="row">
        <div className="col-12 text-center mt-3">
          <h1>Consultancy Service</h1>
        </div>

        <div className="col-4 mt-3 border-2  border-top border-end border-info">
          <div className="row">
            <div className="col-12 text-center">
              <span className="fs-3 fw-bold">Assigned Employee</span>
            </div>

            <div className="col-12 text-center">
              <span className="fs-4 ">Full Name : </span>
              <span className="fs-4 ">{hasPageLoaded.current && (user.assignedEmployee ? user.assignedEmployee.name : '')}</span>
            </div>

            <div className="col-12 mb-5 text-center">
              <span className="fs-4 ">Phone Number : </span>
              <span className="fs-4 ">{hasPageLoaded.current && (user.assignedEmployee ? user.assignedEmployee.contactNumber : '')}</span>
            </div>

            <div className="col-12 text-center">
              <span className="fs-2 fw-bold">Current Status</span>
            </div>

            <div className="col-12 text-center mb-5">
              <span className="fs-4 ">{user && user.status}</span>
            </div>

            <div className="col-12 text-center">
              <span className="fs-3 fw-bold">Assigned Job Services</span>
            </div>

            <div className="col-12 mb-4 text-center">
              <span className="fs-5 fw-bold">{user && user.jobService}</span>
            </div>
          </div>
        </div>

        <div className="col-8 mt-3 border border-2 border-top border-info">
          <div className="row">
            <div className="col-12 mt-2  text-center">
              <span className="fw-bold fs-3">Appoinment Details</span>
            </div>

            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-4 text-center">
                  <span className="fs-5 ">Location :</span>
                </div>
                <div className="col-8 d-grid">
                  <select className="fs-5 "
                    id="location"
                    style={{ border: " 0px solid transparent" }}
                  >
                    <option value={user && user.location}>
                      {user && user.location}
                    </option>
                    <option value="Panadura">Panadura</option>
                        <option value="Kurunagala">Kurunagala</option>
                        <option value="Nittabuwa">Nittabuwa</option>
                        <option value="Moratuwa">Moratuwa</option>
                        <option value="Ampara">Ampara</option>
                        <option value="Cillaw">Cillaw</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        <option value="Galle">Galle</option>
                        <option value="Rathnapura">Rathnapura</option>
                        <option value="Mathara">Mathara</option>
                        <option value="Badulla">Badulla</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-4 text-center">
                  <span className="fs-5 ">Date : </span>
                </div>
                <div className="col-8 d-grid">
                  <div className="row">
                    <div className="col-12">
                      <span className="fs-5 " id="OLDDate">{defaultDate}</span>
                    </div>
                    <div className="col-6 offset-1 bg-white">
                      <div className="row">
                        <div className="col-5 ">
                          <span >Update Date</span>
                        </div>
                        <div className="col-6">
                          <input className="fs-5 "
                            type="date"
                            id="newDate"
                            style={{ border: "0px solid transparent" }}
                            onChange={function () {
                              // Validate the Date
                              const today = new Date();
                              const formattedDate =
                                today.toLocaleDateString("en-US"); // US English format
                              var todayDate = formattedDate.split("/");
                              var todaySplitMonth = todayDate[0];
                              var todaySplitDate = todayDate[1];
                              var todaySplitYear = todayDate[2];

                              var ChooseDate =
                                document.getElementById("newDate").value;
                              var SplitChooseDateArray = ChooseDate.split("-");
                              var Chooseyear = SplitChooseDateArray[0];
                              var ChooseMonth = SplitChooseDateArray[1];
                              var ChooseDate = SplitChooseDateArray[2];
                              // calculation
                              var YearAnswer = Chooseyear - todaySplitYear;
                              var MonthAnsewer = ChooseMonth - todaySplitMonth;
                              var DateAnswer = ChooseDate - todaySplitDate;

                              // check
                              if (YearAnswer < 0) {
                                document.getElementById("DateError").innerText =
                                  "Please Select Valid Year";
                              } else if (MonthAnsewer < 0) {
                                document.getElementById("DateError").innerText =
                                  "Please Select Valid Month";
                              } else if (MonthAnsewer < !0 && DateAnswer < 0) {
                                document.getElementById("DateError").innerText =
                                  "Please Select Valid Date";
                              } else {
                                document.getElementById("DateError").innerText =
                                  "";
                                var newDate =
                                  document.getElementById("newDate").value;
                                document.getElementById("OLDDate").innerText =
                                  newDate;
                              }
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-center">
                      <span className="text-danger" id="DateError"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-4 text-center">
                  <span className="fs-5 ">Time : </span>
                </div>
                <div className="col-8 d-grid">
                  <div className="row">
                    <div className="col-12">
                      <span className="fs-5 " id="OldTIme">{user && user.Time}</span>
                    </div>
                    <div className="col-6 offset-1 bg-white">
                      <div className="row">
                        <div className="col-5">
                          <span>Update Time</span>
                        </div>
                        <div className="col-6">
                          <input className="fs-5 "
                            type="Time"
                            id="newTime"
                            style={{ border: "0px solid transparent" }}
                            onChange={function () {
                              var newTime =
                                document.getElementById("newTime").value;
                              document.getElementById("OldTIme").innerText =
                                newTime;
                            }}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-4 text-center">
                  <span className="fs-5 ">Issue : </span>
                </div>
                <div className="col-8 d-grid">
                  <div className="row">
                    <div className="col-12">
                      <span id="OldIssue" className="fs-5 fw-bold">
                        {user && user.Issue}
                      </span>
                    </div>
                  </div>
                  <textarea
                    className=""
                    id="Newissue"
                    cols="30"
                    rows="5"
                    style={{ border: "0px solid transparent" }}
                    placeholder="Please if You want to update Issue? type your Issue in here"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="row">
                <div className="col-4 text-center">
                  <span>Response : </span>
                </div>
                <div className="col-8 d-grid">
                <div className="row">
                    <div className="col-12">
                      <span id="respond" className="fw-bold">
                        {user && user.respond}
                      </span>
                    </div>
                  </div>
                  <textarea
                    className="fw-bold"
                    id=""
                    cols="30"
                    rows="5"
                    style={{ border: "0px solid transparent" }}
                    readOnly
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="col-12 mt-4 d-flex justify-content-center ">
              <div className="row">
                <div className="col-6 d-flex justify-content-center align-items-center">
                  <button
                    style={{
                      background: "#00ADB5",
                      borderRadius: "50px",
                      border: "0px white solid",
                      fontSize: "20px",
                      padding: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      marginBottom: "20px",
                    }}
                    onClick={function () {
                      var location = document.getElementById("location").value;
                      var date = document.getElementById("OLDDate").innerText;
                      var time = document.getElementById("OldTIme").innerText;

                      var newIssue = document.getElementById("Newissue").value;
                      var OldIssue;

                      if (newIssue == "") {
                        OldIssue =
                          document.getElementById("OldIssue").innerText;
                      } else {
                        OldIssue = newIssue;
                      }

                         // Json Encoding
                      var JDirect = {
                        location: location,
                        Date: date,
                        Time: time,
                        Issue: OldIssue,
                      };

                      axios.put(
                        `http://localhost:5000/consultantAppointment/updateappointment/${id}`,
                        JDirect
                      );
                      alert("appoinment update successfully");
                      // navigate(`/consultancy/customer/${id}`)
                      window.location
                        .reload()

                        .then((res) =>
                          console.log("Worked: " + JSON.stringify(res))
                        )
                        .catch((err) =>
                          console.log("Failed: " + JSON.stringify(err))
                        );
                    }}
                  >
                    Update
                  </button>
                </div>

                <div className="col-6 d-flex justify-content-center align-items-center">
                  <button
                    style={{
                      background: "#00ADB5",
                      borderRadius: "50px",
                      border: "0px white solid",
                      fontSize: "20px",
                      padding: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      marginBottom: "20px",
                    }}
                    onClick={function () {
                      axios.delete(
                        `http://localhost:5000/consultantAppointment/deleteappointment/${id}`
                      )
                        .then((res) =>
                          console.log("Worked: " + JSON.stringify(res)),
                          alert("appoinment delete successfully"),
                          window.location = "/consultancy/:consid"
    
                        )
                        .catch((err) =>
                          console.log("Failed: " + JSON.stringify(err))
                        );
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
