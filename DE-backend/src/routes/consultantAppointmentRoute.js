const express = require('express');
const route =express.Router();

const createConsultantAppointment =require('../controllers/consultancy/createconsultantAppointment');
const updateAppointment =require('../controllers/consultancy/updateAppointment')
const deleteAppointment =require('../controllers/consultancy/deleteAppointment')
const readAppointment =require('../controllers/consultancy/readAppointment')


route.post('/addconsultantappointment',(req,res) => createConsultantAppointment(req,res));
route.get("/getappointmentdetails", readAppointment.getAppointmentDetails);
route.put("/updateappointment/:id", updateAppointment.updateAppointment);
route.delete("/deleteappointment/:id", deleteAppointment.deleteAppointment);

module.exports = route;