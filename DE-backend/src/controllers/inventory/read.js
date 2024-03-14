const inventoryDetails = require("../../models/inventoryDetails");

const getAllItems = async (req, res) => {
    try {
      const inventoryItems = await inventoryDetails.find();
      res.status(200).json(inventoryItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };


 module.exports = { getAllItems}; 