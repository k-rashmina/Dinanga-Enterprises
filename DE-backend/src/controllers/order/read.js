  const orderDetails = require("../../models/orderDetails");

  const getOrderDetails = async (req, res) => {
      try {
        const orders = await orderDetails.find();
        res.status(200).json(orders);
      } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
      }
    };


  module.exports = { getOrderDetails}; 