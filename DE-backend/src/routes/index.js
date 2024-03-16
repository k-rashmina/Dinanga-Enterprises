const express = require('express');
const transaction = require('./transactions-route');

const router = express.Router();

router.use('/transaction', transaction);

module.exports = router;