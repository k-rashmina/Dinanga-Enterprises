const mongoose = require("mongoose");
const consultantAppointment = require("../../models/consultantAppointment");

const createConsultantAppointment = async (consultancy) => {
  try {
    const newConsultancy = new consultantAppointment(consultancy);
    await newConsultancy.save();

    return "consultancy appointment created";
  } catch (err) {
    console.log(err);
  }
};

module.exports = createConsultantAppointment;
