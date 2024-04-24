const {getJobTransactionList} = require('../../data-access/finance/jobTransactiondb');

module.exports = async function jobTransactionListService(filter) {

  try{
    const JTList = await getJobTransactionList(filter);
    // console.log('JTList: ', JTList)
    const tList = JTList.filter(transact => {
      console.log('dsd')
      if(transact.ref_id != null){
        return true
      }
      return false;

    })
    return tList;
  }catch(e){
    console.log('Error occurred in jobTransactionListService: ', e)
  }
  
}

