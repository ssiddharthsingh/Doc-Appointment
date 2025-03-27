// DoctorDetailsPopup.js
import React, { useState } from "react";
import Rating from "react-rating-stars-component";
import { useEffect } from "react";
import axios from "axios";
import "../css/DoctorDetailsPopup.css";

const DoctorDetailsPopup = ({ doctor, onClose }) => {
  const [auth, setAuth] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    (async () => {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      setAuth(userData);

      if (!userData) {
        alert("Please log in first to View Details");
        onClose();
        return;
      }

      if (userData.role && userData.role === "doctor") {
        alert("Doctors cannot View Details");
        onClose();
      }

      // Fetch feedbacks for the doctor
      try {
        const response = await axios.get(
          `http://localhost:4500/feedback/getFeedbackForDoctor?doctorEmail=${doctor.docEmail}`
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks for doctor:", error);
      }
    })();
  }, [doctor.docEmail, onClose]);

  return auth && auth.role !== "doctor" ? (
    <div className="doctor-details-popup">
      <div className="doctor-details">
        <div className="doctor-details-left">
          <div className="doctor-details-left-item">
            <h2>Dr.{doctor.docName}'s Details</h2>
            <div className="doctor-details-left-item-label">Qualification:</div>
            <div className="doctor-details-left-item-value">
              {doctor.docQuali}
            </div>
          </div>
          <div className="doctor-details-left-item">
            <div className="doctor-details-left-item-label">
              Specialization:
            </div>
            <div className="doctor-details-left-item-value">{doctor.docof}</div>
          </div>
          <div className="doctor-details-left-item">
            <div className="doctor-details-left-item-label">Experience:</div>
            <div className="doctor-details-left-item-value">
              {doctor.docExp} Years
            </div>
          </div>
          <div className="doctor-details-left-item">
            <div className="doctor-details-left-item-label">Email:</div>
            <div className="doctor-details-left-item-value">
              {doctor.docEmail}
            </div>
          </div>
          <div className="doctor-details-left-item">
            <div className="doctor-details-left-item-label">Phone:</div>
            <div className="doctor-details-left-item-value">
              +91{doctor.docPhone}
            </div>
          </div>
          <div className="doctor-details-left-item">
            <div className="doctor-details-left-item-label">Address:</div>
            <div className="doctor-details-left-item-value">
              {doctor.docAddress}, {doctor.docCity}
            </div>
          </div>
          <div className="feedbacksSection">
            <h3>Reviews</h3>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedbackItem">
                <div className="authorPicContainer">
                  <img
                    className="authorPic"
                    src={`http://localhost:4500/images/${feedback.pic}`}
                    alt="Patient"
                  />
                </div>
                <Rating
                  value={feedback.starRating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false}
                />
                <p className="Authorfeedback">"{feedback.feedback}"</p>
                <p className="authorName">- {feedback.patientName}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="doctor-details-right">
          <img
            className="doc-img"
            src={`http://localhost:4500/images/${doctor.pic}`}
            alt="Doctor"
          />

          <div className="doctor-details-bottom">
            <div className="doctor-details-left-item">
              <div className="doctor-details-left-item-label">
                Consultation Fee:
              </div>
              <div className="doctor-details-left-item-value">
                ₹{doctor.fee}
              </div>
            </div>
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>
        ❌
        </button>
      </div>
    </div>
  ) : null;
};

export default DoctorDetailsPopup;
