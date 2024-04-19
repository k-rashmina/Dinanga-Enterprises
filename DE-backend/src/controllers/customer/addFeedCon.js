const postCustomerFeedback = require('../../services/customer/addCusFeedback');

const postFeedbackCustomers= async (req, res) => {

    const addFeedback = req.body;

    res.json(await postCustomerFeedback(addFeedback));

}

module.exports = postFeedbackCustomers;
