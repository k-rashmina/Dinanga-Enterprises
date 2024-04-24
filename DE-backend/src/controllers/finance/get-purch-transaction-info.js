const getPurchTransactionService = require('../../services/finance/getPurchTransactionService');

/**
 * Controller mthod for get purchase transaction info by tx id.
 * @param {*} req 
 * @param {*} res 
 */
const getPurchTransactionInfo = async (req, res) => {

  try {
    const tid = req.query.tid;

    res.json(await getPurchTransactionService(tid));
  } catch (e) {
    console.log('Error occurred in getPurchTransactionInfo: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = getPurchTransactionInfo;