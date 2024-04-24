const {getJobTransactionList} = require('../../data-access/finance/jobTransactiondb');

module.exports = async function jobTransactionListService(filter) {

  try{
    const JTList = await getJobTransactionList(filter);
    console.log('JTList: ', JTList)
    return JTList;
  }catch(e){
    console.log('Error occurred in jobTransactionListService: ', e)
  }
  
}

