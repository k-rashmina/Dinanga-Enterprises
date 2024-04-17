const Inventory = require("../../models/inventoryDetails");

const searchItems = async (req, res) => {
    try {
        // Extract search query from request body
        const searchModel = req.params.name

        if (!searchModel) {
            return res.status(400).json({ message: 'Search query cannot be empty' });
        }
        
        const searchConditions = await Inventory.find({ 
                
                itemName: { $regex: new RegExp(searchModel, 'i') }
        })
        const searchResults = await Inventory.find({ $or: searchConditions });
        res.status(200).json({ searchResults });

    } catch (error) {
        // Handle the error here
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { searchItems };