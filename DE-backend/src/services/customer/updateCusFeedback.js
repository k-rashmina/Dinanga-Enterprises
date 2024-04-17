const {putFeedbackcustomer} = require('../../data-access/customer/customerFeedbackDB');

module.exports = async function putfeedCustomer(upFeedback) {

    const updated = await putFeedbackcustomer(upFeedback);
    return(updated);

}