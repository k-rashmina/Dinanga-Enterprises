const express = require('express');
const getJobTransactionList = require('../controllers/finance/get-job-transaction-list');
const postJobTransaction = require('../controllers/finance/post-job-transaction');
const putJobTransaction = require('../controllers/finance/put-job-transaction');
const delJobTransaction = require('../controllers/finance/del-job-transaction');

const router = express.Router();

router.get('/jobtransactionlist', (req, res) => getJobTransactionList(req, res));

router.post('/addjobtransaction', (req, res) => postJobTransaction(req, res));

router.put('/upjobtransaction', (req, res) => putJobTransaction(req, res));

router.delete('/deljobtransaction', (req, res) => delJobTransaction(req, res));

module.exports = router