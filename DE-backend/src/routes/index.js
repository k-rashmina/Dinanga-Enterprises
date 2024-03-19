const express = require('express');

const customerRoute = require('./customer-route');

const router = express.Router();

router.use('/customer', customerRoute );


module.exports = router;