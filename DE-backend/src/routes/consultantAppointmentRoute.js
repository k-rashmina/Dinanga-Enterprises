const express = require('express');
const route =express.Router();

const createConsultantAppointment =require('../controllers/consultancy/createconsultantAppointment');
const updateAppointment =require('../controllers/consultancy/updateAppointment')
const deleteAppointment =require('../controllers/consultancy/deleteAppointment')
const readAppointment =require('../controllers/consultancy/readAppointment')
const updateRespond=require('../controllers/consultancy/updateRespond')
const readAppointmentIssue=require('../controllers/consultancy/readAppointmentIssue')
const readPendingAppointment=require('../controllers/consultancy/readPendingAppointment')


route.post('/addconsultantappointment',(req,res) => createConsultantAppointment(req,res));
route.get("/getappointmentdetails/:id", readAppointment.getAppointmentDetails);
route.get("/getappointmentissue/:id", readAppointmentIssue.getAppointmentIssue);
route.get("/getpendingappointments",readPendingAppointment.getAppointmentsWithPendingStatus);
route.put("/updateappointment/:id", updateAppointment.updateAppointment);
route.put("/updaterespond/:id", updateRespond.updateRespond);
route.delete("/deleteappointment/:id", deleteAppointment.deleteAppointment);

module.exports = route;