const express = require("express");
const router = express.Router();
const createController = require("../controllers/inventory/create");
const updateController = require("../controllers/inventory/update");
const readController = require("../controllers/inventory/read");
const deleteController = require("../controllers/inventory/delete");
const consumeController = require("../controllers/inventory/consume");
const searchController = require("../controllers/inventory/search");
const jobItemsUpdateController = require("../controllers/inventory/jobItemsUpdate");
const getStockValueController = require("../controllers/inventory/chats/getStockValue")
const getStockStatusController = require("../controllers/inventory/chats/getStockStatus");
const InventoryReportController = require("../controllers/inventory/inventoryReport");
const getNewListingController = require("../controllers/inventory/newListing");
const getNewStocksController = require("../controllers/inventory/newListing");
const getConsumedStocksController = require("../controllers/inventory/newListing");



router.post("/add", createController.createInventoryItem);
router.put("/updateItem/:id", updateController.updateInventoryItem);
router.get("/getAllItems", readController.getAllItems);
router.delete("/deleteItem/:id", deleteController.deleteInventoryItem);
router.post("/completeService", consumeController.consumedItems);
router.get("/searchItem/:name", searchController.searchItems);
router.get("/updateJobItem", jobItemsUpdateController.jobItemsUpdate);
router.get("/stockValueChart",getStockValueController.getStockValue);
router.get("/stockStatus",getStockStatusController.getStockStatus);
router.get("/inventoryReport", InventoryReportController.inventoryReport);
router.get("/weeklyListings", getNewListingController.weeklyListings);
router.get("/weeklyNewStocks", getNewStocksController.weeklyNewStocks);
router.get("/weeklyConsumedStocks", getConsumedStocksController.weeklyConsumedStocks);


module.exports = router;