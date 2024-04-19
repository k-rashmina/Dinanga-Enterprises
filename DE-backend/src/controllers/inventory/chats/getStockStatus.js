const express = require('express');
const router = express.Router();
const InventoryDetails = require('./../../../models/inventoryDetails');

// Route to get the count of items based on reorder state
const getStockStatus =  async (req, res) => {
  try {
    const itemCounts = await InventoryDetails.aggregate([
      {
        $group: {
          _id: '$reorderState',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the response
    const counts = {};
    itemCounts.forEach(item => {
      counts[item._id] = item.count;
    });
    res.json(counts);
      } catch (error) {
    console.error('Error fetching item counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to return the count of items based on reorder state for report
const fetchStockStatus = async () => {
  try {
    const itemCounts = await InventoryDetails.aggregate([
      {
        $group: {
          _id: '$reorderState',
          count: { $sum: 1 }
        }
      }
    ]);

    // Format the response
    const counts = {};
    itemCounts.forEach(item => {
      counts[item._id] = item.count;
    });
    return counts;
  } catch (error) {
    console.error('Error fetching item counts:', error);
    throw error;
  }
};

module.exports = {getStockStatus , fetchStockStatus}
