const {addPurchTransaction} = require('../../data-access/finance/purchTransactiondb');

module.exports = async function postPurchTransactionService(transaction) {

    const message = await addPurchTransaction(transaction);

    return message;

}