const {putSupplierDetails} = require('../../data-access/supplier/supplierdb');

module.exports = async function putSupplierDetailsForm(supplierDetails) {

    const updated = await putSupplierDetails(supplierDetails);
    return(updated);

}
