const {addServicesProvided} = require('../../data-access/supplier/services_provideddb');

module.exports = async function postServiceProvided(services) {

    const message = await addServicesProvided(services);

    return message;
}