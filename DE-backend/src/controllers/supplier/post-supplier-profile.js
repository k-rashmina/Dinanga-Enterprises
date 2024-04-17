const postSupplierProfile = require('../../services/supplier/postSupplierDetails');

const postSupplierDetails= async (req, res) => {

    const profile = req.body;

    res.json(await postSupplierProfile(profile));

}

module.exports = postSupplierDetails;
