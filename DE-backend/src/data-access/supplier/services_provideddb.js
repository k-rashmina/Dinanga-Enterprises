const mongoose = require ('mongoose');
const ProvidedServices = require('../../models/services_provided');

const getServicesProvided = async () => {
    
    try{
        const Services = await ProvidedServices.find ();

        return (Services);
    
    }catch(err){
        console.log(err.message);
    }
}

const addServicesProvided = async (addServices) => {
    try {
        const newService = ProvidedServices (addServices);

        await newService.save();

        return ('Added Successfully');
    }catch(err){
        console.log(err.message);
    }
}

const putServicesProvided = async (updateServices) => {
    try{
        const updateService = await ProvidedServices.findByIdAndUpdate(updateServices._id, updateServices, {new: true, runValidators: true});
        return (updateService);
    
    }catch(err){
        console.log(err.message);
    }
}

const deleteServicesProvided = async (deleteServices) => {
    try{
        const deleteService = await ProvidedServices.findByIdAndDelete(deleteServices);
        return (deleteService);
    
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {getServicesProvided, addServicesProvided, putServicesProvided, deleteServicesProvided};

