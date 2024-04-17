const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierfeedbackSchema = new schema ({
    Supplier_ID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        unique: true,
    },

    Supplier_Subject:{
        type: String,
        required: true,
        unique: true,
    },

    Supplier_Message:{
        type: String,
        required: true,
        unique: true,
    },

});

const supplierFeedback = mongoose.model(
    "supplier_Feedback",
    supplierfeedbackSchema
);
module.exports = supplierFeedback;