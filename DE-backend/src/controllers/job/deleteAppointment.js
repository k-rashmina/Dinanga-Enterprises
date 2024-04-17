const jobAppointment = require("../../models/jobAppointment");

const deleteAppointment = async (req, res) => {
    try {
      const objectid = req.params.id; 
  
      const deletedjobAppointment = await jobAppointment.findByIdAndDelete(objectid);
  
      if (deletedjobAppointment) {
        res.status(200).json({ message: "Appointment Successfully deleted", deletedjobAppointment});
      } else {
        res.status(404).json({ message: "Delete appointment Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { deleteAppointment};