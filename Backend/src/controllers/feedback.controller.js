const feedbackModel = require("../models/feedback.model");

const addFeedback = async (req, res) => {
  try {
    const patientData = req.body;

    console.log(req.body);

    if (
      !patientData.email ||
      !patientData.doctorEmail ||
      !patientData.feedback
    ) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    await feedbackModel.addFeedback(patientData).then((result) => {
      if (result) res.send({ message: "Feedback added successfully" });
      else throw new Error("Error while Saving");
    });
  } catch (err) {
    console.error("Error adding feedback:", err);
    res
      .status(500)
      .json({ error: err.message, message: "Internal server error" });
  }
};

const getFeedbackForDoctor = async (req, res) => {
  try {
    const { doctorEmail } = req.query;

    // Get feedback for a specific doctor from the database
    const feedback = await feedbackModel.getFeedbackForDoctor(
      doctorEmail
    );

    res.status(200).json(feedback);
  } catch (error) {
    console.error("Error getting feedback:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all feedback

async function getFeedback(req, res) {
  // const userData = req.body; // req.query
  await feedbackModel.getFeedback().then((result) => {
    if (result) {
      res.send(result);
    } else res.status(500).send({ error: "Internal Server Error." });
  });
}

// delete feedback
// async function deleteFeedback(req, res) {
//   await feedbackModel.deleteFeedback(userData).then((result) => {
//     if (result) {
//       res.send({ message: "Feedback Deleted Successfully." });
//     } else res.status(500).send({ error: "Internal Server Error." });
//   });
// }

module.exports = { addFeedback, getFeedbackForDoctor, getFeedback };
