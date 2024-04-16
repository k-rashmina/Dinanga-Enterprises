const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderDetailsSchema = new schema({
    itemName:{
        type:String,
        required:true,  
        unique:true
    },
    itemNumber:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        // required:true
    },
    dateofOrder:{
        type:Date,
        default: () => Date.now()
    },
    companyAddress:{
        type:String,
        required:true
    },
    supplierName:{  
        type:String,
        required:true
    },
    comments:{  
        type:String,
        required:true
    }
   
});
const orderDetails = mongoose.model('orderDetails',orderDetailsSchema);
module.exports = orderDetails;