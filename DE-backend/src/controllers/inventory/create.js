const inventoryDetails = require("../../models/inventoryDetails");
const counter = require("../../models/counter");

const createInventoryItem = async (req, res) => {
    try {

      let DECounter = await counter.findOneAndUpdate({'table': 'inventory'}, {$inc: {'count': 1}}, {new: true})

      const {
        itemName,
        brand,
        quantity,
        reorderLevel,
        reorderState,
        itemPrice,
        availability,
      } = req.body;
  
      const newItem = new inventoryDetails({
        itemName,
        brand,
        quantity,
        reorderLevel,
        itemPrice,
        reorderState,
        availability,
      });

      newItem.itemNumber = `DE${DECounter.count}`;

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