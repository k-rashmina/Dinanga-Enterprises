const mongoose = require('mongoose');
const purchTransaction = require('../../models/Purch-Transaction');
const counter = require('../../models/counter');


//Purchase Transaction database reading function
const getPurchTransactionList = async (filter) => {

  try{

    if(filter.status && filter.order){

      return (await purchTransaction.find({
      'create_date': {
          $gte: new Date(`${filter.from}T00:00:00.000Z`),
          $lt: new Date(filter.to)
      }
      }).where('status').equals(filter.status).where('order_id').equals(filter.order))

    }
    else if(filter.status){

      return (await purchTransaction.find({
      'create_date': {
          $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
      }
      }).where('status').equals(filter.status))

    }
    else if(filter.order){

      return (await purchTransaction.find({
      'create_date': {
          $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
      }
      }).where('order_id').equals(filter.order))

    }
    else{

      return (await purchTransaction.find({
      'create_date': {
          $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
      }
      }))

    }

  }catch(err){

  //console.log(err.message);

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