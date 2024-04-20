const feedbackSupplierService = require('../../services/supplier/getSupplierFeedbacks');

const getSupplierFeedbacks = async (req, res) => {

    const Sup_ID = req.query.supemail;
    res.json(await feedbackSupplierService(Sup_ID));

}

module.exports = getSupplierFeedbacks;