const express = require('express');
const supplierRouter = require('./supplier_profile_route');
const supFeedbackRouter = require('./supplier_feedback_route');
const supServicesRouter = require('./services_provided_route');

const router = express.Router();

router.use('/supplier', supplierRouter);
router.use('/supFeedback', supFeedbackRouter);
router.use('/supServices', supServicesRouter);

module.exports = router;
