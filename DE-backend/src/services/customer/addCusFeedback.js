const {addFeedbackCustomer} = require('../../data-access/customer/customerFeedbackDB');

module.exports = async function postCustomerFeedback(addFeedback) {

    const message = await addFeedbackCustomer(addFeedback);

    return message;
}