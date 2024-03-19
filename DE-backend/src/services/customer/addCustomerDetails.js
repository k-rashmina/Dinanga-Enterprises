const {addCusDetails} = require("../../data-access/customer/customerDB");


module.exports = async function postCustomerDetails(newCustomer){

    const message = await addCusDetails(newCustomer);
    return message;
}