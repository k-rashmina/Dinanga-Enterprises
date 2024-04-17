const supplierDetailsService = require('../../services/supplier/getSupplierDetails');

const getSupplierDetails = async (req, res) => {

    const supplier_id = req.query.email;
    res.json(await supplierDetailsService(supplier_id));

}

module.exports = getSupplierDetails;