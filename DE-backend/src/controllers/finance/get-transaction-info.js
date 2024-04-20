const getTransactionService = require('../../services/finance/getTransactionService');

const getTransactionInfo = async (req, res) => {

  const tid = req.query.tid;

  res.json(await getTransactionService(tid));

}

module.exports = getTransactionInfo;