const postServicesProvided = require('../../services/supplier/postServicesProvided');

const postProvidedServices= async (req, res) => {

    const services = req.body;

    res.json(await postServicesProvided(services));

}

module.exports = postProvidedServices;
