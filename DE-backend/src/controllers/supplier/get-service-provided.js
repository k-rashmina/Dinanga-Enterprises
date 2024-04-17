const ProvidedServices = require('../../services/supplier/getServicesProvided');

const getServicesProvided = async (req, res) => {

    const sup = req.query.email
    res.json(await ProvidedServices(sup));

}

module.exports = getServicesProvided;