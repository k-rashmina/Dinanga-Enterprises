const {deleteServicesProvided} = require('../../data-access/supplier/services_provideddb');

module.exports = async function services_provided(delService) {

    const deleteService = await deleteServicesProvided(delService);

    return(deleteService);

}