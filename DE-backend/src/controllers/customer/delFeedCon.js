const deletecustomerfeedback = require('../../services/customer/delCusFeedback');


const delFeedBackCustomer = async (req, res) => {

    const deletefeedback = req.body._id;

    res.json(await deletecustomerfeedback(deletefeedback));

}

module.exports = delFeedBackCustomer;
