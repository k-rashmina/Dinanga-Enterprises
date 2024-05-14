const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerFeedbackSchema = new schema({
    cusEmail: {
        type: String,
        required: true
    },

    feedbackSub:{
        type: String,
        required: true,
       
    },

    feedbackMsg:{

        type: String,
        required: true,
       
    },
},{timestamps: true});

const customerFeedback = mongoose.model(
    "customerFeedbackNew",
    customerFeedbackSchema
);

module.exports = customerFeedback;