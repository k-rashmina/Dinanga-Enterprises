const mongoose = require('mongoose');
const purchTransaction = require('../../models/Purch-Transaction');
const counter = require('../../models/counter');


//Purchase Transaction database reading function
const getPurchTransactionList = async () => {

    try{

        const purchTransactionList = await purchTransaction.find();

        return(purchTransactionList);

    }catch(err){
        console.log(err.message);
    }

}



//Purchase Transaction database reading function
const addPurchTransaction = async (transaction) => {

    try{

        let PTCounter = await counter.findOneAndUpdate({'table': 'purchase transaction'}, {$inc: {'count': 1}}, {new: true})
        // console.log(PTCounter);
        const newTransaction = new purchTransaction(transaction);
        newTransaction.transact_no = `PT${PTCounter.count}`

        await newTransaction.save();

        return('Transaction added');

    }catch(err){
        console.log(err.message);
    }

}



//Purchase Transaction database reading function
const putPurchTransaction = async (upTransact) => {

    try{

        const updated = await purchTransaction.findByIdAndUpdate(upTransact._id, upTransact, {new: true, runValidators: true});
        return(updated);

    }catch(err){

        console.log(err.message)

    }

}



//Purchase Transaction database reading function
const deletePurchtransaction = async (delTransactId) => {

    try{

        const delTransact = await purchTransaction.findByIdAndDelete(delTransactId);
        return(delTransact);

    }catch(err){

        console.log(err.message);

    }

}

module.exports = {addPurchTransaction, getPurchTransactionList, putPurchTransaction, deletePurchtransaction};