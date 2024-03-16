const mongoose = require('mongoose');
const jobTransaction = require('../../models/Job-Transaction');
const counter = require('../../models/counter');


//Job Transaction database reading function
const getJobTransactionList = async () => {


  // const filter = {
  //   from: '2024/03/01',
  //   to: '2024/03/16',
  //   job: '65f1c1f7d0bab2e4fa815856',
  //   status: 'pending'
  // }



  try{

    const jobTransactionList =  await jobTransaction.find();
      // .fromdate(filter.from)
      // .todate(filter.to)
      // .byjob(filter.job)
      // .bystatus(filter.status)

    return(jobTransactionList);

  }catch(err){

    console.log(err.message);

  }
  
}

// const getJTCount = async () => {

//   return new Promise((resolve, reject) => {

//     try{

//       const count = 

//     }catch(err){
//       reject(err);
//     }

//   })

// }



//Job Transaction database creating function
const addJobTransaction = async (newTransact) => {

  try{

    let JTCounter = await counter.findOneAndUpdate({'table': 'job transaction'}, {$inc: {'count': 1}}, {new: true})
    // console.log(JTCounter);

    const newTransaction = new jobTransaction(newTransact);
    newTransaction.transact_no = `JT${JTCounter.count}`

    await newTransaction.save();

    return('Transaction Added');

  }catch(err){

    console.log(err.message);

  }

}



//Job Transaction database updating function
const putJobTransaction = async (upTransact) => {

  try{

    const Updated = await jobTransaction.findByIdAndUpdate(upTransact._id, upTransact, {new: true, runValidators: true});
    return(Updated);

  }catch(err){

    console.log(err.message);

  }

}



//Job Transaction database deleting function
const deleteJobTransaction = async (delTransactID) => {
  console.log(delTransactID);

  try{ 

    const delTransaction = await jobTransaction.findByIdAndDelete(delTransactID);
    return(delTransaction);

  }catch(err){

    console.log(err.message);

  }

}



module.exports = {getJobTransactionList, addJobTransaction, putJobTransaction, deleteJobTransaction}