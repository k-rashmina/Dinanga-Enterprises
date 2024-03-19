const readCustomerDetails = require('../../services/customer/readCustomerDetails');

const readCusDetails = async (req, res) => {

    const cusid = req.body._id;
    res.json(await readCustomerDetails(cusid));

}

module.exports = readCusDetails;