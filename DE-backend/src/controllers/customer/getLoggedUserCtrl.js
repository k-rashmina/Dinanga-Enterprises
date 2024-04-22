const getLoggedUserService = require('../../services/customer/getLoggedUserService');

const getLoggedUserCtrl = async(req, res) => {

    const user  = req.body;

    res.json(await getLoggedUserService(user))

}

module.exports = getLoggedUserCtrl;