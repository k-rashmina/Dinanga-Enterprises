const jobTransactionList = require('../../services/finance/jobTransactionListService');


const getJobTransactionList = async (req, res) => {

  const filter = {
    from: req.query.from,
    to: req.query.to,
    status: req.query.status,
    job: req.query.email
  } 
  res.json(await jobTransactionList(filter));


}

module.exports = getJobTransactionList;