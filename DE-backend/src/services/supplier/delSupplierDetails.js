const {deleteSupplierDetails} = require('../../data-access/supplier/supplierdb');

module.exports = async function supplierDetails(delSupplier) {

    const deleteSupplier = await deleteSupplierDetails(delSupplier);

    return(deleteSupplier);

}