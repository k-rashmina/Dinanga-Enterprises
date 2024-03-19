const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerFeedbackSchema = new schema({
    feedbackSub:{
        type: String,
        required: true,
        unique: true,
    },

    feedbackMsg:{

        type: String,
        required: true,
        unique: true,
    },
});

const customerFeedback = mongoose.model(
    "customerDetails",
    customerFeedbackSchema
);

module.exports = customerFeedback;