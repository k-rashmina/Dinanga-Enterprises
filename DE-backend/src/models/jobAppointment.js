const mongoose = require("mongoose");
const schema = mongoose.Schema;

const jobAppointmentSchema = new schema({
    jobNumber: {
        type: String,
        required: true,
        unique: true,
    },
  Date: {
    type: Date,
    required: true,
  },
  Time: {
    type: String,
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  serviceType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"services"
  },
  vehicleType: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status:{
    type: String
  }

  
});


// const servicesModelSchema = new schema({
//   service_name: {
//     type: String,
//     required: true,
//   },
//   charge: {
//     type: Number,
//     required: true,
//   },
//   item_list: {
//     type: Object,
//     required: true
 
//   },
// });

// const servicesModel = mongoose.model(
//   "services",
//   servicesModelSchema
// );

const jobAppointment = mongoose.model(
  "jobAppointment",
  jobAppointmentSchema
);
module.exports = jobAppointment;
