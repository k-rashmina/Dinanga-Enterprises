const orderDetails = require("../../models/orderDetails");

const getSupOrders = async (req, res) => {

    try{

        const supid = req.query.supid;
        
        res.json(await orderDetails.find({'supplierName': supid}))

    }catch(err){

        res.status(500).json({ message: error.message });
        console.log(error);

    }

}

module.exports = getSupOrders;