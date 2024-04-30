const postJobTransactionService = require('../../services/finance/postJobTransactionService');

/**
 * Controller method for creating new job transaction.
 * @param {*} req 
 * @param {*} res 
 */
const postJobTransaction = async (req, res) => {

  try{

    const details = req.body;

    res.json(await postJobTransactionService(details));

  }catch(e){
    console.log('Error occurred in postJobTransaction: ', e);
    res.status(500).send('Error occurred');
  }
  
}

module.exports = postJobTransaction;
