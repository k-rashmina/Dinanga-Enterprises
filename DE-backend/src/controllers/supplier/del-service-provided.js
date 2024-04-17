const delProvidedServices = require('../../services/supplier/delServicesProvided');


const delServicesProvided = async (req, res) => {

    const deleteService = req.body._id;

    res.json(await delProvidedServices(deleteService));

}

module.exports = delServicesProvided;

