const express = require('express');
const {getEmployeeTest, registerEmployee, getEmployeeDetails, deleteEmployee, updateEmployee, getAssignedTasks, getCompletedTasks, getAssignedServices, login} = require('../controllers/employee/employeeController');

const router = express.Router();

// test route
router.get('/test', getEmployeeTest);

router.post('/registerEmployee', registerEmployee);

router.get('/getEmployeeDetails/:id',getEmployeeDetails);

router.delete('/deleteEmployee/:id', deleteEmployee);

router.put('/updateEmployee/:id', updateEmployee);

router.get('/getAassignedTasks', getAssignedTasks);

router.get('/getCompletedTasks', getCompletedTasks);

router.get('/getAssignedServices', getAssignedServices);

router.post('/login', login);


module.exports = router;