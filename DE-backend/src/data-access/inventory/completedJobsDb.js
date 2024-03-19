const mongoose = require("mongoose");
const job = require("../../models/jobAppointment");
const inventory = require("../../models/inventoryDetails");

const getCompletedJob = async (jobId) => {
  try {
    const jobObject = await job.findById(jobId).populate("serviceType");
    console.log(jobObject);
    return jobObject;
  } catch (err) {
    console.log(err);
  }
};


const reduceItems = async (item_number) => {
    console.log(item_number)
    try{
        const updatedItem = await inventory.findOneAndUpdate({"itemNumber": `${item_number}`}, { $inc: { "quantity": -1 } },{new:true} )
        updatedItem.updateReorderState();       //update the stock state
        console.log(updatedItem);
        return updatedItem;
    }
    catch(err){
        console.log(err);
    }
    
}


module.exports = { getCompletedJob , reduceItems};
