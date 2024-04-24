const mongoose = require('mongoose');
const jobTransaction = require('../../models/Job-Transaction');
const counter = require('../../models/counter');


//Job Transaction reading function
const getJobTransactionList = async (filter) => {

  //console.log(new Date(filter.from), new Date(`${filter.from}T00:00:00.000Z`))

  try{
    if(filter.t_type){

      if(filter.status && filter.job){
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(`${filter.from}T00:00:00.000Z`),
            $lt: new Date(filter.to)
          }
        }).where('transact_type').equals(filter.t_type).where('status').equals(filter.status).where('ref_id').equals(filter.job).populate('ref_id'))
  
      }
      else if(filter.status){
  
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
            $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
          }
        }).where('transact_type').equals(filter.t_type).where('status').equals(filter.status).populate('ref_id'))
  
      }
      else if(filter.job){
  
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
            $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
          }
        }).where('transact_type').equals(filter.t_type).where('ref_id').equals(filter.job).populate('ref_id'))
  
      }
      else{
  
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
            $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
          }
        }).where('transact_type').equals(filter.t_type).populate('ref_id'))
  
      }
    }
    else{

      console.log('elseee')
      if(filter.status && filter.job){
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(`${filter.from}T00:00:00.000Z`),
            $lt: new Date(filter.to)
          }
        }).where('status').equals(filter.status).where('ref_id').equals(filter.job).populate('ref_id'))
  
      }
      else if(filter.status){
  
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
            $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
          }
        }).where('status').equals(filter.status).populate('ref_id'))
  
      }
      else if(filter.job){
  
        console.log('filter eseee iff job')
        return (await jobTransaction.find({
          'create_date': {
            $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
            $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
          }
        }).where('ref_id').equals(filter.job).populate('ref_id'))
  
      }
      else{

        return(await jobTransaction.find({
          'create_date': {
            $gte: new Date(new Date(filter.from).setHours(0o0, 0o0, 0o0)),
            $lt: new Date(new Date(filter.to).setHours(23, 59, 59))
          }
        }).populate('ref_id').exec())
      }
    }

  }catch(err){

    console.log(`Error occured in getJobTransactionList:  ${err}`);

  }
  
}



//Single Job Trnasction Reading Function
const getJobTransaction = async (tid) => {

  try{

    return (await jobTransaction.findById(tid).populate('ref_id').exec())

  }catch(err){

    return('failed')

  }

}





//Job Transaction creating function
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



//Job Transaction updating function
const putJobTransaction = async (upTransact) => {

  try{

    const Updated = await jobTransaction.findByIdAndUpdate(upTransact._id, upTransact, {new: true, runValidators: true});
    return(Updated);

  }catch(err){

    console.log(err.message);

  }

}



//Job Transaction deleting function
const deleteJobTransaction = async (delTransactID) => {
  console.log(delTransactID);

  try{ 

    const delTransaction = await jobTransaction.findByIdAndDelete(delTransactID);
    return(delTransaction);

  }catch(err){

    console.log(err.message);

  }

}



module.exports = {getJobTransactionList, getJobTransaction, addJobTransaction, putJobTransaction, deleteJobTransaction}