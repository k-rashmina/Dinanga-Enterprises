const putPurchTransactionService = require('../../services/finance/putPurchTransactionService');

/**
 * Controller method for updating purchase transaction.
 * @param {*} req 
 * @param {*} res 
 */
const putPurchTransaction = async (req, res) => {

    try{
        const upTransact = req.body;

        res.json(await putPurchTransactionService(upTransact));

    }catch(e){
        console.log('Error occurred in putPurchTransaction: ', e);
        res.status(500).send('Error occurred');
    }
   
}

module.exports = putPurchTransaction;