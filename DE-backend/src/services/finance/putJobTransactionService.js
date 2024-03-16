const {putJobTransaction} = require('../../data-access/finance/jobTransactiondb');

module.exports = async function putJobTransactionService(upTransact) {

  const message = await putJobTransaction(upTransact);

  return message;
}