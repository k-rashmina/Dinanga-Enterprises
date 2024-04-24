const delPurchTransactionService = require('../../services/finance/delPurchTransactionService');


/**
 * Controller for deleting purchase transaction.
 * @param {*} req 
 * @param {*} res 
 */
const delPurchTransaction = async (req, res) => {

    try{
        const delTransactId = req.query.id;

        res.json(await delPurchTransactionService(delTransactId));

    }catch(e){
        console.log('Error occurred in delPurchTransaction: ', e);
        res.status(500).send('Error occurred');
    }
    
}

module.exports = delPurchTransaction;