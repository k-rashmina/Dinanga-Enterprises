const {putPurchTransaction} = require('../../data-access/finance/purchTransactiondb');

module.exports = async function putPurchTransactionService(upTransact) {

    const updated = await putPurchTransaction(upTransact);
    return(updated);

}