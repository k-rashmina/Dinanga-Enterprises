const express = require('express');
const {getEmployeeTest, registerEmployee, getEmployeeDetails, deleteEmployee, updateEmployee, login, getAvailableConsultancyEmployees, getAllEmployeeDetails, getAvailableMechanicalEmployees, } = require('../controllers/employee/employeeController');

const router = express.Router();

// test route
router.get('/test', getEmployeeTest);

router.post('/registerEmployee', registerEmployee);

router.get('/getEmployeeDetails/:id',getEmployeeDetails);

router.delete('/deleteEmployee/:id', deleteEmployee);

router.put('/updateEmployee/:id', updateEmployee);

router.post('/login', login);

router.get('/getAvailableConsultancyEmployees', getAvailableConsultancyEmployees);

router.get('/getAllEmployeeDetails', getAllEmployeeDetails);

router.get('/getAvailableMechanicalEmployees', getAvailableMechanicalEmployees);


module.exports = router;