const putfeedCustomer = require('../../services/customer/updateCusFeedback');

const putCusFeedback = async (req, res) => {

    const  updateFeedback= req.body;

    res.json(await putfeedCustomer(updateFeedback));

}

module.exports =putCusFeedback;
