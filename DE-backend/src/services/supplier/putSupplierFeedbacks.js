const {putFeedbacksupplier} = require('../../data-access/supplier/feedbackdb');

module.exports = async function putfeedbacksupplier(updateSupplier) {

    const updated = await putFeedbacksupplier(updateSupplier);
    return(updated);

}
