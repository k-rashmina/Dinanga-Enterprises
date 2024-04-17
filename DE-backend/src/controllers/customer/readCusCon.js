const readCustomerDetails = require('../../services/customer/readCustomerDetails');

const readCusDetails = async (req, res) => {

    const cusid = req.query.user;
    res.json(await readCustomerDetails(cusid));

}

module.exports = readCusDetails;