const consultantAppointment = require("../../models/consultantAppointment");

const getAppointmentsWithPendingStatus = async (req, res) => {
    try {
        // Find appointments where the status is "pending"
        const appointments = await consultantAppointment.find({ status: "pending" })
            // Select only the consultantNumber, Date, and location fields
            .select('consultantNumber Email Date location');

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getAppointmentsWithPendingStatus };
