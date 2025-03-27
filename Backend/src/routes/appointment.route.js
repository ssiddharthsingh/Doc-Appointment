// Inside your server route handling appointments (e.g., appointments.route.js)
const express = require('express');
const router = express.Router();
const { Appointment } = require('../models/appointment.model');

router.post("/createAppointment", async (req, res) => {
    const { doctorName, doctorEmail, patientName, patientEmail, date, slot } = req.body;

    try {
        const newAppointment = new Appointment({ doctorName, doctorEmail, patientName, patientEmail, date, slot });
        await newAppointment.save();
        res.status(200).json({ message: "Appointment created successfully." });
    } catch (error) {
        console.error('Error saving appointment:', error);
        res.status(500).json({ error: "Internal Server Error.", message: error.message });
    }
});



const appointmentController = require("../controllers/appointment.controller");

// Fetch all appointments for a user by patientEmail
router.get("/getPatientAppointments", appointmentController.getPatientAppointments);


router.get("/getAppointments", appointmentController.getAppointments);

// Cancel an appointment by patientEmail
router.delete("/cancelAppointment/:patientEmail", appointmentController.cancelAppointment);


router.get("/getDocAppointments", appointmentController.getDocAppointments);


module.exports = router;