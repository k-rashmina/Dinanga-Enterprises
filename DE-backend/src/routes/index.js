const express = require('express');

const router = express.Router();

const orderRoutes = require("./order");

router.use('/order',orderRoutes)

module.exports = router;