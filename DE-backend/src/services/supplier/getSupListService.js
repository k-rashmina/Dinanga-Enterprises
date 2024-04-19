const { getSupplierList } = require('../../data-access/supplier/supplierdb');

const getSupListService = async () => {

    const supList = await getSupplierList();

    return supList;

}