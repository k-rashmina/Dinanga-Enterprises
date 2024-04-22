const customerFeedback = require('../../services/customer/readCusFeedback');

const getCustomerFeedbacks = async (req, res) => {

    const cusemail = req.query.cusemail

    res.json(await customerFeedback(cusemail));

}

module.exports = getCustomerFeedbacks;
