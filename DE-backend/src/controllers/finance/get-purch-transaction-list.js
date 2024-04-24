const purchTransactionListService = require('../../services/finance/purchTransactionListService');

/**
 * Contrller method for get purchase transaction list.
 * @param {*} req 
 * @param {*} res 
 */
const getPurchTransactionList = async (req, res) => {

  try{

    const filter = {
      from: req.query.from,
      to: req.query.to,
      status: req.query.status,
      order: req.query.ref
    }

  res.json(await purchTransactionListService(filter));

  }catch(e){
    console.log('Error occurred in getPurchTransactionList: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = getPurchTransactionList;