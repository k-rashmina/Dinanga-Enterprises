const postPurchTransactionService = require('../../services/finance/postPurchTransactionService');

const postPurchTransaction = async (req, res) => {

    const transaction = {
        status: req.body.status,
        amount: req.body.amount,
        order_id: req.body.ref_id,
        desc: req.body.desc,
        create_date: req.body.create_date,
        update_date: req.body.update_date
    };

    res.json(await postPurchTransactionService(transaction));

}

module.exports = postPurchTransaction;