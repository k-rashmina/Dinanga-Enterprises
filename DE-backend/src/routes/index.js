const express = require('express');

const customerRoute = require('./customer-route');
const feedbackRoute = require('./feedback-route');


const router = express.Router();

router.use('/customer', customerRoute );
router.use('/cusfeedback', feedbackRoute );



module.exports = router;