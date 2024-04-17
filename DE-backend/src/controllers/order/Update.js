const orderDetails = require("../../models/orderDetails");

const updateNewOrder = async (req, res) => {
    try {
      let objectid = req.params.id;
  
      const {
        itemName,
        itemNumber,
        quantity,
        dateOfOrder,
        companyAddress,
        supplierName,
        comments,
      } = req.body;
  
      const updateStates = {
       itemName,
       itemNumber,
       quantity,
       dateOfOrder,
       companyAddress,
       supplierName,
       comments,
      };
  
      const updatedOrder= await orderDetails.findByIdAndUpdate(
        objectid,
        updateStates,
        { new: true }
      );
  
      if (updatedOrder) {
        await updatedOrder.save();
        res.status(200).json({ status: "Successfully Updated", updatedOrder });
      } else {
        res.status(404).json({ message: "Update Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { updateNewOrder};