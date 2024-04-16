const mongoose = require('mongoose');
const refundAndReversal = require('../../models/refund-and-reversal');


const getRefundReversalList = async () => {

    try{

        const refRevList = await refundAndReversal.find();

        return(refRevList);

    }catch(err){

        console.log(err.message);

    }

}

const addRefundAndReversal = async (refRev) => {

   try{

    const newRefundReversal = new refundAndReversal(refRev);
    await newRefundReversal.save();

    return('success');

    }catch(err){

        console.log(err.message);

    }

}

module.exports = {addRefundAndReversal, getRefundReversalList};