const mongoose = require('mongoose');
const Services = require('../../models/servicesModel');

const getJobServicesList = async () => {

  try{

    return await Services.find();

  }catch(err){
    
    console.log(err.message);

  }

}

module.exports = getJobServicesList;