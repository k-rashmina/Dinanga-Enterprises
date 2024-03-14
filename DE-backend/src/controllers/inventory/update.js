const inventoryDetails = require("../../models/inventoryDetails");

const updateInventoryItem = async (req, res) => {
    try {
      let objectid = req.params.id;
  
      const {
        itemNumber,
        itemName,
        quantity,
        reorderLevel,
        reorderState,
        availability,
      } = req.body;
  
      const updateStates = {
        itemNumber,
        itemName,
        quantity,
        reorderLevel,
        reorderState,
        availability,
      };
  
      const updatedItem = await inventoryDetails.findByIdAndUpdate(
        objectid,
        updateStates,
        { new: true }
      );
  
      updatedItem.updateReorderState();

      if (updatedItem) {
        res.status(200).json({ status: "Successfully Updated", updatedItem });
      } else {
        res.status(404).json({ message: "Inventory Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { updateInventoryItem};