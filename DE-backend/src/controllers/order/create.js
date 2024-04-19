const orderDetails = require("../../models/orderDetails");

const createNewOrder = async (req, res) => {
    try {
      const order = req.body;

  
      const newOrder= new orderDetails(order);
      await newOrder.save();
      const savedOrder = newOrder.toObject({getters: true})



      res.status(200).json(savedOrder);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create order", error: err });
    }
  };

  module.exports = { createNewOrder};