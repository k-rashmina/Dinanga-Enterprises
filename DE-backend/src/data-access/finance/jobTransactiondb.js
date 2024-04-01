const mongoose = require('mongoose');
const jobTransaction = require('../../models/Job-Transaction');
const counter = require('../../models/counter');


//Job Transaction database reading function
const getJobTransactionList = async (filter) => {

  //console.log(new Date(filter.from), new Date(`${filter.from}T00:00:00.000Z`))

  const filterTransact = async () => {

    if(filter.status && filter.job){

      return (await jobTransaction.find({
        'create_date': {
          $gt: new Date(`${filter.from}T00:00:00.000Z`),
          $lt: new Date(filter.to)
        }
      }).where('status').equals(filter.status).where('job').equals(filter.job))

    }
    else if(filter.status){

      return (await jobTransaction.find({
        'create_date': {
          $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
        }
      }).where('status').equals(filter.status))

    }
    else if(filter.job){

      return (await jobTransaction.find({
        'create_date': {
          $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
        }
      }).where('job_id').equals(filter.job))

    }
    else{

      return (await jobTransaction.find({
        'create_date': {
          $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
          $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
        }
      }))

    }

  }


  try{

    const jobTransactionList = filterTransact();

      // .fromdate(filter.from)
      // .todate(filter.to)
      // .byjob(filter.job)
      // .bystatus(filter.status)

    return(jobTransactionList);

  }catch(err){

    //console.log(err.message);

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