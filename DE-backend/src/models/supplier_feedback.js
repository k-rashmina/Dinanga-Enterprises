const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierfeedbackSchema = new schema ({
    Supplier_Email:{
        type: String,
        required: true,
    },

    Supplier_Subject:{
        type: String,
        required: true,
    },

    Supplier_Message:{
        type: String,
        required: true,
    },
    fed_date:{
        type: Date,
        required: true
    }

});

const supplierFeedback = mongoose.model(
    "supp_Feedback",
    supplierfeedbackSchema
);
module.exports = supplierFeedback;