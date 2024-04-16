const {putJobTransaction} = require('../../data-access/finance/jobTransactiondb');

module.exports = async function putJobTransactionService(upTransact) {

  const updated = await putJobTransaction(upTransact);

  return updated;
}