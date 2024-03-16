const Employee = require('../../models/employee')

// Controller for retrieving employee details
const getEmployeeTest = async (req, res) => {
    return res.status(200).json({ msg: 'Test employee' })
    // try {
    //   const employee = await Employee.findById(req.params.id);
    //   if (!employee) {
    //     return res.status(404).json({ msg: 'Employee not found' });
    //   }
    //   res.json(employee);
    // } catch (err) {
    //   console.error(err.message);
    //   res.status(500).send('Server Error');
    // }
  };


module.exports = {
    getEmployeeTest,
    // registerEmployee,
    // getEmployeeDetails,
    // deleteEmployee,
    // updateEmployee,
  };