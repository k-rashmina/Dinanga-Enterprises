const {addJobTransaction} = require('../../data-access/finance/jobTransactiondb');

module.exports = async function postJobTransactionService(details){
  
  const message = await addJobTransaction(details);

  return message;

}

