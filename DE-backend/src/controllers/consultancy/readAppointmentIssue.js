const consultantAppointment = require("../../models/consultantAppointment");

const getAppointmentIssue = async (req, res) => {
    try {
        const appointmentId = req.params.id; // Assuming the id is passed as a route parameter
        const appointment = await consultantAppointment.findById(appointmentId).select('Issue');
        
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { getAppointmentIssue };
