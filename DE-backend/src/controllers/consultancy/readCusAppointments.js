const consultantAppointment = require("../../models/consultantAppointment");

const readCusAppointments = async (req, res) => {
    try {
      const customer = req.query.email;
      // console.log(customer)
      const appointments = await consultantAppointment.find({"Email": customer});
      // console.log(appointment);
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };


 module.exports = { readCusAppointments}; 