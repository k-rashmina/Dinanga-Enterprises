const mongoose = require ('mongoose');
const supplierDetails = require('../../models/supplier_details');

const getSupplierDetails = async (supplier_id) => {
    
    try{
        const details = await supplierDetails.findOne ({'Supplier_email' : supplier_id});

        return (details);
    
    }catch(err){
        console.log(err.message);
    }
}

const getSupplierList = async () => {

    try{

        const supList = await supplierDetails.find();

        return supList;

    }catch(err) {

        console.log(err.message);

    }

}


const getLoggedUser = async(user) => {

    try{

        const loggedUser = await supplierDetails.findOne().where('Supplier_email').equals(user.mail).where('Supplier_Pw').equals(user.pass);
        return loggedUser;
    }catch(err){
        return 'error';
    }

}

const addSupplierDetails = async (addSupplier) => {
    try {
        const newSupplier = new supplierDetails(addSupplier);

        await newSupplier.save();

        return ('Supplier Added');

    }catch(err){
        console.log(err.message);
    }
}

const putSupplierDetails = async (upSupplier) => {
    try{
        const updateSupplier = await supplierDetails.findByIdAndUpdate(upSupplier._id, upSupplier, {new: true, runValidators: true});
        return (updateSupplier);
    
    }catch(err){
        console.log(err.message);
    }
}

const deleteSupplierDetails = async (delSupplier) => {
    try{
        const deleteSupplier = await supplierDetails.findByIdAndDelete(delSupplier);
        return (deleteSupplier);
    
    }catch(err){
        console.log(err.message);
    }
}

module.exports = {getSupplierDetails, getSupplierList, getLoggedUser, addSupplierDetails, putSupplierDetails, deleteSupplierDetails};

