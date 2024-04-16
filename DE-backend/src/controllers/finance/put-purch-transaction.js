const putPurchTransactionService = require('../../services/finance/putPurchTransactionService');

const putPurchTransaction = async (req, res) => {

    const upTransact = req.body;

    res.json(await putPurchTransactionService(upTransact));

}

module.exports = putPurchTransaction;