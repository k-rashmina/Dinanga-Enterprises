const orderDetails = require("../../models/orderDetails")


const getOrderStatus = async(req,res)=>{
    try{
        const orderStatus = await orderDetails.find({ orderstatus: { $in: ['accepted', 'rejected'] } });
        res.status(200).json(orderStatus);
    }catch (error) {
        res.status(500).json({ message: 'Error orderStatus', error: error.message });
        console.log(error);
      }
}

module.exports = {getOrderStatus}