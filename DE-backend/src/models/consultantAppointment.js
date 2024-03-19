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
        required:true,  
        unique:true
    },
    location:{
        type:mongoose.SchemaTypes.ObjectId,
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

    status:{  
        type:String
    },
    
});




const consultantAppointment = mongoose.model("consultantAppointment",consultantAppointmentSchema);
module.exports = consultantAppointment;
