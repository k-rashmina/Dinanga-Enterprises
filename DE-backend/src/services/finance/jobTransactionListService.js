const {getJobTransactionList} = require('../../data-access/finance/jobTransactiondb');

module.exports =  async function jobTransactionListService() {

  const JTList = await getJobTransactionList();
  return JTList

}

