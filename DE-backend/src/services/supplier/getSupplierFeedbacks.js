const {getServicesProvided} = require('../../data-access/supplier/feedbackdb');

module.exports = async function supplierFeedback(Sup_ID) {

    const Feedbacks = await getServicesProvided(Sup_ID);

    return(Feedbacks);

}