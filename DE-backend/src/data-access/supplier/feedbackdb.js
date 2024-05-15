const mongoose = require ('mongoose');
const feedbacksupplier = require('../../models/supplier_feedback');

const getFeedbackSupplier = async (Sup_ID) => {
    
    try{
        console.log(Sup_ID)
        const feedback = await feedbacksupplier.find ({'Supplier_Email': Sup_ID});
        // console.log(feedback)
        return (feedback);
    
    }catch(err){
        console.log(err.message);
    }
}

const addFeedbackSupplier = async (addFeedback) => {
    console.log(addFeedback);
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
        console.log(upFeedback)
        const updateFeedback = await feedbacksupplier.findByIdAndUpdate(upFeedback._id, upFeedback, {new: true, runValidators: true});
        return (updateFeedback)
    
    }catch(err){
        console.log(err.message);
    }
}

const deleteFeedbacksupplier = async (deletefeedback) => {
    console.log('delete ID', deletefeedback)
    try{
        const deleteFeedback = await feedbacksupplier.findByIdAndDelete(deletefeedback);
        return (deleteFeedback);
    
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {getFeedbackSupplier, addFeedbackSupplier, putFeedbacksupplier, deleteFeedbacksupplier};

