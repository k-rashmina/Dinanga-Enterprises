const express = require('express');
const employeeRoutes = require("./employeeRoutes");

const router = express.Router();

//Employee Routes
router.use('/employee',employeeRoutes);

module.exports = router;