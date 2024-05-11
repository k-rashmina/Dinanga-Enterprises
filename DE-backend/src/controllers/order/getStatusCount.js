const orderDetails = require("../../models/orderDetails")


const getStatusCount = async(req,res)=>{
    try{
        const statusCount = await orderDetails.aggregate([
            { $group: { _id: "$orderstatus", count: { $sum: 1 } } }
        ]);
        res.status(200).json(statusCount);
    }catch (error) {
        res.status(500).json({ message: 'Error retrieving status count', error: error.message });
        console.log(error);
      }
}

module.exports = {getStatusCount}