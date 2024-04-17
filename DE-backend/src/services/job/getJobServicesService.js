const getJobServicesList = require('../../data-access/job/jobServicesdb');

module.exports = async function getJobServicesService() {

  const ServiceList = await getJobServicesList();
  return ServiceList;

}