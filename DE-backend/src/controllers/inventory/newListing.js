const express = require('express');
const router = express.Router();
const InventoryDetails = require('./../../models/inventoryDetails');

const weeklyListings = async (req, res) => {
    // Get the date for one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        // Find items that were created within the last week
        const report = await InventoryDetails.find({
            createdAt: { $gte: oneWeekAgo }
        });

        
        res.json(report);
    } catch (err) {
       
        res.status(500).json({ message: err.message });
    }
}

const weeklyNewStocks = async(req,res) => {
    // Get the date for one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        // Find items that were created within the last week
        const report = await InventoryDetails.find({
            createdAt: { $gte: oneWeekAgo }
        });
        

        
        const increasedItems = report.filter(
            (item) => item.quantity > item.previousQuantity
        );
        console.log('Increased items:', increasedItems);

        
        res.json(increasedItems);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const weeklyConsumedStocks = async(req,res) => {
    // Get the date for one week ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
        // Find items that were created within the last week
        const report = await InventoryDetails.find({
            createdAt: { $gte: oneWeekAgo }
        });

        
        const decreasedItems = report.filter(
            (item) => item.quantity < item.previousQuantity
        );
        console.log('Decreased items:', decreasedItems);

        
        res.json(decreasedItems);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {weeklyListings , weeklyNewStocks , weeklyConsumedStocks};





















// const express = require('express');
// const router = express.Router();
// const InventoryDetails = require('./../../models/inventoryDetails');

// let report;
// let oneWeekAgo = new Date();

// const weeklyListings = async (req, res) => {

//     // Get the date for one week ago
//   oneWeekAgo = new Date();
//   oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

//   try {
//     // Find items that were created within the last week
//     report = await InventoryDetails.find({
//       createdAt: { $gte: oneWeekAgo }
//     });

//     // Send the report as the response
//     res.json(report);
//   } catch (err) {
//     // Send an error response if something goes wrong
//     res.status(500).json({ message: err.message });
//   }
// }

// const weeklyNewStocks = async(req,res) => {
//     try{
//          // Separate increased and decreased items
//     const  increasedItems = report.filter(
//         (item) => item.quantity > item.previousQuantity
//       );
//       res.json(increasedItems);
//     }
//     catch(err){
//         res.status(500).json({ message: err.message });
//     }
// }


// module.exports = {weeklyListings , weeklyNewStocks};