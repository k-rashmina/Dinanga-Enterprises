const{getLoggedUser} = require('../../data-access/customer/customerDB');

module.exports =  async function getLoggedUserService(user){

    const loggedUser = await getLoggedUser(user);
    return (loggedUser);
}