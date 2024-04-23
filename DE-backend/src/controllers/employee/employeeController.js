const Employee = require('../../models/employee')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secretKey = 'Maneesha';

// test controller
async function getEmployeeTest(req, res) {
    return res.status(200).json({ msg: 'Test employee' });
}

//Register a new employee
const registerEmployee = async (req, res) => {
    const { name, contactNumber, email, address, username, password, department, role } = req.body;
  
    try {
      let existingEmployee = await Employee.findOne({ username });
  
      if (existingEmployee) {
        return res.status(400).json({ msg: 'Username already exists' });
      }
  
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

//Retrieve employee details 
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


//Delete employee
const deleteEmployee = async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ msg: 'Employee deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

//Update employee
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
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      updatedFields.password = hashedPassword;
    }

    const employee = await Employee.findByIdAndUpdate(employeeId, updatedFields, { new: true });

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json({ msg: 'Employee updated successfully', employee });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

  //Employee login test
  const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const employee = await Employee.findOne({ username });

        if (!employee) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const passwordMatch = await bcrypt.compare(password, employee.password);

        if (passwordMatch) {
            const token = jwt.sign(
                {
                    employeeId: employee._id, 
                    username: employee.username 
                },
                secretKey, 
                {
                    expiresIn: '1h' 
                }
            );

            res.json({ message: "Login successful!", token });
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
      const consultancyEmployees = await Employee.find({
        department: 'Consultancy',
        availability: true
      });
      
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
  

module.exports = {
    getEmployeeTest,
    registerEmployee,
    getEmployeeDetails,
    deleteEmployee,
    updateEmployee,
    login,
    getAvailableConsultancyEmployees,
    getAvailableMechanicalEmployees,
    getAllEmployeeDetails,
  };