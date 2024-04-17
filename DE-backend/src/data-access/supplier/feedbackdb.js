const mongoose = require ('mongoose');
const feedbacksupplier = require('../../models/supplier_feedback');

const getFeedbackSupplier = async (Sup_ID) => {
    
    try{
        const feedback = await feedbacksupplier.find ({"Supplier_ID": Sup_ID});

        return (feedback);
    
    }catch(err){
        console.log(err.message);
    }
}

const addFeedbackSupplier = async (addFeedback) => {
    try {
        const newfeedback = feedbacksupplier (addFeedback);

        await newfeedback.save();

        return ('Feedback Sent')
    }catch(err){
        console.log(err.message);
    }
}

const putFeedbacksupplier = async (upFeedback) => {
    try{
        const updateFeedback = await feedbacksupplier.findByIdandUpdate(upFeedback._id, upFeedback, {new: true, runValidators: true});
        return (updateFeedback)
    
    }catch(err){
        console.log(err.message);
    }
}

const deleteFeedbacksupplier = async (deletefeedback) => {
    try{
        const deleteFeedback = await feedbacksupplier.findByIDAndDelete(deletefeedback);
        return (deleteFeedback);
    
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {getFeedbackSupplier, addFeedbackSupplier, putFeedbacksupplier, deleteFeedbacksupplier};

