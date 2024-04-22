const consultantAppointment = require("../../models/consultantAppointment");

const getAppointmentDetails = async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await consultantAppointment.findById(appointmentId).populate('assignedEmployee').exec();
      console.log(appointment);
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };


 module.exports = { getAppointmentDetails}; 