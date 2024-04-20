const consultantAppointment = require("../../models/consultantAppointment");

const getAppointmentsWithEmail = async (req, res) => {
    try {
        const email = req.params.email; // Get email from URL parameter

        const appointments = await consultantAppointment.aggregate([
            // Match appointments with  matching email
            {
                $match: {
                    
                    Email: email
                }
            },
            // Project to select the specified fields
            {
                $project: {
                    consultantNumber: "$consultantNumber",
                    Date: "$Date",
                    Time: "$Time",
                    location: "$location",
                    status: "$status",
                    _id: 0
                }
            }
        ]);

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getAppointmentsWithEmail };
