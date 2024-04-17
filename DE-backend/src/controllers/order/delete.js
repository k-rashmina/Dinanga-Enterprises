const orderDetails = require("../../models/orderDetails");

const deleteNewOrder = async (req, res) => {
    try {
      const objectid = req.params.id; 
  
      const deletedOrder = await orderDetails.findByIdAndDelete(objectid);
  
      if (deletedOrder) {
        res.status(200).json({ message: "Order Successfully deleted", deletedOrder});
      } else {
        res.status(404).json({ message: "Delete order Failed" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { deleteNewOrder};