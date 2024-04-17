const postJobTransactionService = require('../../services/finance/postJobTransactionService');

const postJobTransaction = async (req, res) => {

  const details = req.body;

  res.json(await postJobTransactionService(details));

}

module.exports = postJobTransaction;
