const putJobTransactionService = require('../../services/finance/putJobTransactionService');

/**
 * Controller method for updating job transaction.
 * @param {*} req 
 * @param {*} res 
 */
const putJobTransaction = async (req, res) => {

  try {

    const upTransact = req.body;

    res.json(await putJobTransactionService(upTransact));

  } catch (e) {
    console.log('Error occurred in putJobTransaction: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = putJobTransaction;