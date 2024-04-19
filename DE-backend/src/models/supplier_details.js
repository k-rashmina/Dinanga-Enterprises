const mongoose = require("mongoose");
const schema = mongoose.Schema;

const supplierDetailsSchema = new schema ({
    Supplier_bname:{
        type: String,
        //required: true,

    },

    Supplier_email:{
        type: String,
        required: true,
        unique: true,

    },

    Supplier_contact:{
        type:Number,
        required:true,
    },

    Supplier_aos:{
        type:String,
        required:true,
    },

    Supplier_Pw:{
        type:String,
        required:true,
    },

});

const supplierDetails = mongoose.model(
    "suppliers",
    supplierDetailsSchema
);
module.exports = supplierDetails;