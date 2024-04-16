const {getFeedbackCustomer} = require('../../data-access/customer/customerFeedbackDB');

module.exports = async function customerFeedback() {

    const Feedbacks = await getFeedbackCustomer();

    return(Feedbacks);

}