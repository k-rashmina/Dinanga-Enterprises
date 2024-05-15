const express = require("express");
const router = express.Router();
const createController = require("../controllers/order/create");
const updateController = require("../controllers/order/Update");
const readController = require("../controllers/order/read");
const deleteController = require("../controllers/order/delete");
const getReorderItemsController = require("../controllers/order/getReorder");
const getSupOrders = require('../controllers/order/get-sup-orders');
const getOrderStatus = require('../controllers/order/getAcceptedOrders');
const getStatusCount = require("../controllers/order/getStatusCount");


router.post("/add", createController.createNewOrder);
router.put("/updateItem/:id", updateController.updateNewOrder);
router.get("/getAllItems", readController.getOrderDetails);
router.delete("/deleteItem/:id", deleteController.deleteNewOrder);
router.get("/getReorderItems",getReorderItemsController.getReorderItems);
router.get('/getsuporders', (req, res) => getSupOrders(req, res));
router.get("/getacceptedOrders",getOrderStatus.getOrderStatus);
router.get("/getStatusCount",getStatusCount.getStatusCount);


module.exports = router;