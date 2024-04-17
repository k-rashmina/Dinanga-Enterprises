const putCustomerDetails = require('../../services/customer/updateCustomerDetails');

const putCusDetails = async (req, res) => {

    const upCus = req.body;

    res.json(await putCustomerDetails(upCus));

}

module.exports = putCusDetails;