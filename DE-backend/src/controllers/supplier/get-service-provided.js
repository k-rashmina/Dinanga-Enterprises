const ProvidedServices = require('../../services/supplier/getServicesProvided');

const getServicesProvided = async (req, res) => {

    res.json(await ProvidedServices());

}

module.exports = getServicesProvided;