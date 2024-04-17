const pendingAppointment = require("../../models/jobAppointment");

const getAppointmentsWithPendingStatus = async (req, res) => {
    try {
        // Find appointments where the status is "pending"
        const appointments = await pendingAppointment.find({ status: "pending" });

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getAppointmentsWithPendingStatus };
