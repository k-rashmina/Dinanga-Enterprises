const express = require('express');
const transaction = require('./transactions-route');
const getJobService = require('../controllers/job/get-job-service');

const router = express.Router();

router.use('/transaction', transaction);
router.get('/getjobservices', (req, res) => getJobService(req, res));

module.exports = router;