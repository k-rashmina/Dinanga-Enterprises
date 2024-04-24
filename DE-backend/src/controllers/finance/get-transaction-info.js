const getTransactionService = require('../../services/finance/getTransactionService');

/**
 * Controller method for get job transaction info by tx id.
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionInfo = async (req, res) => {

  try {

    const tid = req.query.tid;

    res.json(await getTransactionService(tid));

  } catch (e) {
    console.log('Error occurred in getTransactionInfo: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = getTransactionInfo;