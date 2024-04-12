const mongoose = require("mongoose");
const consultantAppointment = require("../../models/consultantAppointment");
const counter = require('../../models/counter');

const createConsultantAppointment = async (consultancy) => {
  try {

    let CSCounter = await counter.findOneAndUpdate({'table': 'consultant appointment'}, {$inc: {'count': 1}}, {new: true})

    const newConsultancy = new consultantAppointment(consultancy);
    newConsultancy.consultantNumber = `CS${CSCounter.count}`

    await newConsultancy.save();

    return "consultancy appointment created";
  } catch (err) {
    console.log(err);
  }
};

module.exports = createConsultantAppointment;
