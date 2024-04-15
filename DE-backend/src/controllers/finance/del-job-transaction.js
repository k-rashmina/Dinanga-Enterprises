const delJobTransactionService = require('../../services/finance/delJobTransactionService');

const delJobTransaction = async (req, res) => {

  const delTransactID = req.body.id;

  res.json(await delJobTransactionService(delTransactID));

}

module.exports = delJobTransaction;