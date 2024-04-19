const {addSupplierDetails} = require('../../data-access/supplier/supplierdb');

module.exports = async function postSupplierDetails(supplierDetails) {

    const message = await addSupplierDetails(supplierDetails);

    return message;
}