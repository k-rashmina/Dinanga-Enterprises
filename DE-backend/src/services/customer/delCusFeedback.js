const {deleteFeedbackcustomer} = require('../../data-access/customer/customerFeedbackDB');

module.exports = async function deletecustomerfeedback(deletefeedback) {

    const deletedfeedback = await deleteFeedbackcustomer(deletefeedback);

    return(deletedfeedback);

}
