const orderDetails = require("../../models/orderDetails");
const counter = require('../../models/counter');

const createNewOrder = async (req, res) => {
    try {
      const order = req.body;

      let ORCounter = await counter.findOneAndUpdate({'table': 'orders'}, {$inc: {'count': 1}}, {new: true})
      
      console.log(ORCounter)

      const newOrder= new orderDetails(order);
      newOrder.order_number = `OR${ORCounter.count}`

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