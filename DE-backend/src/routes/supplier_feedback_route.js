const express = require('express');

const getSupplierFeedbacks = require('../controllers/supplier/get-supplier-feedback');
const postFeedbacksSuppliers = require('../controllers/supplier/post-supplier-feedback');
const putfeedbacksupplier = require('../controllers/supplier/put-supplier-feedback');
const deleteFeedbacksupplier = require('../controllers/supplier/del-supplier-feedback');

const router = express.Router();

router.get('/readsupplierfeedbacks', (req, res) => getSupplierFeedbacks(req, res));
router.post('/addsupplierfeedbacks', (req, res) => postFeedbacksSuppliers(req, res));
router.put('/upsupplierfeedbacks', (req, res) => putfeedbacksupplier(req, res));
router.delete('/delsupplierfeedbacks', (req, res) => deleteFeedbacksupplier(req, res));

module.exports = router;
