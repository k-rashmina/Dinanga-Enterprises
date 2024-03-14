const express = require("express");
const router = express.Router();
const inventoryRoutes = require("./inventory");

router.use('/inventory', inventoryRoutes);         //inventory routes moddleware

module.exports = router;