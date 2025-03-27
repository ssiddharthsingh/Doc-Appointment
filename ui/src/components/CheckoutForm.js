// CheckoutForm.js

import React from "react";
import axios from "axios";

const CheckoutForm = ({ appointmentData, onClose }) => {
  const handlePayment = async () => {
    try {
      // Validate required fields before processing the payment
      const cardNumber = document.querySelector('.cardNumber').value;
      const expDate = document.querySelector('.Expdate').value;
      const cvv = document.querySelector('.cvv').value;
      const cardName = document.querySelector('.CardName').value;

      if (!cardNumber || !expDate || !cvv || !cardName) {
        alert("Please fill in all the required payment fields.");
      } else {
        // Process the payment using your chosen payment gateway
        // For demonstration purposes, we'll simulate a successful payment
        alert("Payment processed successfully!");

        // Submit the appointment form data after successful payment
        await axios.post(
          "http://localhost:4500/appointments/createAppointment",
          appointmentData
        );

        alert("Appointment booked successfully!");
        onClose(); // Close the checkout form after processing payment and submitting the appointment form
      }
    } catch (error) {
      console.error("Error processing payment:", error);
  
      if (error.response) {
        console.log("Payment response data:", error.response.data);
      } else {
        console.log("No response from the payment server");
      }
    }
  };
  

  return (
    <div className="checkout-form">
      <h2>Checkout Form</h2>
      {/* Display the appointment details for confirmation */}
      <p>Doctor: {appointmentData.doctorName}</p>
      <p>Date: {appointmentData.date}</p>
      <p>Time Slot: {appointmentData.slot}</p>
      

      {/* Add your payment form fields and logic here */}
        <input
        className="cardNumber"
            type="text"
            placeholder="Card Number"
            name="cardNumber"
            onInput={(event) => {
                event.target.value = event.target.value
                    .replace(/\D/g, "") // Remove non-digit characters
                    .replace(/(.{4})/g, "$1 ") // Add a space after every 4 characters
                    .trim(); // Remove leading/trailing spaces
            }}
            required
        />
        <input className="Expdate" type="month" placeholder="Expiry Date" required/>
        <input
        className="cvv"
            type="password"
            placeholder="CVV"
            maxLength="3"
            onInput={(event) => {
                event.target.value = event.target.value.replace(/\D/g, "").slice(0, 3);
            }}
            required
        />
        <input className="CardName" type="text" placeholder="Name on Card" />
        {/* End of payment form fields */}
      <button className="pay-button" onClick={handlePayment}>
        Pay Now 
      </button>
      <button className="back" onClick={onClose}>
      Back
      </button>
    </div>
  );
};

export default CheckoutForm;
