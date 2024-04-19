const Inventory = require("../../models/inventoryDetails");

const consumedItems =  async (req, res) => {
    try {
      // Extract consumed items from request body
      let consumedItems = req.body.consumedItems;

      if (!Array.isArray(consumedItems)) {
         consumedItems = [consumedItems];
      }
  
      // Update inventory for each consumed item
      for (const consumedItem of consumedItems) {
        // Find the inventory item by item name
        const inventoryItem = await Inventory.findOne({ itemName: { $regex: new RegExp(consumedItem.itemName, 'i') } });

        if (!inventoryItem) {
          return res.status(404).json({ message: `Inventory item with name ${consumedItem.itemName} not found` });
        }
  
        // Check if there's enough quantity in inventory
        if (inventoryItem.quantity < 1) {
          return res.status(400).json({ message: `Not enough quantity available for item ${consumedItem.itemName}` });
        }
  
        // Update inventory quantity
        inventoryItem.quantity -= 1;

        // Update reorder state
        inventoryItem.updateReorderState();
  
        // Save updated inventory item
        await inventoryItem.save();
      }
  
      // Send success response
      res.status(200).json({ message: 'Inventory updated successfully' });
    } catch (error) {
      console.error('Error updating inventory:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports = { consumedItems};




