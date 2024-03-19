const express = require("express");
const router = express.Router();
const createController = require("../controllers/order/create");
const updateController = require("../controllers/order/Update");
const readController = require("../controllers/order/read");
const deleteController = require("../controllers/order/delete");


router.post("/add", createController.createNewOrder);
router.put("/updateItem/:id", updateController.updateNewOrder);
router.get("/getAllItems", readController.getOrderDetails);
router.delete("/deleteItem/:id", deleteController.deleteNewOrder);


module.exports = router;