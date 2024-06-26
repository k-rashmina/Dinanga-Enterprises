const express = require('express');
const route =express.Router();

const createjobAppointment =require('../controllers/job/createjobAppointment');
const updateAppointment =require('../controllers/job/updateAppointment');
const deleteAppointment =require('../controllers/job/deleteAppointment');
const readAppointment =require('../controllers/job/readAppointment');
const pendingStatus = require('../controllers/job/pendingStatus');
const pendingEmpAppointments = require('../controllers/job/pendingEmpAppointments')



route.post('/addjobappointment',(req,res) => createjobAppointment(req,res));
route.get("/getappointmentdetails", readAppointment.getAppointmentDetails);
route.put("/updateappointment/:id", updateAppointment.updateAppointment);
route.delete("/deleteappointment/:id", deleteAppointment.deleteAppointment);
route.get("/getpendingdetails" , pendingStatus.getAppointmentsWithPendingStatus);
route.get("/getpendingempjobs", pendingEmpAppointments.getPendingAppForEmp);


module.exports = route;