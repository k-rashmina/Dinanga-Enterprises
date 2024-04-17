const orderDetails = require("../../models/orderDetails");

const createNewOrder = async (req, res) => {
    try {
      const {
       itemName,
       itemNumber,
       quantity,
       dateOfOrder,
       companyAddress,
       supplierName,
       comments,
      } = req.body;
  
      const newOrder= new orderDetails({
        itemName,
        itemNumber,
        quantity,
        dateOfOrder,
        companyAddress,
        supplierName,
        comments,
      });
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create order", error: err });
    }
  };

  module.exports = { createNewOrder};