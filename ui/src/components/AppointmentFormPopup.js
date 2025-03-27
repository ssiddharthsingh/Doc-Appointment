// AppointmentFormPopup.js
import React, { useState } from "react";
import "../css/AppointmentFormPopup.css";
import axios from "axios";
import { useEffect } from "react";
import bookform from "../img/bookform.png";
import CheckoutForm from "./CheckoutForm.js";

const AppointmentFormPopup = ({ onClose, selectedDoctor }) => {
  const [auth, setAuth] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const timeSlots = ["10am-12pm", "12pm-02pm", "02pm-04pm"];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    setAuth(userData);

    if (!userData) {
      alert("Please log in first to book an appointment.");
      onClose();
      return;
    }

    if (userData.role && userData.role === "doctor") {
      alert("Doctors cannot book appointments.");
      onClose();
    }

    if (userData.email) {
      setEmail(userData.email);
    }

    if (userData.name) {
      setName(userData.name);
    }
  }, [onClose]);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();

    // Check if the user already has an appointment in the selected slot on the selected date with the selected doctor
    try {
      const existingAppointmentsResponse = await axios.get(
        `http://localhost:4500/appointments/getAppointmentsByPatientEmail?patientEmail=${email}`
      );

      const existingAppointments = existingAppointmentsResponse.data;

      const hasConflict = existingAppointments.some((appointment) => {
        return (
          appointment.doctorEmail === selectedDoctor.docEmail &&
          appointment.date === date &&
          appointment.slot === slot
        );
      });

      if (hasConflict) {
        alert(
          "You already have an appointment in this slot on the selected date with the selected doctor. Please choose another slot or date."
        );
        return;
      }

      // Proceed to submit the new appointment
      const appointmentData = {
        doctorName: selectedDoctor.docName,
        doctorEmail: selectedDoctor.docEmail,
        patientName: name,
        patientEmail: email,
        date,
        slot,
      };

      await axios.post(
        "http://localhost:4500/appointments/createAppointment",
        appointmentData
      );

      alert("Appointment booked successfully!");
      setShowCheckoutForm(true);
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Error submitting appointment:", error);

      if (error.response) {
        console.log("Response data:", error.response.data);
      } else {
        console.log("No response from the server");
      }
    }
  };

  return auth && auth.role !== "doctor" ? (
    <div className="popup">
      <div className="popup-content">
        <h2 className="formheader">Book an Appointment</h2>
        <div className="form-container">
          <div className="image-container">
            <img className="bookform" src={bookform} alt="Book Form" />
          </div>
          <div className="form">
            {showCheckoutForm ? (
              <CheckoutForm
                appointmentData={{
                  doctorName: selectedDoctor.docName,
                  doctorEmail: selectedDoctor.docEmail,
                  patientName: name,
                  patientEmail: email,
                  date,
                  slot,
                }}
                onClose={() => setShowCheckoutForm(false)}
              />
            ) : (
              <form onSubmit={handleAppointmentSubmit}>
                <h3>
                  Doctor: <span>+Dr.{selectedDoctor.docName}</span>
                </h3>
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly
                  required
                />

                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                  required
                />

                <label htmlFor="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />

                <label htmlFor="time">Preferred Time Slot</label>
                <div className="time-slots">
                  {timeSlots.map((timeSlot) => (
                    <button
                      key={timeSlot}
                      type="button"
                      className={`time-slot-button ${
                        timeSlot === slot ? "selected" : ""
                      }`}
                      onClick={() => setSlot(timeSlot)}
                      required
                    >
                      {timeSlot}
                    </button>
                  ))}
                </div>

                <div className="buttons-container">
                  <button
                    className="proceed-to-pay"
                    type="button"
                    onClick={() => {
                      // Check if required fields are filled before proceeding to pay
                      if (!date || !slot) {
                        alert(
                          "Please fill in the required date and time slot."
                        );
                      } else {
                        setShowCheckoutForm(true);
                      }
                    }}
                  >
                    Proceed to Pay
                  </button>
                  <h4>Fee: ₹{selectedDoctor.fee}</h4>
                  <button className="cancel" onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default AppointmentFormPopup;
