const deleteFeedbacksupplierService = require('../../services/supplier/delSupplierFeedbacks');


const deleteFeedbacksupplier = async (req, res) => {

    const deletefeedback = req.body._id;

    res.json(await deleteFeedbacksupplierService(deletefeedback));

}

module.exports = deleteFeedbacksupplier;

