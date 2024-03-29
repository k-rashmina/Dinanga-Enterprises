const {getJobTransactionList} = require('../../data-access/finance/jobTransactiondb');

module.exports =  async function jobTransactionListService(filter) {

  const JTList = await getJobTransactionList(filter);
  return JTList

}

