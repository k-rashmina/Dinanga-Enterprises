const putServicesProvided = require('../../services/supplier/putServicesProvided');

const putprovidedServices = async (req, res) => {

    const servicesProvided = req.body;

    res.json(await putServicesProvided(servicesProvided));
    
}

module.exports = putprovidedServices;