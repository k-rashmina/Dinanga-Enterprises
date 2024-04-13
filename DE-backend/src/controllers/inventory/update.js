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
        itemPrice,
        availability,
      } = req.body;
  

      // Fetch the current item
    const currentItem = await inventoryDetails.findById(objectid);
    if (!currentItem) {
      return res.status(404).json({ message: "Inventory Item not found" });
    }
  

        // Set the previousQuantity field to the current quantity
    const previousQuantity = currentItem.quantity;

      const updateStates = {
        itemNumber,
        itemName,
        quantity,
        previousQuantity,
        reorderLevel,
        reorderState,
        itemPrice,
        availability,
      };
      

      const updatedItem = await inventoryDetails.findByIdAndUpdate(
        objectid,
        updateStates,
        { new: true }
      );

      if (updatedItem) {
        updatedItem.updateReorderState();
        await updatedItem.save();
        
        res.status(200).json({ status: "Successfully Updated", updatedItem });
      } else {
        res.status(404).json({ message: "Inventory Item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { updateInventoryItem};