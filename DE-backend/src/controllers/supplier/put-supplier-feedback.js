const putSupplierFeedbacks = require('../../services/supplier/putSupplierFeedbacks');

const putfeedbacksupplier = async (req, res) => {

    const  updateFeedback= req.body;

    res.json(await putSupplierFeedbacks(updateFeedback));

}

module.exports = putfeedbacksupplier;