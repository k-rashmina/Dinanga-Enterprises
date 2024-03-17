const express = require("express");
const router = express.Router();
const inventoryRoutes = require("./inventory");
const jobAppointmentRoute = require("./jobAppointmentRoute");

router.use('/inventory', inventoryRoutes);         //inventory routes moddleware

router.use('/jobAppointment', jobAppointmentRoute); //job appointment routes moddleware

module.exports = router;