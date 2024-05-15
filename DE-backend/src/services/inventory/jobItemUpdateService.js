const {
  getCompletedJob,
  reduceItems,
  checkItemAvailability
} = require("../../data-access/inventory/completedJobsDb");

const updateJobItem = async (jobId) => {


  try{    

    let jobObject = await getCompletedJob(jobId);

    let item_list = jobObject.serviceType.item_list;

    // console.log(item_list);

    if(await checkItemAvailability(item_list)){

      Object.keys(item_list).forEach(async (key) => {
        const value = item_list[key];
        const upItem = await reduceItems(value);
      });

    }else{

      return 'error';

    }

  }catch(err){

    return err

  }
};

module.exports = updateJobItem;
