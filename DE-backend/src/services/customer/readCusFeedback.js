const {getFeedbackCustomer} = require('../../data-access/customer/customerFeedbackDB');

module.exports = async function customerFeedback(cusemail) {

    const Feedbacks = await getFeedbackCustomer(cusemail);

    return(Feedbacks);

}