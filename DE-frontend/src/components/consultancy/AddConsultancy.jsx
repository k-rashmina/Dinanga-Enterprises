import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown.js";
import axios from "axios";

export default function AddConsultancy() {
  return (
    <div className="pt-5" style={{ backgroundColor: "#F0F0F0" }}>
      <h1 class="text-black text-center mt-0">
        Consultancy Service Appointment
      </h1>
      <div>
        <div className="container-fluid">
          <div className="row ">
            <div className="col-10 offset-1 border border-3 border-info mt-3">
              <div className="row">
                <div className="col-8 offset-2 mt-5 ">
                  <div className="row">
                    {/* Email Input */}
                    <div className="col-2">
                      <span class="fw-bold fs-5 text-black">Email</span>
                    </div>
                    <div className="col-8 d-grid">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onBlur={function () {
                          var EmailTempry =
                            document.getElementById("email").value;

                          var emailRegexTempory = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          var regexEmailTempry = emailRegexTempory.test(EmailTempry);

                          if (EmailTempry == "") {
                            document.getElementById("EmailError").innerHTML =
                              "Please Enter Your Email Address";
                          } else if (EmailTempry != "") {
                            document.getElementById("EmailError").innerHTML =
                              "";
                            if (!regexEmailTempry) {
                              document.getElementById("EmailError").innerHTML =
                                "Please Enter Valid Email";
                            }
                          }
                        }}
                      />
                      <span id="EmailError" class="text-danger"></span>
                    </div>
                  </div>
                </div>
                <div className="col-8 offset-2 mt-4">
                  <div className="row">
                    {/* Location */}
                    <div className="col-2">
                      <span class="fw-bold fs-5 text-black">Location</span>
                    </div>
                    <div className="col-8 d-grid ">
                      <select name="location" id="location">
                        <option value="">Select Location</option>
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
                      <span id="LocationError" class="text-danger"></span>
                    </div>
                  </div>
                </div>

                <div className="col-8 offset-2 mt-4">
                  <div className="row">
                    {/* Date */}
                    <div className="col-2">
                      <span class="fw-bold fs-5 text-black">Date</span>
                    </div>
                    <div className="col-8 d-grid ">
                      <input
                        type="Date"
                        id="date"
                        name="Date"
                        onChange={() => {
                          const today = new Date();
                          const formattedDate =
                            today.toLocaleDateString("en-US"); // US English format
                          var todayDate = formattedDate.split("/");
                          var todaySplitMonth = todayDate[0];
                          var todaySplitDate = todayDate[1];
                          var todaySplitYear = todayDate[2];

                          var ChooseDate =
                            document.getElementById("date").value;
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
                            document.getElementById("DateError").innerText = "";
                          }
                        }}
                      />
                      <span id="DateError" class="text-danger"></span>
                    </div>
                  </div>
                </div>
                {/* TIme */}
                <div className="col-8 offset-2 mt-4">
                  <div className="row">
                    <div className="col-2">
                      <span class="fw-bold fs-5 text-black">Time</span>
                    </div>
                    <div className="col-8 d-grid ">
                      <input type="time" id="time" name="time" />
                      <span id="timeError" class="text-danger"></span>
                    </div>
                  </div>
                </div>
                {/* Issue */}
                <div className="col-8 offset-2 mt-4">
                  <div className="row">
                    <div className="col-2">
                      <span class="fw-bold fs-5 text-black">Issue</span>
                    </div>
                    <div className="col-8 d-grid ">
                      <textarea
                        name="issue"
                        id="issue"
                        cols="30"
                        rows="5"
                        onBlur={function () {
                          var IssueTempory =
                            document.getElementById("issue").value;

                          if (IssueTempory == "") {
                            document.getElementById("IssueError").innerText =
                              "Please Type Your Issue";
                          }
                        }}
                      ></textarea>
                      <span id="IssueError" class="text-danger"></span>
                    </div>
                  </div>
                </div>
                {/* Button */}
                <div className="col-6 offset-3 mt-4 ">
                  <div className="row d-flex justify-content-center">
                    <div className="col-3 mb-5">
                      <button
                        type="submit"
                        onClick={() => {
                          var email = document.getElementById("email").value;
                          var location =
                            document.getElementById("location").value;
                          var date = document.getElementById("date").value;
                          var time = document.getElementById("time").value;
                          var issue = document.getElementById("issue").value;

                          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                          var regexEmail = emailRegex.test(email);

                          if (email == "") {
                            // email
                            document.getElementById("EmailError").innerText =
                              "Please enter a Email address";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "";
                            // date
                            document.getElementById("DateError").innerText = "";
                            // time
                            document.getElementById("timeError").innerText = "";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "";
                          } else if (!regexEmail) {
                            // email
                            document.getElementById("EmailError").innerText =
                              "Please enter a valid Email address";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "";
                            // date
                            document.getElementById("DateError").innerText = "";
                            // time
                            document.getElementById("timeError").innerText = "";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "";
                          } else if (location == "") {
                            // email
                            document.getElementById("EmailError").innerText =
                              "";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "Please Select a Location ";
                            // date
                            document.getElementById("DateError").innerText = "";
                            // time
                            document.getElementById("timeError").innerText = "";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "";
                          } else if (date == "") {
                            // email
                            document.getElementById("EmailError").innerText =
                              "";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "";
                            // date
                            document.getElementById("DateError").innerText =
                              "Please Choose a Date";
                            // time
                            document.getElementById("timeError").innerText = "";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "";
                          } else if (
                            document.getElementById("DateError").innerText != ""
                          ) {
                            alert("Please you must choose a Date first");
                          } else if (time == "") {
                            // email
                            document.getElementById("EmailError").innerText =
                              "";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "";
                            // date
                            document.getElementById("DateError").innerText = "";
                            // time
                            document.getElementById("timeError").innerText =
                              "Please Choose a Time Slot";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "";
                          } else if (issue == "") {
                            // email
                            document.getElementById("EmailError").innerText =
                              "";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "";
                            // date
                            document.getElementById("DateError").innerText = "";
                            // time
                            document.getElementById("timeError").innerText = "";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "Please Enter Your Issue";
                          } else {
                            // email
                            document.getElementById("EmailError").innerText =
                              "";
                            // Location
                            document.getElementById("LocationError").innerText =
                              "";
                            // date
                            document.getElementById("DateError").innerText = "";
                            // time
                            document.getElementById("timeError").innerText = "";
                            // issue
                            document.getElementById("IssueError").innerText =
                              "";
                            // Json Encoding
                            var JDirect = {
                              Email: email,
                              location: location,
                              Date: date,
                              Time: time,
                              Issue: issue,
                              jobService: "",
                              assignedEmployee: "",
                              respond: "",
                            };

                            axios
                              .post(
                                "http://localhost:5000/consultantAppointment/addconsultantappointment",
                                JDirect
                              )

                              .then(
                                (res) =>
                                  console.log("Worked: " + JSON.stringify(res)),
                                alert("appoinment added successfully"),
                                (window.location = "/consultancy/:consid")
                              )
                              .catch((err) =>
                                console.log("Failed: " + JSON.stringify(err))
                              );
                            // window.location = "/consultancy/customer";Meka check karala balanna wada karanawada Kiyala
                          }
                        }}
                        style={{
                          background: "#00ADB5",
                          borderRadius: "50px",
                          border: "0px white solid",
                          fontSize: "20px",
                          padding: "10px",
                          paddingLeft: "20px",
                          paddingRight: "20px",
                        }}
                      >
                        Submit
                      </button>
                    </div>
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
