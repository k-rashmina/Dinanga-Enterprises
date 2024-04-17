
const express = require('express');
const supplierRouter = require('./supplier_profile_route');
const supFeedbackRouter = require('./supplier_feedback_route');
const supServicesRouter = require('./services_provided_route');

const router = express.Router();
const inventoryRoutes = require("./inventory");
const jobAppointmentRoute = require("./jobAppointmentRoute");
const transaction = require('./transactions-route');

router.use('/inventory', inventoryRoutes);         //inventory routes moddleware


const getJobService = require('../controllers/job/get-job-service');

const customerRoute = require('./customer-route');
const feedbackRoute = require('./feedback-route');

const consultantAppointmentRoute =require("./consultantAppointmentRoute")


router.use('/consultantAppointment',consultantAppointmentRoute)//consultant routes middleware

router.use('/transaction', transaction);
router.get('/getjobservices', (req, res) => getJobService(req, res));



router.use('/customer', customerRoute );
router.use('/cusfeedback', feedbackRoute );



const orderRoutes = require("./order");

router.use('/order',orderRoutes)

router.use('/jobAppointment', jobAppointmentRoute); //job appointment routes moddleware

router.use('/supplier', supplierRouter);
router.use('/supFeedback', supFeedbackRouter);
router.use('/supServices', supServicesRouter);

module.exports = router;
