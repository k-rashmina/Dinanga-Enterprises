const consultantAppointmentService =require('../../services/consultancy/consultantAppointmentService');

const createConsultantAppointment = async(req,res) => {

    const consultancy = req.body;
    
    const message = await consultantAppointmentService(consultancy);

    res.json(message);
}

module.exports = createConsultantAppointment;