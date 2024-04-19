const orderDetails = require("../../models/orderDetails");

const createNewOrder = async (req, res) => {
    try {
      const order = req.body;

      console.log(order)
  
      const newOrder= new orderDetails(order);
      await newOrder.save();
      res.status(200).json(newOrder);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create order", error: err });
    }
  };

  module.exports = { createNewOrder};