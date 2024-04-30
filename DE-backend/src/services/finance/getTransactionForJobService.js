const { getTransactionForJob } = require('../../data-access/finance/jobTransactiondb');

module.exports = async function getTransactionForJobService(jobid) {

  const transaction = await getTransactionForJob(jobid);

  return transaction;

}