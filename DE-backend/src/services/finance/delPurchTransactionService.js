const {deletePurchtransaction} = require('../../data-access/finance/purchTransactiondb');
const {addRefundAndReversal} = require('../../data-access/finance/refunAndReversaldb');

module.exports = async function delPurchTransactionService(delTransactId) {

    const deleted = await deletePurchtransaction(delTransactId);

    refRev = {
        transact_type: 'Purchase Transaction',
        reason: 'refund',
        transaction: deleted
      }
    
    const message = await addRefundAndReversal(refRev);

    return(message);

}