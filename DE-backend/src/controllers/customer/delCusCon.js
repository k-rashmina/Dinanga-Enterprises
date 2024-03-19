const deleteCustomerDetails = require('../../services/customer/delCustomerDetails');


const delCusDetails = async (req, res) => {

    const delCusId = req.body._id;

    res.json(await deleteCustomerDetails(delCusId));

}

module.exports = delCusDetails;