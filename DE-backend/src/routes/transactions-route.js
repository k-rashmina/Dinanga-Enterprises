const express = require('express');
const getJobTransactionList = require('../controllers/finance/get-job-transaction-list');
const postJobTransaction = require('../controllers/finance/post-job-transaction');
const putJobTransaction = require('../controllers/finance/put-job-transaction');
const delJobTransaction = require('../controllers/finance/del-job-transaction');
const getPurchTransactionList = require('../controllers/finance/get-purch-transaction-list');
const postPurchTransaction = require('../controllers/finance/post-purch-transaction');
const putPurchTransaction = require('../controllers/finance/put-purch-transaction');
const delPurchTransaction = require('../controllers/finance/del-purch-transaction');
const getTransactionInfo = require('../controllers/finance/get-transaction-info');
const getDashboardStat = require('../controllers/finance/get-dashboard-stat');
const transactionReport = require('../controllers/finance/transaction-report');
const getPurchTransactionInfo = require('../controllers/finance/get-purch-transaction-info');
const getTransactionForJob = require('../controllers/finance/get-transaction-for-job');


const router = express.Router();

router.get('/jobtransactionlist', (req, res) => getJobTransactionList(req, res));
router.get('/jobtransactionlist/transaction', (req, res) => getTransactionInfo(req, res));
router.post('/addjobtransaction', (req, res) => postJobTransaction(req, res));
router.put('/upjobtransaction', (req, res) => putJobTransaction(req, res));
router.delete('/deljobtransaction', (req, res) => delJobTransaction(req, res));

router.get('/getdashboardstat', (req, res) => getDashboardStat(req, res));
router.get('/gettransactionreport', (req, res) => transactionReport(req, res));
router.get('/gettransactionforjob', (req, res) => getTransactionForJob(req, res));


router.get('/purchtransactionlist', (req, res) => getPurchTransactionList(req, res));
router.get('/purchtransactionlist/transaction', (req, res) => getPurchTransactionInfo(req, res));
router.post('/addpurchtransaction', (req, res) => postPurchTransaction(req, res));
router.put('/uppurchtransaction', (req, res) => putPurchTransaction(req, res));
router.delete('/delpurchtransaction', (req, res) => delPurchTransaction(req, res));

module.exports = router