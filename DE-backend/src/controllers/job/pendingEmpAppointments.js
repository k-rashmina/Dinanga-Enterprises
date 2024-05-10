const jobAppointment = require("../../models/jobAppointment");

const getPendingAppForEmp = async (req, res) => {
    try {
        const employee_id = req.query.empid; // Assuming employee_id is sent in the request 

        // Find appointments where the status is "pending" and employee_id matches
        const appointments = await jobAppointment.find({ status: "pending", employeeName: employee_id }).populate('serviceType').exec();

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getPendingAppForEmp };

