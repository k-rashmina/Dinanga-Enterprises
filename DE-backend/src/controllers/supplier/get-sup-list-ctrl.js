const getSupListService = require('../../services/supplier/getSupListService');

const getSupListCtrl = async (req, res) => {

    res.json(await getSupListService());

}

module.exports = getSupListCtrl;