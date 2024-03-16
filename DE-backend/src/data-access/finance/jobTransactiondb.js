const mongoose = require('mongoose');
const jobTransaction = require('../../models/Job-Transaction');


const getJobTransactionList = async () => {


  // const filter = {
  //   from: '2024/03/01',
  //   to: '2024/03/16',
  //   job: '65f1c1f7d0bab2e4fa815856',
  //   status: 'pending'
  // }

  return new Promise((resolve, reject) => {

    try{
      const jobTransactionList =  jobTransaction.find();
        // .fromdate(filter.from)
        // .todate(filter.to)
        // .byjob(filter.job)
        // .bystatus(filter.status)

      resolve(jobTransactionList);

    }catch(err){
      reject(err.message);
    }
    
  })

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

const addJobTransaction = async (newTransact) => {

  return new Promise((resolve, reject) => {

    try{

      const newTransaction = new jobTransaction(newTransact);
      newTransaction.save();

      resolve('Transaction Added');

    }catch(err){

      reject(err.message);

    }

  })

}


const putJobTransaction = async (upTransact) => {
  return new Promise((resolve, reject) => {

    try{

      const Updated = jobTransaction.findByIdAndUpdate(upTransact._id, upTransact, {new: true, runValidators: true});
      resolve(Updated);

    }catch(err){
      reject(err.message);
    }

  })

}


const deleteJobTransaction = async (delTransactID) => {
  console.log(delTransactID);
  return new Promise((resolve, reject) => {

     try{ 
      const delTransaction = jobTransaction.findByIdAndDelete(delTransactID);
      resolve(delTransaction);
    }catch(err){
      reject(err.message);
    }

  })

}



module.exports = {getJobTransactionList, addJobTransaction, putJobTransaction, deleteJobTransaction}