const createConsultantAppointment =require('../../data-access/consultancy/consultantAppointmentdb')

module.exports = async(consultancy) =>{
    const message = await createConsultantAppointment(consultancy);
    return message;
}