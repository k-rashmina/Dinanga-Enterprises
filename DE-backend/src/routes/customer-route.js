const express = require('express');

const postCusDetails = require('../controllers/customer/addCusCon');
const delCusDetails = require('../controllers/customer/delCusCon');
const readCusDetails = require('../controllers/customer/readCusCon');
const putCusDetails = require('../controllers/customer/updateCusCon');
const getLoggedUserCtrl = require('../controllers/customer/getLoggedUserCtrl')
const getCustomerReportController = require('../controllers/customer/customerReport')


const router = express.Router();

router.get('/customerdetails', (req, res) => readCusDetails(req, res));
router.post('/getloggeduser', (req, res) => getLoggedUserCtrl(req, res));
router.post('/addcustomerdetails', (req, res) => postCusDetails(req, res));
router.put('/upcustomerdetails', (req, res) => putCusDetails(req, res));
router.delete('/delcustomerdetails', (req, res) => delCusDetails(req, res));
router.get('/customerReport',getCustomerReportController.customerReport)


module.exports = router;