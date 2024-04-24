const { getJobTransaction } = require('../../data-access/finance/jobTransactiondb');

module.exports = async function getTransactionService(tid) {

  const transaction = await getJobTransaction(tid);

  return transaction;

}