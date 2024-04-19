const mongoose = require ('mongoose');
const feedbackcustomer = require('../../models/customerFeedback');

const getFeedbackCustomer = async () => {
    
    try{
        const feedback = await feedbackcustomer.find ();

        return (feedback);
    
    }catch(err){
        console.log(err.message);
    }
}

const addFeedbackCustomer = async (addFeedback) => {
    try {
        const newfeedback = new feedbackcustomer (addFeedback);

        await newfeedback.save();

        return ('Feedback Sent');
    }catch(err){

        console.log(err.message);
    }
}


const putFeedbackcustomer = async (upFeedback) => {
    try{
        const updateFeedback = await feedbackcustomer.findByIdAndUpdate(upFeedback._id, upFeedback, {new: true, runValidators: true});
        return (updateFeedback)
    
    }catch(err){
        console.log(err.message);
    }
}

const deleteFeedbackcustomer = async (deletefeedback) => {
    try{
        const deleteFeedback = await feedbackcustomer.findByIdAndDelete(deletefeedback);
        return (deleteFeedback);
    
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {getFeedbackCustomer, addFeedbackCustomer, putFeedbackcustomer, deleteFeedbackcustomer};