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
    type: String,
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
    type: String,
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





// jobAppointmentSchema.index({ jobNumber: 1 }, { unique: true }); // Maintain unique index
// jobAppointmentSchema.pre('save', function(next) {
//   if (this.jobNumber === null) {
//     throw new Error("jobNumber cannot be null");
//   }
//   next();
// });

// Usage
// const newJobAppointment = new jobAppointment({
//   jobNumber: "2",
  // Date: ,
  // Time:'',
  // location: '',
  // serviceType: '',
  // vehicleType: '',
  

// });

// newJobAppointment.save()
//   .then(() => console.log("Job appointment created successfully!"))
//   .catch((error) => console.error("Error creating job appointment:", error));
