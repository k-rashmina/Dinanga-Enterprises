const {addFeedbackSupplier} = require('../../data-access/supplier/feedbackdb');

module.exports = async function postSupplierFeedback(supplierFeedback) {

    const message = await addFeedbackSupplier(supplierFeedback);

    return message;
}