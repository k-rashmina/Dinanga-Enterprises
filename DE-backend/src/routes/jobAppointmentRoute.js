const express = require('express');
const createJobAppointment = require('../controllers/job/createJobAppointment');

const route = express.Router();

route.post('/addjobappointment', (req, res) => createJobAppointment(req, res));

module.exports = route;