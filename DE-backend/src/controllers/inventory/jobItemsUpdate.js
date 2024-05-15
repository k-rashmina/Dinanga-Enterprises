const jobUpdateService = require("../../services/inventory/jobItemUpdateService");

const jobItemsUpdate = async (req, res) => {
    try{
        const jobID = req.query.jid;
        const message = await jobUpdateService(jobID);
        console.log(message)
        if(message == 'error'){
            res.status(500).json({ message: err });
        }else{
            res.send("Job Items Updated")
        }
        
    }catch(err){
        res.status(500).json({ message: err });
    }
}

module.exports = {jobItemsUpdate}