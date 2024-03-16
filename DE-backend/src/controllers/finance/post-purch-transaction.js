const postPurchTransactionService = require('../../services/finance/postPurchTransactionService');

const postPurchTransaction = async (req, res) => {

    const transaction = req.body;

    res.json(await postPurchTransactionService(transaction));

}

module.exports = postPurchTransaction;