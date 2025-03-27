const Appointment = require("../models/appointment.model");

async function createAppointment(req, res) {
  const { doctorName, doctorEmail, patientName, patientEmail, date, slot } = req.body;
  console.log('Received Appointment Data:', req.body);

  try {
    // Check the number of appointments for the given slot
    const appointmentsForSlot = await Appointment.getAppointmentsBySlot(doctorEmail, date, slot);
    const maxAppointmentsPerSlot = 15;

    if (appointmentsForSlot.length >= maxAppointmentsPerSlot) {
      return res.status(400).json({ error: "Slot fully booked. Please choose another slot." });
    }

    const newAppointment = new Appointment({ doctorName, doctorEmail, patientName, patientEmail, date, slot });
    await newAppointment.save();
    res.json({ message: "Appointment submitted successfully!" });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ error: "Internal Server Error.", message: error.message });
  }
}

// get all appointments
async function getAppointments(req, res) {
  try {
    const appointments = await Appointment.getAppointments();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
}

async function getPatientAppointments(req, res) {
    const patientEmail = req.query.patientEmail;
  
    try {
      const appointments = await Appointment.getAppointmentsByPatientEmail(patientEmail);
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }
  
  async function cancelAppointment(req, res) {
    const patientEmail = req.params.patientEmail;
  
    try {
      // Call the cancelAppointmentByPatientEmail function from the model
      await Appointment.cancelAppointmentByPatientEmail(patientEmail);
      
      res.status(200).json({ message: "Appointment canceled successfully." });
    } catch (error) {
      console.error("Error canceling appointment:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  async function getDocAppointments(req, res) {
    const doctorEmail = req.query.doctorEmail;
  
    try {
      const appointments = await Appointment.getAppointmentsByDoctorEmail(doctorEmail);
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  }

  

module.exports = { createAppointment,getPatientAppointments, getAppointments, cancelAppointment, getDocAppointments };