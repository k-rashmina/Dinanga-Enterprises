const getJobServicesService = require('../../services/job/getJobServicesService');

const getJobService = async (req, res) => {

  res.json(await getJobServicesService());

}

module.exports = getJobService;