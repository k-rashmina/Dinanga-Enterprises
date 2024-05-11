const mongoose = require("mongoose");
const job = require("../../models/jobAppointment");
const inventory = require("../../models/inventoryDetails");


const getCompletedJob = async (jobId) => {
  try {
    const jobObject = await job.findById(jobId).populate("serviceType");
    // console.log(jobObject);
    return jobObject;
  } catch (err) {
    console.log(err);
  }
};


const reduceItems = async (item_number) => {
    // console.log('item number', item_number)

    try{

      const updatedItem = await inventory.findOneAndUpdate({"itemNumber": `${item_number}`}, { $inc: { "quantity": -1 } },{new:true} )
      updatedItem.updateReorderState();       //update the stock state
      // console.log(updatedItem);
      return updatedItem;
    }
    catch(err){
        console.log(err)
    }
    
}


const checkItemAvailability = async (item_list) => {

  const keysArr = Object.keys(item_list);

  // console.log(keysArr);

  let messageArr = await Promise.all(keysArr.map(async (key) => {
    const item_number = item_list[key];
    const inventoryItem = await inventory.findOne({ "itemNumber": `${item_number}` });

    console.log('quantity', inventoryItem.quantity)
    console.log('reorder', inventoryItem.reorderLevel)
  
    if(inventoryItem.quantity <= inventoryItem.reorderLevel){
      return 'error';
    }else{
      return 'success';
    }

  }))

  await messageArr;

  // console.log('Message Arr', messageArr)

  messageArr = messageArr.filter((m) => {
    if(m == 'error'){
      return true
    }else{
      return false
    }
  })

  // console.log('Message Arr', messageArr.length)
  

  if(messageArr.length > 0){
    return false;
  }else{
    return true;
  }

}


module.exports = { getCompletedJob , reduceItems, checkItemAvailability};
