const supplierDetailsService = require('../../services/supplier/getSupplierDetails');

const getSupplierDetails = async (req, res) => {

    const supplier_id = req.body._id;
    res.json(await supplierDetailsService(supplier_id));

}

module.exports = getSupplierDetails;