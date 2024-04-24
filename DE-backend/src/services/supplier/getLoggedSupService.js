const { getLoggedUser } = require('../../data-access/supplier/supplierdb');

module.exports =  async function getLoggedSupService(user){

    const loggedUser = await getLoggedUser(user);
    return (loggedUser);
}