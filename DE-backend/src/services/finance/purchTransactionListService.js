const {getPurchTransactionList} = require('../../data-access/finance/purchTransactiondb');

module.exports = async function purchTransactionListService(filter) {

    const PTList = await getPurchTransactionList(filter);

    return PTList;

}