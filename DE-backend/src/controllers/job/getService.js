const express = require('express');
const router = express.Router();
const Service = require('../models/servicesModel');

// Get all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find({}, 'service_name'); // Only retrieve the 'name' field
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching services', error });
    }
});

module.exports = router;
