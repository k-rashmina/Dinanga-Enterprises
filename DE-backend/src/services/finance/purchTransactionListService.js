const {getPurchTransactionList} = require('../../data-access/finance/purchTransactiondb');

module.exports = async function purchTransactionListService(filter) {

    const PTList = await getPurchTransactionList(filter);

    const tList = PTList.filter(transact => {
        console.log('dsd')
        if(transact.order_id != null){
          return true
        }
        return false;
  
      })

    return tList;

}