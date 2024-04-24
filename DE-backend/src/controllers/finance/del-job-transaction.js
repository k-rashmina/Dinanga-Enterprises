const delJobTransactionService = require('../../services/finance/delJobTransactionService');

/**
 * Controller for deleting job transaction.
 * @param {*} req 
 * @param {*} res 
 */
const delJobTransaction = async (req, res) => {

  try {
    const delTransactID = req.query.tid;

    res.json(await delJobTransactionService(delTransactID));

  } catch (e) {
    console.log('Error occurred in delJobTransaction: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = delJobTransaction;