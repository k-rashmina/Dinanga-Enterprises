
const express = require('express');
const router = express.Router();
const InventoryDetails = require('./../../../models/inventoryDetails'); 


const getStockValue =  async (req, res) => {
  try {
   
    const inventory = await InventoryDetails.find();

    // Prepare data for response (item name and stock price)
    const data = inventory.map(item => ({
      itemName: item.itemName,
      stockPrice: item.itemPrice * item.quantity,
      quantity: item.quantity
    }));

    
    res.json(data);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {getStockValue};
