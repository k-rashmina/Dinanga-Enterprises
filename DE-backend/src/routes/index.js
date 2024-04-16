
const express = require("express");
const router = express.Router();
const inventoryRoutes = require("./inventory");
const jobAppointmentRoute = require("./jobAppointmentRoute");

router.use('/inventory', inventoryRoutes);         //inventory routes moddleware

const express = require('express');


const customerRoute = require('./customer-route');
const feedbackRoute = require('./feedback-route');

const transaction = require('./transactions-route');
const getJobService = require('../controllers/job/get-job-service');


const router = express.Router();
const consultantAppointmentRoute =require("./consultantAppointmentRoute")


router.use('/consultantAppointment',consultantAppointmentRoute)//consultant routes middleware

router.use('/transaction', transaction);
router.get('/getjobservices', (req, res) => getJobService(req, res));



router.use('/customer', customerRoute );
router.use('/cusfeedback', feedbackRoute );


router.use('/jobAppointment', jobAppointmentRoute); //job appointment routes moddleware

module.exports = router;