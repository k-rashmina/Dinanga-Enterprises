const jobUpdateService = require("../../services/inventory/jobItemUpdateService");

const jobItemsUpdate = async (req, res) => {
    const jobID = req.body;
    await jobUpdateService(jobID);
    res.send("Job Items Updated");
}

module.exports = {jobItemsUpdate}