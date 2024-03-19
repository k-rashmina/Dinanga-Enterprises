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
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new employee object with the hashed password
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
  
      // Save the new employee to the database
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
      // Check if the employee exists
      let employee = await Employee.findOne({ username });
  
      if (!employee) {
        return res.status(400).json({ msg: 'Invalid username' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, employee.password);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid password' });
      }
  
      // Create and return JWT token
      const payload = {
        user: {
          id: employee.id,
          username: employee.username,
          department: employee.department
        }
      };
  
      jwt.sign(
        payload,
        token = process.env.TOKEN,
        { expiresIn: 3600 }, // Token expires in 1 hour
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
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
    login,
    // updateServiceIssue,
    // updateProfile,
    // getProfile,
  };