const deleteSupplierProfileDetails =  require('../../services/supplier/delSupplierDetails');


const deleteSupplierProfile= async (req, res) => {

    const deleteSupplier = req.query.supid;

    res.json(await deleteSupplierProfileDetails(deleteSupplier));

}

module.exports = deleteSupplierProfile;

