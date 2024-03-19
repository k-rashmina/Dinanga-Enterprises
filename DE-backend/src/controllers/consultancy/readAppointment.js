const consultantAppointment = require("../../models/consultantAppointment");

const getAppointmentDetails = async (req, res) => {
    try {
      const appointment = await consultantAppointment.find();
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };


 module.exports = { getAppointmentDetails}; 