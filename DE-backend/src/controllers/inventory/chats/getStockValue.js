
const express = require('express');
const router = express.Router();
const InventoryDetails = require('./../../../models/inventoryDetails'); 


const getStockValue = async (req, res) => {
  try {
    // Calculate the date one week ago from today
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Find inventory items created within the last week
    const inventory = await InventoryDetails.find({ createdAt: { $gte: oneWeekAgo } });

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


const displayStockValue = async (req, res) => {
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

    // Send the stock value as a JSON response
    res.json({ stockValue });
    
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ error: 'Error fetching inventory' });
  }
};

module.exports = {getStockValue , returnStockValue , displayStockValue};
