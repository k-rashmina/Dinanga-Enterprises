const {
  getCompletedJob,
  reduceItems,
} = require("../../data-access/inventory/completedJobsDb");

const updateJobItem = async (jobId) => {
  let jobObject = await getCompletedJob(jobId);

  let item_list = jobObject.serviceType.item_list;

  console.log(item_list);

  Object.keys(item_list).forEach(async (key) => {
    const value = item_list[key];
    await reduceItems(value);
  });
};

module.exports = updateJobItem;
