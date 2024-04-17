const{deleteCustomer}= require('../../data-access/customer/customerDB');


module.exports = async function deleteCustomerDetails(delCusId){
    
    const deleted = await deleteCustomer(delCusId);
    return(deleted);
}