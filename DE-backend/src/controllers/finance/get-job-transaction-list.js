const jobTransactionList = require('../../services/finance/jobTransactionListService');


const getJobTransactionList = async (req, res) => {

  const filter = {
    from: req.query.from,
    to: req.query.to,
    status: req.query.status,
    job: req.query.email,
    t_type: req.query.t_type
  } 
  res.json(await jobTransactionList(filter));


}

module.exports = getJobTransactionList;