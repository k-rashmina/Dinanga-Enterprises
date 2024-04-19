const deleteSupplierProfileDetails =  require('../../services/supplier/delSupplierDetails');


const deleteSupplierProfile= async (req, res) => {

    const deleteSupplier = req.body._id;

    res.json(await deleteSupplierProfileDetails(deleteSupplier));

}

module.exports = deleteSupplierProfile;

