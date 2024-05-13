const deleteFeedbacksupplierService = require('../../services/supplier/delSupplierFeedbacks');


const deleteFeedbacksupplier = async (req, res) => {

    const deletefeedback = req.query.id;

    res.json(await deleteFeedbacksupplierService(deletefeedback));

}

module.exports = deleteFeedbacksupplier;

