const delPurchTransactionService = require('../../services/finance/delPurchTransactionService');


const delPurchTransaction = async (req, res) => {

    const delTransactId = req.body.id;

    res.json(await delPurchTransactionService(delTransactId));

}

module.exports = delPurchTransaction;