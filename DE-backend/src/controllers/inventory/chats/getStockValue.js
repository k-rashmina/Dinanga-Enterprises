
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

// Function to return the stock value for report
const returnStockValue = async () => {
  try {
    const inventory = await InventoryDetails.find();

    // Prepare data for response (item name and stock price)
    const data = inventory.map(item => ({
      itemName: item.itemName,
      stockPrice: item.itemPrice * item.quantity,
      quantity: item.quantity
    }));
    const stockValue = data.reduce((total, item) => total + item.stockPrice, 0);
    console.log(stockValue);
    return stockValue;
    
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

module.exports = {getStockValue , returnStockValue};
