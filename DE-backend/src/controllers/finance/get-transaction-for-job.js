const  getTransactionForJobService = require('../../services/finance/getTransactionForJobService');

/**
 * Controller method for get job transaction info by job id.
 * @param {*} req 
 * @param {*} res 
 */
const getTransactionForJob = async (req, res) => {

  try {

    const jobid = req.query.jobid;

    res.json(await getTransactionForJobService(jobid));

  } catch (e) {
    console.log('Error occurred in getTransactionForJob: ', e);
    res.status(500).send('Error occurred');
  }

}

module.exports = getTransactionForJob;