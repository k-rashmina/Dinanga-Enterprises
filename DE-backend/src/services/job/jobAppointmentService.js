const createJobAppointment = require('../../data-access/job/jobAppointmentdb');

module.exports = async (job) => {

    const message = await createJobAppointment(job);

    return message;

}