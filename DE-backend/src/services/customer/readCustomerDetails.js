const{getCusDetails} = require('../../data-access/customer/customerDB');

module.exports =  async function readCustomerDetails(cusid){

    const readCD = await getCusDetails(cusid);
    return (readCD);
}