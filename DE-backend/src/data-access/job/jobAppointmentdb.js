const mongoose = require('mongoose');
const jobAppointment = require('../../models/jobAppointment');

const createJobAppointment = async (Job) => {

   try{
        const newJob = new jobAppointment(Job);

        await newJob.save();

        return('appointment created')

    }catch(err){
        console.log(err);
    }
    
}





module.exports = createJobAppointment;