const consultantAppointment = require("../../models/consultantAppointment");

const getAppointmentsWithEmployee = async (req, res) => {
    try {
        // Retrieve the assigned employee ID from the request query parameters
        const assignedEmployeeId = req.query.empid;

        if (!assignedEmployeeId) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        // Find appointments where the status is "pending" and assignedEmployee matches the assignedEmployeeId
        const appointments = await consultantAppointment.find({ 
            status: "pending",
            assignedEmployee: assignedEmployeeId 
        }).populate('assignedEmployee').exec();
        // Select only the consultantNumber, Email, Date, Time, location, and assignedEmployee fields
        //.select('consultantNumber Email Date Time location assignedEmployee');

        // console.log(appointments);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};
module.exports = { getAppointmentsWithEmployee };
