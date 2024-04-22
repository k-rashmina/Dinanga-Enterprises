const putSupplierDetails = require('../../services/supplier/putSupplierDetails');


const putSupplierProfile = async (req, res) => {

    const  updateProfile = req.body;

    res.json(await putSupplierDetails(updateProfile));

}

module.exports = putSupplierProfile;