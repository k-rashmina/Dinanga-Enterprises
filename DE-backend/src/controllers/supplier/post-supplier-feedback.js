const postSupplierFeedbacks = require('../../services/supplier/postSupplierFeedbacks');

const postFeedbacksSuppliers= async (req, res) => {

    const feedbacks = req.body;

    res.json(await postSupplierFeedbacks(feedbacks));

}

module.exports = postFeedbacksSuppliers;
