import React, { useState } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";
import "../css/feedBackForm.css";

const FeedbackForm = ({ onClose }) => {
  console.log("onClose", onClose);
  const [feedback, setFeedback] = useState("");
  const [starRating, setStarRating] = useState(0);
  var userData = JSON.parse(localStorage.getItem("userInfo"));

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      const patientInfo = userData;
      let doctorEmail = localStorage.getItem("feedbackDoctor");
      console.log("doctorEmail", doctorEmail);

      let result = await axios.post(
        `http://localhost:4500/feedback/addFeedback`,
        { ...patientInfo, feedback, doctorEmail, starRating }
      );
      console.log("result", result);
      alert("Feedback submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting feedback:", error);

      if (error.response) {
        console.log("Response data:", error.response.data);
        alert("Error submitting feedback. Please try again.");
      } else {
        console.log("No response from the server");
        alert("Error submitting feedback. Please try again.");
      }
    }
  };

  return (
    <div className="popup">
      <form onSubmit={handleFeedbackSubmit}>
        <label htmlFor="feedback">Your Feedback</label>
        <label>Star Rating</label>
        <Rating
          count={5}
          onChange={(rating) => setStarRating(rating)}
          size={24}
          activeColor="#ffd700"
        />
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
          placeholder="Give Your FeedBack..."
        />

        <button className="submit-feedback" type="submit">
          Submit Feedback
        </button>
        <button className="cancel-feedback" type="button" onClick={onClose}>
          x
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
