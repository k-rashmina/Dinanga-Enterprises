const {deleteJobTransaction} = require('../../data-access/finance/jobTransactiondb');
const addRefundAndReversal = require('../../data-access/finance/refunAndReversaldb');

module.exports = async function delJobTransactionService(delTransactID) {

  const deleted = await deleteJobTransaction(delTransactID);

  refRev = {
    transact_type: 'Job Transaction',
    reason: 'refund',
    transaction: deleted
  }

  const message = await addRefundAndReversal(refRev);

  return message;
}