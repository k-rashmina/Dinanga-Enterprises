const mongoose = require('mongoose');
const jobAppointment = require('../../models/jobAppointment');
const counter = require('../../models/counter')

const createJobAppointment = async (Job) => {

   try{

        let JBCounter = await counter.findOneAndUpdate({'table': 'job services'}, {$inc: {'count': 1}}, {new: true});

        const newJob = new jobAppointment(Job);
        newJob.jobNumber = `JB${JBCounter.count}`;

        await newJob.save();

        return('appointment created')

    }catch(err){
        console.log(err);
    }
    
}





module.exports = createJobAppointment;