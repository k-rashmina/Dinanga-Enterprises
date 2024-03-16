const express = require("express");
const router = express.Router();
const createController = require("../controllers/inventory/create");
const updateController = require("../controllers/inventory/update");
const readController = require("../controllers/inventory/read");
const deleteController = require("../controllers/inventory/delete");
const consumeController = require("../controllers/inventory/consume");
const searchController = require("../controllers/inventory/search");

router.post("/add", createController.createInventoryItem);
router.put("/updateItem/:id", updateController.updateInventoryItem);
router.get("/getAllItems", readController.getAllItems);
router.delete("/deleteItem/:id", deleteController.deleteInventoryItem);
router.post("/completeService", consumeController.consumedItems);
router.get("/searchItem/:name", searchController.searchItems);

module.exports = router;