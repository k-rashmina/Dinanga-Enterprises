const {deleteFeedbacksupplier} = require('../../data-access/supplier/feedbackdb');

module.exports = async function deletesupplierfeedback(deletefeedback) {

    const deletedfeedback = await deleteFeedbacksupplier(deletefeedback);

    return(deletedfeedback);

}