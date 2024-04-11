const {getServicesProvided} = require('../../data-access/supplier/services_provideddb');

module.exports = async function services_provided() {

    const ProvidedServices = await getServicesProvided();

    return(ProvidedServices);

}