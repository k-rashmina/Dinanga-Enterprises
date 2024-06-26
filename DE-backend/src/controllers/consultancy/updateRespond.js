const consultantAppointment = require("../../models/consultantAppointment");


const updateRespond = async (req, res) => {
    try {
      let objectid = req.params.id;
  
      const {
       
        jobService,
        assignedEmployee,
        respond,
        status,
        
      } = req.body;
  
      const updateStates = {
        jobService,
        assignedEmployee,
        respond,
        status,

      };
  
      const updatedRespond= await consultantAppointment.findByIdAndUpdate(
        objectid,
        updateStates,
        { new: true }
      );
  
      if (updatedRespond) {
        await updatedRespond.save();
        res.status(200).json({ status: "Successfully respond Updated", updatedRespond });
      } else {
        res.status(404).json({ message: "Update Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { updateRespond};