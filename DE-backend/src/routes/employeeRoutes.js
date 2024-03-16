const express = require('express');
const {getEmployeeTest} = require('../controllers/employee/employeeController');

const router = express.Router();

router.get('/test', getEmployeeTest);

module.exports = router;