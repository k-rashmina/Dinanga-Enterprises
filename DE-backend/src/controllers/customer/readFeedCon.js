const customerFeedback = require('../../services/customer/readCusFeedback');

const getCustomerFeedbacks = async (req, res) => {

    res.json(await customerFeedback());

}

module.exports = getCustomerFeedbacks;
