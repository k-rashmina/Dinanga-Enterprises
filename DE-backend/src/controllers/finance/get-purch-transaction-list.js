const purchTransactionListService = require('../../services/finance/purchTransactionListService');

const getPurchTransactionList = async (req, res) => {

    const filter = {
        from: req.query.from,
        to: req.query.to,
        status: req.query.status,
        order: req.query.ref
      }

    res.json(await purchTransactionListService(filter));

}

module.exports = getPurchTransactionList;