const mongoose = require("mongoose");
const schema = mongoose.Schema;


const jobAppointmentSchema = new schema({


  jobNumber:{
    type: String,
    unique: true,
    null:false,
    
  },

  date: {
    type: Date,
    //required: true,
  },

  time: {
    type: String,
    //required: true,
  },

  email:{
  type:String,
  },


  location: {
    type: String,
    //required: true,
    ref: "Location"
  },

  serviceType: {
    type: mongoose.SchemaTypes.ObjectId,
    //required: true,
    ref: "services"
  },

  vehicleType: {
    type: String,
    //required: true,
    ref:"Vehicle_type"
  },

  status: {
    type: String
  },

  employeeName: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Employee'
  },

  paymentStatus:{
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





