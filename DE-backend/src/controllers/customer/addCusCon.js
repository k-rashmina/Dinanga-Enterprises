const postCustomerDetails = require('../../services/customer/addCustomerDetails');

const postCusDetails = async (req, res) => {

    const  newCustomer = req.body;

    res.json(await postCustomerDetails(newCustomer));

}

module.exports = postCusDetails;