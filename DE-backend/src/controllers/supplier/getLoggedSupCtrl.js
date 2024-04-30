const getLoggedSupService = require('../../services/supplier/getLoggedSupService');

const getLoggedUserCtrl = async(req, res) => {

    const user  = req.body;

    res.json(await getLoggedSupService(user));

}

module.exports = getLoggedUserCtrl;