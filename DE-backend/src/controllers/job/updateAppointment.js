const jobAppointment = require("../../models/jobAppointment");


const updateAppointment= async (req, res) => {
    try {
      let objectid = req.params.id;
  
      const {
        date,
        time,
        location,
        serviceType,
        vehicleType,
        status,
        employeeName,
      } = req.body;

      
  
      const updateStates = {
        date,
        time,
        location,
        serviceType,
        vehicleType,
        status,
        employeeName,
      };
  
      const updatedjobAppointment= await jobAppointment.findByIdAndUpdate(
        objectid,
        updateStates,
        { new: true }
      );
  
      if (updatedjobAppointment) {
        await updatedjobAppointment.save();
        res.status(200).json({ status: "Successfully Updated", updatedjobAppointment });
      } else {
        res.status(404).json({ message: "Update Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { updateAppointment};
