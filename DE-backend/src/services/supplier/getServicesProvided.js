const {getServicesProvided} = require('../../data-access/supplier/services_provideddb');

module.exports = async function services_provided(sup) {

    const ProvidedServices = await getServicesProvided(sup);

    return(ProvidedServices);

}