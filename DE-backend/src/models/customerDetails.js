const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerDetailsSchema = new schema({
    cusFname:{
        type: String,
        required: true,
        unique: true,
    },

    cusLname:{

        type: String,
        required: true,
        unique: true,
    },

    bDate:{
        type: Date,
        required: true,
        unique:true,
    },

    cusMail:{
        type: String,
        required: true,
        unique: true,

    },

    cusPassword:{
        type: String,
        required: true,
        unique: true,
    },


    pNum:{
        type: Number,
        required: true,
        unique: true,
    },

    cusAddr:{
        type: String,
        required: true,
        unique: true,
    },

    vModel:{
        type: String,
        required: true,
        unique: true,

    },
    mYear:{
        type: Number,
        required: true,
        unique: true,
    },

});

const customerDetails = mongoose.model(
    "customerDetails",
    customerDetailsSchema
);

module.exports = customerDetails;