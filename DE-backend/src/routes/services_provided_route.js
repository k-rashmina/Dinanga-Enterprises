const express = require('express');

const getServicesProvided = require('../controllers/supplier/get-service-provided');
const postProvidedServices = require('../controllers/supplier/post-service-provided');
const putprovidedServices = require('../controllers/supplier/put-service-provided');
const delprovidedServices = require('../controllers/supplier/del-service-provided');

const router = express.Router();

router.get('/readservicesprovided', (req, res) => getServicesProvided(req, res));
router.post('/addservicesprovided', (req, res) => postProvidedServices(req, res));
router.put('/upserviceprovided', (req, res) => putprovidedServices(req, res));
router.delete('/delservicesprovided', (req, res) => delprovidedServices(req, res));

module.exports = router;
