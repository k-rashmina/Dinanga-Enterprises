const jobAppointmentService = require('../../services/job/jobAppointmentService');

const createJobAppointment = async (req, res) => {

    const job = req.body;

    const message = await jobAppointmentService(job);

    res.json(message);
}

module.exports = createJobAppointment;