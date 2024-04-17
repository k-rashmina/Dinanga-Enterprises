const express = require('express');

const getSupplierDetails = require('../controllers/supplier/get-supplier-profile');
const postSupplierDetails = require('../controllers/supplier/post-supplier-profile');
const putSupplierProfile = require('../controllers/supplier/put-supplier-profile');
const deleteSupplierProfile = require('../controllers/supplier/del-supplier-profile');

const router = express.Router();

router.get('/readsupplierdetails', (req, res) => getSupplierDetails(req, res));
router.post('/addsupplierdetails', (req, res) => postSupplierDetails(req, res));
router.put('/upsupplierdetails', (req, res) => putSupplierProfile(req, res));
router.delete('/delsupplierdetails', (req, res) => deleteSupplierProfile(req, res));

module.exports = router;
