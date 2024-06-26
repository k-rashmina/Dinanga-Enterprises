const jobAppointment = require("../../models/jobAppointment");

const getAppointmentDetails = async (req, res) => {
    try {

      const customer = req.query.email;

      const appointment = await jobAppointment.find({"email": customer}).populate(['employeeName', 'serviceType']).exec();
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };

  module.exports = { getAppointmentDetails}; 