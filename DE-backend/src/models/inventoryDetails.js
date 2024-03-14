const mongoose = require('mongoose');
const schema = mongoose.Schema;

const inventoryDetailsSchema = new schema({
    itemNumber:{
        type:String,
        required:true,  
        unique:true
    },
    itemName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    reorderLevel:{
        type:Number,
        enum:[10,20,30,40,50,60,70,80,90,100],
        required:true
    },
    reorderState:{
        type:String,
        enum:['Out of Stocks','Low Stcoks','In Stocks'],
        required:true
    },
    availability:{  
        type:String,
        enum:['Available','Reorder'],
        required:true
    }
});

const inventoryDetails = mongoose.model('inventoryDetails',inventoryDetailsSchema);
module.exports = inventoryDetails;