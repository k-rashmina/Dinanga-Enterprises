const inventoryDetails = require("../../models/inventoryDetails");

const deleteInventoryItem = async (req, res) => {
    try {
      const objectid = req.params.id; 
  
      const deletedItem = await inventoryDetails.findByIdAndDelete(objectid);
  
      if (deletedItem) {
        res.status(200).json({ message: "Successfully deleted", deletedItem });
      } else {
        res.status(404).json({ message: "Inventory item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = { deleteInventoryItem};