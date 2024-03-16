const delPurchTransactionService = require('../../services/finance/delPurchTransactionService');


const delPurchTransaction = async (req, res) => {

    const delTransactId = req.body._id;

    res.json(await delPurchTransactionService(delTransactId));

}

module.exports = delPurchTransaction;