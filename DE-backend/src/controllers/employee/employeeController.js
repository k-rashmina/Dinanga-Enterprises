const Employee = require('../../models/employee')

// test controller
const getEmployeeTest = async (req, res) => {
    return res.status(200).json({ msg: 'Test employee' })
  };

// Controller for registering a new employee
const registerEmployee = async (req, res) => {
    try {
      const { name, contactNumber, email, address, skills, username, password, availability, department } = req.body;
      // Create new employee instance
      const newEmployee = new Employee({
        name,
        contactNumber,
        email,
        address,
        skills,
        username,
        password,
        availability,
        department,
      });
      // Save employee to the database
      await newEmployee.save();
      res.status(201).json({ msg: 'Employee registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Controller for retrieving employee details
const getEmployeeDetails = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ msg: 'Employee not found' });
      }
      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };


// Controller for deleting an employee account
const deleteEmployee = async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Employee deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Controller for updating employee details
const updateEmployee = async (req, res) => {
    try {
      const { name, contactNumber, email, address, username, password } = req.body;
      const updatedFields = {
        name,
        contactNumber,
        email,
        address,
        username,
        password,
      };
      const employee = await Employee.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
      if (!employee) {
        return res.status(404).json({ msg: 'Employee not found' });
      }
      res.json({ msg: 'Employee updated successfully', employee });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Controller to get assigned tasks for mechanical employees
const getAssignedTasks = async (req, res) => {
    try {
      const assignedTasks = await Task.find({ assignedTo: req.user.id });
      res.json(assignedTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Controller to get completed tasks for mechanical employees
const getCompletedTasks = async (req, res) => {
    try {
      const completedTasks = await Task.find({ assignedTo: req.user.id, status: 'completed' });
      res.json(completedTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Controller to get assigned consultancy services for consultancy employees
const getAssignedServices = async (req, res) => {
    try {
      const assignedServices = await Service.find({ assignedTo: req.user.id });
      res.json(assignedServices);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  

module.exports = {
    getEmployeeTest,
    registerEmployee,
    getEmployeeDetails,
    deleteEmployee,
    updateEmployee,
    getAssignedTasks,
    getCompletedTasks,
    getAssignedServices,
    // updateServiceIssue,
    // updateProfile,
    // getProfile,
  };