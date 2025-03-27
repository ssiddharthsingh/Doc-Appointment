const { dbConn } = require('../../config/config');

class Appointment {
  constructor({ doctorName, doctorEmail, patientName, patientEmail, date, slot }) {
    this.doctorName = doctorName;
    this.doctorEmail = doctorEmail;
    this.patientName = patientName;
    this.patientEmail = patientEmail;
    this.date = date;
    this.slot = slot;
  }

  async save() {
    const query = "INSERT INTO appointments (doctorName, doctorEmail, patientName, patientEmail, date, slot) VALUES (?, ?, ?, ?, ?, ?)";
    try {
      const result = await dbConn.query(query, [this.doctorName, this.doctorEmail, this.patientName, this.patientEmail, this.date, this.slot]);
      console.log('Query executed successfully:', result);
      return result;
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;
    }
  }
}

async function getAppointmentsByPatientEmail(email) {
  const query = "SELECT * FROM appointments WHERE patientEmail = ? AND date >= CURDATE();";
  return new Promise((resolve, reject) => {
    dbConn.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}


async function cancelAppointmentByPatientEmail(id) {
  const query = "DELETE FROM appointments WHERE id = ? LIMIT 1";
  try {
    const result = await dbConn.query(query, [id]);
    return result;
  } catch (err) {
    throw err;
  }
}


// Update the function in your server-side code
async function getAppointmentsByDoctorEmail(id) {
  const query = "SELECT * FROM appointments WHERE doctorEmail = ? AND date >= CURDATE();";
  return new Promise((resolve, reject) => {
    dbConn.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// get all appointments

async function getAppointments() {
  const query = "SELECT * FROM appointments";
  return new Promise((resolve, reject) => {
    dbConn.query(query, [], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

async function getAppointmentsBySlot(doctorEmail, date, slot) {
  const query = "SELECT * FROM appointments WHERE doctorEmail = ? AND date = ? AND slot = ?";
  return new Promise((resolve, reject) => {
    dbConn.query(query, [doctorEmail, date, slot], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}





module.exports = { Appointment, getAppointmentsByPatientEmail, cancelAppointmentByPatientEmail, getAppointmentsByDoctorEmail, getAppointments, getAppointmentsBySlot};
