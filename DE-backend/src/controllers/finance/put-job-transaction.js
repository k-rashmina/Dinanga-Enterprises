const putJobTransactionService = require('../../services/finance/putJobTransactionService');

const putJobTransaction = async (req, res) => {

  const upTransact = req.body;

  res.json(await putJobTransactionService(upTransact));

}

module.exports = putJobTransaction;