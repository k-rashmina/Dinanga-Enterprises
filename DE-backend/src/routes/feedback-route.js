const express = require('express');

const getCustomerFeedbacks = require('../controllers/customer/readFeedCon');
const postFeedbackCustomers = require('../controllers/customer/addFeedCon');
const putCusFeedback = require('../controllers/customer/updateFeedCon');
const delFeedBackCustomer = require('../controllers/customer/delFeedCon');

const router = express.Router();

router.get('/readcustomerfeedbacks', (req, res) => getCustomerFeedbacks(req, res));
router.post('/addcustomerfeedbacks', (req, res) => postFeedbackCustomers(req, res));
router.put('/upcustomerfeedbacks', (req, res) => putCusFeedback(req, res));
router.delete('/delcustomerfeedbacks', (req, res) => delFeedBackCustomer(req, res));

module.exports = router;