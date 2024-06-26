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
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Employee'

    },

    respond:{
        type:String
    },

    status:{  
        type:String,
        default: "pending"
    },
    
});




const consultantAppointment = mongoose.model("consultant_Appointment",consultantAppointmentSchema);
module.exports = consultantAppointment;
