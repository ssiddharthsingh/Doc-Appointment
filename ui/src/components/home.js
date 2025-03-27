import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Navbar from './navbar';
import "../css/home.css";

import Doc1 from "../img/Doc1.png";
import Doc2 from "../img/Doc2.png";

import about_img from "../img/about-img.png";
import AboutIcon1 from "../img/AboutIcon.png";
import AboutIcon2 from "../img/AboutIcon2.png";

// import { ImageIcon } from "./ImageIcon";

const Home = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch doctors when the component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:4500/doctors/getDoctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  return (
    <>
      <div className="hero-section">
        <div className="tagline-container">
          <p className="tagline-text">
            Book Today,
            <br />
            Thrive Tomorrow
            <br />
            Your Health, Your Choice
          </p>

          <p className="sub-heading">
            Seamless Health Management: Book, Confirm, and Stay Healthy! Our
            website simplifies doctor appointments, putting you in control of
            your well-being.
          </p>
        </div>

        <button className="book-appointment-button" onClick={() => { window.location.href = "/findADoc"; }}>
          Book An Appointment
        </button>

        <img className="doctor-image-1" alt="Doc" src={Doc1} />
        <img className="doctor-image-2" alt="Doc" src={Doc2} />

        <div className="overlap-group">
          <div className="statistics-section">
            <div className="experience-stat">
              <div className="experience-number">30<span>+</span></div>
              <div className="experience-description">Years Of Experience</div>
            </div>

            <div className="locations-stat">
              <div className="locations-number">10<span>+</span></div>
              <div className="text-wrapper-5">Clinic Locations</div>
            </div>

            <div className="overlap-3">
              <div className="text-wrapper-6">100<span>%</span></div>
              <div className="text-wrapper-7">Patient Satisfaction</div>
            </div>

            {/* About Section */}
          </div>

          <div className="about-section">
            <div className="about-heading">
              <div className="about-content">
                <div className="about-div">
                  <div className="about-heading-2">
                    <p className="about-text-wrapper">
                      Your Wellness Journey Starts with a Click.
                    </p>
                    <div className="about-sub-text">
                      <div className="about-about-us">ABOUT US</div>
                    </div>
                  </div>
                  <p className="about-capitalize-on-low">
                    Explore a world of health at your fingertips as you embark
                    on a seamless wellness journey with just a click.
                    <br />
                    From personalized consultations to holistic treatments, your
                    path to well-being begins with a simple tap on your device.
                  </p>
                </div>
                <div className="about-div-2">
                  <div className="about-element">
                    <div className="about-icon">
                      <img className="about-icn" alt="Icon" src={AboutIcon1} />
                    </div>
                    <div className="about-text-wrapper-2">
                      Multi Speciality Pharma Treatment
                    </div>
                  </div>
                  <div className="about-element-2">
                    <div className="about-icon">
                      <img
                        className="about-icn-2"
                        alt="Icon"
                        src={AboutIcon2}
                      />
                    </div>
                    <div className="about-text-wrapper-3">
                      24 Hours Medical Service
                    </div>
                  </div>
                </div>
                {/* <button className="about-button">More About Us</button> */}
              </div>
            </div>
          </div>

          <div className="about-image">
            <img className="about-img" alt="About" src={about_img} />
          </div>
        </div>

        <div className="meet-our-doc">
          <div className="overlap-7">
            <div className="overlap-group-3">
              <div className="doc-heading">Meet our Doctors</div>
              <p className="doc-sub-heading">
                Discover experienced healthcare professionals dedicated to your
                well-being. Explore a diverse team of doctors committed to
                providing quality care and personalized attention.
              </p>
            </div>
            <div className="doc-card-group">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="card doc-card">
                  <div className="image">
                    <img
                      className="doc-img"
                      src={`http://localhost:4500/images/${doctor.pic}`}
                      alt="Doctor"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Dr. {doctor.docName}</h5>
                    <p className="card-text">{doctor.docof}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
