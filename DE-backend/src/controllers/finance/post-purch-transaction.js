const postPurchTransactionService = require('../../services/finance/postPurchTransactionService');

/**
 * Controller method for creating new purchase transaction.
 * @param {*} req 
 * @param {*} res 
 */
const postPurchTransaction = async (req, res) => {

    try{
        const transaction = {
            status: req.body.status,
            amount: req.body.amount,
            order_id: req.body.order_id,
            desc: req.body.desc,
            create_date: req.body.create_date,
            update_date: req.body.update_date
        };
    
        console.log(transaction)
    
        res.json(await postPurchTransactionService(transaction));

    }catch(e){
        console.log('Error occurred in postPurchTransaction: ', e);
        res.status(500).send('Error occurred');
    }

}

module.exports = postPurchTransaction;