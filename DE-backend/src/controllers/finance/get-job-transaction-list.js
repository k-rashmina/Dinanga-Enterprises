const jobTransactionList = require('../../services/finance/jobTransactionListService');


const getJobTransactionList = async (req, res) => {

  res.json(await jobTransactionList());


}

module.exports = getJobTransactionList;