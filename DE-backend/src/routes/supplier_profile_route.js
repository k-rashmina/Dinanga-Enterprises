const express = require('express');

const getSupplierDetails = require('../controllers/supplier/get-supplier-profile');
const getSupListCtrl = require('../controllers/supplier/get-sup-list-ctrl');
const postSupplierDetails = require('../controllers/supplier/post-supplier-profile');
const putSupplierProfile = require('../controllers/supplier/put-supplier-profile');
const deleteSupplierProfile = require('../controllers/supplier/del-supplier-profile');
const getLoggedUserCtrl = require('../controllers/supplier/getLoggedSupCtrl')

const router = express.Router();

router.get('/readsupplierdetails', (req, res) => getSupplierDetails(req, res));
router.get('/readsuplist', (req, res) => getSupListCtrl(req, res));
router.post('/getloggedsup', (req, res) => getLoggedUserCtrl(req, res));
router.post('/addsupplierdetails', (req, res) => postSupplierDetails(req, res));
router.put('/upsupplierdetails', (req, res) => putSupplierProfile(req, res));
router.delete('/delsupplierdetails', (req, res) => deleteSupplierProfile(req, res));

module.exports = router;
