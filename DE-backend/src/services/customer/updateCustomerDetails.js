const{updateCustomer} = require('../../data-access/customer/customerDB');


module.exports = async function putCustomerDetails(upCus){

    const updated = await updateCustomer(upCus);
    return(updated);
}