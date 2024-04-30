const {getFeedbackSupplier} = require('../../data-access/supplier/feedbackdb');

module.exports = async function supplierFeedback(Sup_ID) {

    const Feedbacks = await getFeedbackSupplier(Sup_ID);

    return(Feedbacks);

}