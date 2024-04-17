const consultantAppointment = require("../../models/consultantAppointment");

const deleteAppointment = async (req, res) => {
    try {
      const objectid = req.params.id; 
  
      const deletedConsultantAppointment = await consultantAppointment.findByIdAndDelete(objectid);
  
      if (deletedConsultantAppointment) {
        res.status(200).json({ message: "Appointment Successfully deleted", deletedConsultantAppointment});
      } else {
        res.status(404).json({ message: "Delete appointment Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { deleteAppointment};