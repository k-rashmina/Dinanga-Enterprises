const pendingEmpAppointment = require("../../models/jobAppointment");

const getPendingAppForEmp = async (req, res) => {
    try {
        const { employee_id } = req.body; // Assuming employee_id is sent in the request body

        // Find appointments where the status is "pending" and employee_id matches
        const appointments = await pendingEmpAppointment.find({ status: "pending", employee_id }).populate('serviceType').exec();

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getPendingAppForEmp };

