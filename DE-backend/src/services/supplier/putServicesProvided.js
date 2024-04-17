const {putServicesProvided} = require('../../data-access/supplier/services_provideddb');

module.exports = async function putservicesProvided(servicesProvided) {

    const updated = await putServicesProvided(servicesProvided);
    return(updated);

}
