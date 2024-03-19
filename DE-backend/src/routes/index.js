const express = require('express');
const router = express.Router();
const consultantAppointmentRoute =require("./consultantAppointmentRoute")

router.use('/consultantAppointment',consultantAppointmentRoute)//consultant routes middleware

module.exports = router;