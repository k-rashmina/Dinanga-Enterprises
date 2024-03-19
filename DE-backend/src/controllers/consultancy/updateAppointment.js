const consultantAppointment = require("../../models/consultantAppointment");


const updateAppointment = async (req, res) => {
    try {
      let objectid = req.params.id;
  
      const {
        location,
        Date,
        Time,
        Issue,
        status,
      } = req.body;
  
      const updateStates = {
        location,
        Date,
        Time,
        Issue,
        status,
      };
  
      const updatedConsultantAppointment= await consultantAppointment.findByIdAndUpdate(
        objectid,
        updateStates,
        { new: true }
      );
  
      if (updatedConsultantAppointment) {
        await updatedConsultantAppointment.save();
        res.status(200).json({ status: "Successfully Updated", updatedConsultantAppointment });
      } else {
        res.status(404).json({ message: "Update Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { updateAppointment};