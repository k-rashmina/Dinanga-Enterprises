const {deleteJobTransaction} = require('../../data-access/finance/jobTransactiondb');

module.exports = async function delJobTransactionService(delTransactID) {

  const message = await deleteJobTransaction(delTransactID);

  return message;
}