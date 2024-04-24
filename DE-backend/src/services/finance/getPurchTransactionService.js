const { getPurchTransaction } = require('../../data-access/finance/purchTransactiondb');

module.exports = async function getPurchTransactionService(tid) {

  const transaction = await getPurchTransaction(tid);

  return transaction;

}