const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderDetailsSchema = new schema({
    itemName:{
        type:String,
        required:true,  
    },
    order_number:{
        type: String,
        required: true
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
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'suppliers',
        required:true
    },
    comments:{  
        type:String,
        required:true
    },
    orderstatus:{
        type:String,
        required:true
    }
   
});
const orderDetails = mongoose.model('orders',orderDetailsSchema);
module.exports = orderDetails;