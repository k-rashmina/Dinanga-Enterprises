const JobAppointment = require("../../models/jobAppointment");

const getAppointmentsWithPendingStatus = async (req, res) => {
    try {
        // Find appointments where the status is "pending" and populate the "serviceType" field
        const appointments = await JobAppointment.find({ status: "pending" }).populate(['serviceType', 'employeeName']);

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getAppointmentsWithPendingStatus };
