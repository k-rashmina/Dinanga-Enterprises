const {getPurchTransactionList} = require('../../data-access/finance/purchTransactiondb');

module.exports = async function purchTransactionListService() {

    const PTList = await getPurchTransactionList();

    return(PTList);

}