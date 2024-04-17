const {getSupplierDetails} = require('../../data-access/supplier/supplierdb');

module.exports = async function supplierDetails(supplier_id) {

    const DetailsSuppliers = await getSupplierDetails(supplier_id);

    return(DetailsSuppliers);

}