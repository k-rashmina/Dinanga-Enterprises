const purchTransactionListService = require('../../services/finance/purchTransactionListService');

const getPurchTransactionList = async (req, res) => {

    res.json(await purchTransactionListService());

}

module.exports = getPurchTransactionList;