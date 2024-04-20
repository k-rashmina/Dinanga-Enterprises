const Employee = require('../../models/employee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// test controller
async function getEmployeeTest(req, res) {
    return res.status(200).json({ msg: 'Test employee' });
}

//Register new employee
const registerEmployee = async (req, res) => {
    const { name, contactNumber, email, address, username, password, department, role } = req.body;
  
    try {
      // Check if the username is already taken
      let existingEmployee = await Employee.findOne({ username });
  
      if (existingEmployee) {
        return res.status(400).json({ msg: 'Username already exists' });
      }
  
      //Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newEmployee = new Employee({
        name,
        contactNumber,
        email,
        address,
        username,
        password: hashedPassword,
        department,
        role
      });
  
      await newEmployee.save();
  
      res.json({ msg: 'Employee registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Retrieve employee details 
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


// Delete employee account
const deleteEmployee = async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Employee deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

// Update employee details
const updateEmployee = async (req, res) => {
  try {
    const { name, contactNumber, email, address, username, password } = req.body;
    const employeeId = req.params.id;

    let updatedFields = {
      name,
      contactNumber,
      email,
      address,
      username,
    };

    if (password) {
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // Update with hashed password
      updatedFields.password = hashedPassword;
    }

    // Find and update employee
    const employee = await Employee.findByIdAndUpdate(employeeId, updatedFields, { new: true });

    // Check if employee exists
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    // Respond with success message and updated employee
    res.json({ msg: 'Employee updated successfully', employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

  // Get assigned tasks for mechanical employees
const getAssignedTasks = async (req, res) => {
    try {
      const assignedTasks = await Task.find({ assignedTo: req.user.id });
      res.json(assignedTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Get completed tasks for mechanical employees
const getCompletedTasks = async (req, res) => {
    try {
      const completedTasks = await Task.find({ assignedTo: req.user.id, status: 'completed' });
      res.json(completedTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Get assigned consultancy services for consultancy employees
const getAssignedServices = async (req, res) => {
    try {
      const assignedServices = await Service.find({ assignedTo: req.user.id });
      res.json(assignedServices);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  // Employee login test
  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const employee = await Employee.findOne({ username });

      if (!employee) {
        return res.status(401).json({ message: "Invalid username or password." });
      }

      const passwordMatch = await bcrypt.compare(password, employee.password);

      if (passwordMatch) {
        res.json({ message: "Login successful!" });
      } else {
        res.status(401).json({ message: "Invalid username or password." });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };

  //Get available consultancy employees
  const getAvailableConsultancyEmployees = async (req, res) => {
    try {
      // Query the database for consultancy employees who are available
      const consultancyEmployees = await Employee.find({
        department: 'Consultancy',
        availability: true
      });
      
      // Extract and return only the names of available consultancy employees
      // const employeeNames = consultancyEmployees.map(employee => {employee.name, employee._id});
      const employeeNames = consultancyEmployees.map(employee => {
        return {
          name:employee.name,
          _id:employee._id
        }
      });
      console.log(employeeNames)
      res.json(employeeNames);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  //Get available mechanical employees
  const getAvailableMechanicalEmployees = async (req, res) => {
    try {
      const mechanicalEmployees = await Employee.find({
        department: 'Mechanical',
        availability: true
      });
      
      const employeeNames = mechanicalEmployees.map(employee => {
        return {
          name:employee.name,
          _id:employee._id
        }
      });
      console.log(employeeNames)
      res.json(employeeNames);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };


  //Get all employee details
  const getAllEmployeeDetails = async (req, res) => {
    try {
      const employees = await Employee.find();
      if (!employees || employees.length === 0) {
        return res.status(404).json({ msg: 'No employees found' });
      }
      res.json(employees);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  // const passwordsMatch = (password, confirmPassword) => {
  //   return password === confirmPassword;
  // };
  

module.exports = {
    getEmployeeTest,
    registerEmployee,
    getEmployeeDetails,
    deleteEmployee,
    updateEmployee,
    getAssignedTasks,
    getCompletedTasks,
    getAssignedServices,
    login,
    getAvailableConsultancyEmployees,
    getAvailableMechanicalEmployees,
    getAllEmployeeDetails,
    // passwordsMatch,
    // updateServiceIssue,
    // updateProfile,
    // getProfile,
  };