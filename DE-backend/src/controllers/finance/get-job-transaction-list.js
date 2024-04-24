const jobTransactionList = require('../../services/finance/jobTransactionListService');

/**
 * Controller method for get job transaction list.
 * @param {*} req 
 * @param {*} res 
 */
const getJobTransactionList = async (req, res) => {

  try{
    const filter = {
      from: req.query.from,
      to: req.query.to,
      status: req.query.status,
      job: req.query.ref,
      t_type: req.query.t_type
    } 
    res.json(await jobTransactionList(filter));
  }catch(e){
    console.log('Error occurred in getJobTransactionList: ', e);
    res.status(500).send('Error occurred');
  }
}

module.exports = getJobTransactionList;