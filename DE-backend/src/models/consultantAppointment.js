const mongoose = require('mongoose');
const schema = mongoose.Schema;

const consultantAppointmentSchema = new schema({
    consultantNumber:{
        type:String,
        required:true,  
        unique:true
    },
    Email:{
        type:String,
        required:true
        
    },
    location:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        required:true
    },
    Time:{
        type:String, 
        required:true
    },
    
    Issue:{  
        type:String,
        required:true
    },

    jobService:{
        type:String,

    },

    assignedEmployee:{
        type:String

    },

    respond:{
        type:String
    },

    status:{  
        type:String,
        default: "pending"
    },
    
});




const consultantAppointment = mongoose.model("consultantAppointment",consultantAppointmentSchema);
module.exports = consultantAppointment;
