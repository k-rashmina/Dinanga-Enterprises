const postJobTransactionService = require('../../services/finance/postJobTransactionService');

const postJobTransaction = async (req, res) => {

  const details = {
    status: req.body.status,
    amount: req.body.amount,
    job_id: req.body.referType,
    desc: req.body.desc,
    create_date: req.body.create_date,
    update_date: req.body.update_date
};

  res.json(await postJobTransactionService(details));

}

module.exports = postJobTransaction;
