const pendingAppStatus = require("../../models/jobAppointment");

const updateAppointmentStatus = async (req, res) => {
    try {
        const { employeeId } = req.body; // Assuming employeeId is sent in the request body

        // Update appointments where the status is "pending" and employee_id matches
        const updatedStatus = await pendingAppStatus.updateMany(
            { status: "pending", employee_id: employeeId }, // Filter criteria
            { $set: { status: "done" } } // Update criteria
        );

        res.status(200).json({ message: "Appointments status updated successfully", updatedStatus });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

module.exports = { updateAppointmentStatus };