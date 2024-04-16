const mongoose = require('mongoose');
const cusDetails = require('../../models/customerDetails');


const getCusDetails = async(cusid) =>{

    try{
        const getCusDetails = await cusDetails.findOne({'cusMail': cusid});
        return(getCusDetails);
    }

    catch(err){
        console.log(err.message);
    }
}


// const cusLogin = async (loginDetails) => {

//     const user = await cusDetails.findOne()

// }


const addCusDetails = async(newCustomer) =>{

    try{
        const newCus = new cusDetails(newCustomer);
        await newCus.save();
        return("Customer added");
    }catch(err){

        console.log(err.message);
    }
}



const updateCustomer = async(upCus) => {

    try{

        console.log(upCus);

        const updated = await cusDetails.findByIdAndUpdate(upCus._id, upCus, {new:true, runValidators: true});
        return(updated);

    }catch(err){

        console.log(err.message);

    }


}



const deleteCustomer = async(delCusId) =>{

    try{
        
        const delCus =  await cusDetails.findByIdAndDelete(delCusId);
        return(delCus);
    }catch(err){

        console.log(err.message);
    }
}

module.exports = {addCusDetails,getCusDetails,updateCustomer,deleteCustomer};