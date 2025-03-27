// feedback.model.js

const { dbConn } = require("../../config/config");

const addFeedback = async (patientData) => {
  return new Promise((resolve, reject) => {
    dbConn.query(
      'INSERT INTO feedback (patientName, patientEmail, doctorEmail, feedback, pic, starRating) VALUES (?, ?, ?, ?, ?, ?)',
      [
        patientData.name,
        patientData.email,
        patientData.doctorEmail,
        patientData.feedback,
        patientData.pic,
        patientData.starRating, // Add the starRating field
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

const getFeedbackForDoctor= async (doctorEmail) => {
  return new Promise((resolve, reject)=>{
    dbConn.query('SELECT * FROM feedback WHERE doctorEmail = ?', [doctorEmail],(err, result)=>{
      if(err) reject(err);
      else resolve(result);
    });
  })
};

// gett all feedback

const getFeedback = async () => {
  return new Promise((resolve, reject)=>{
    dbConn.query('SELECT * FROM feedback',(err, result)=>{
      if(err) reject(err);
      else resolve(result);
    });
  })
}

// delete feedback
// const deleteFeedback = async (id) =>{
//   return new Promise((resolve, reject)=>{
//     dbConn.query('DELETE FROM feedback WHERE id = ?', [id],(err, result)=>{
//       if(err) reject(err);
//       else resolve(result);
//     });
//   })
// }

module.exports = { addFeedback, getFeedbackForDoctor, getFeedback};
