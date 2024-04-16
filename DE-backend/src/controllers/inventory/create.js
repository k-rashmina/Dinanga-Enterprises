const inventoryDetails = require("../../models/inventoryDetails");

const createInventoryItem = async (req, res) => {
    try {
      const {
        itemNumber,
        itemName,
        quantity,
        reorderLevel,
        reorderState,
        itemPrice,
        availability,
      } = req.body;
  
      const newItem = new inventoryDetails({
        itemNumber,
        itemName,
        quantity,
        reorderLevel,
        itemPrice,
        reorderState,
        availability,
      });

      newItem.updateReorderState();
      
      await newItem.save();

      res.status(201).json(newItem);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create inventory item", error: err });
    }
  };

  module.exports = { createInventoryItem};