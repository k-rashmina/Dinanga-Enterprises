const jobTransactionList = require('../../services/finance/jobTransactionListService');


const getJobTransactionList = async (req, res) => {

  const filter = req.body;
  res.json(await jobTransactionList(filter));


}

module.exports = getJobTransactionList;