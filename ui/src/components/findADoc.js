import React, { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";
import axios from "axios";
import "../css/findADoc.css";
import location from "../img/location.png";
import AppointmentFormPopup from "./AppointmentFormPopup";
import DoctorDetailsPopup from "./DoctorDetailsPopup";
import noDoc from "../img/noDoc.png";

const FindADoc = () => {
  const [docCity, setDocCity] = useState("");
  const [docof, setDoc] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [filteredDoctorData, setFilteredDoctorData] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [handleClosePopup, setHandleClosePopup] = useState(false);
  const [viewDoctor, setViewDoctor] = useState(null);

  useEffect(() => {
    console.log("Doctor Data:", doctorData);
    console.log("Selected Specialty:", docof);
    linearSearchDoctors(docof);
  }, [doctorData, docof]);

  const calculateAverageRating = (feedbacks) => {
    if (!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0) {
      return 0;
    }
    let totalRating = 0;
    for (const feedback of feedbacks) {
      totalRating += feedback.starRating || 0;
    }
    const averageRating = totalRating / feedbacks.length;
    return isNaN(averageRating) ? 0 : averageRating;
  };

  const getDocByCityAndSpeciality = async (city, speciality) => {
    try {
      let docdata = await axios.get(
        `http://localhost:4500/doctors/doctorsByCityAndSpeciality?docCity=${city}&docof=${speciality}`
      );

      // Fetch feedback for each doctor
      const doctorsWithFeedback = await Promise.all(
        docdata.data.map(async (doc) => {
          try {
            const response = await axios.get(
              `http://localhost:4500/feedback/getFeedbackForDoctor?doctorEmail=${doc.docEmail}`
            );
            return { ...doc, feedback: response.data };
          } catch (error) {
            console.error("Error fetching feedbacks for doctor:", error);
            return doc; // Return the doctor without feedback in case of an error
          }
        })
      );

      // Calculate starRating for each doctor
      const doctorsWithStarRating = doctorsWithFeedback.map((doc) => ({
        ...doc,
        starRating: calculateAverageRating(doc.feedback),
      }));

      setDoctorData(doctorsWithStarRating);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const linearSearchDoctors = (speciality) => {
    const filteredDoctors = doctorData.filter((doc) => doc.docof === speciality);
    setFilteredDoctorData(filteredDoctors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getDocByCityAndSpeciality(docCity, docof);
    linearSearchDoctors(docof);
  };

  const handleViewDoctorDetails = (doctor) => {
    setViewDoctor(doctor);
  };

  const handleCloseViewDoctor = () => {
    setViewDoctor(null);
  };

  return (
    <>
      <div className="team">
        <div className="div">
          <div className="banner">
            <div className="team-overlap-group">
              <div className="text-wrapper">Find A Doctor</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="doc-search">
            <div className="search-overlap">
              <div className="find-a-doctor">Find a Doctor</div>

              <form autoComplete="off" className="search-form" onSubmit={handleSubmit}>
                {/* docCity option */}
                <img className="location" src={location} alt="location" />
                <div className="city-option-tab">
                  <select
                    className="DocCity"
                    value={docCity}
                    onChange={(e) => {
                      setDocCity(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Select City
                    </option>
                    <option value="Raxaul">Raxaul</option>
                    <option value="Birgunj">Birgunj</option>
                    <option value="Sitamarhi">Sitamarhi</option>
                  </select>
                    
                </div>

                <div className="speciality-option-tab">
                  <select
                    className="DocOf"
                    value={docof}
                    onChange={(e) => {
                      setDoc(e.target.value);
                    }}
                  >
                    <option value="" disabled hidden>
                      Select Speciality
                    </option>
                    <option value="Surgon">Surgon</option>
                    <option value="Physician">Physician</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Cardiologist">Cardiologist</option>
                  </select>
                </div>

                <button type="submit" className="search-button">
                  Search
                </button>
              </form>
            </div>
          </div>

          {Array.isArray(doctorData) && doctorData.length > 0 ? (
  doctorData
    .filter((doc) => doc.docof === docof)
    .map((doc, index) => (
      <div key={index} className="doc-team">
        <div className="row">
          <div className="doc">
            <div className="doc-content">
              <div className="image">
                <img
                  className="doc-img"
                  src={`http://localhost:4500/images/${doc.pic}`}
                  alt="Doctor"
                />
              </div>
              <div className="card-body">
                <Rating
                  value={doc.starRating}
                  count={5}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false}
                />
                <div className="card-title">Dr.{doc.docName}</div>
                <div className="card-text">({doc.docof})</div>

                <button
                  className="view-btn"
                  onClick={() => handleViewDoctorDetails(doc)}
                >
                  View Doctor
                </button>
                <button
                  className="bookbtn"
                  onClick={() => {
                    console.log("Selected Doctor:", doc);
                    setSelectedDoctor(doc);
                  }}
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
) : (
  <div className="no-doctors">
    <p className="no-doctors-message">
      No doctors available in the selected city with the chosen specialty.
      </p>
    <img className="no-doc" src={noDoc} alt="No Doctors" />
  </div>
)}

        </div>

        {selectedDoctor && (
          <AppointmentFormPopup
            onClose={() => setSelectedDoctor(handleClosePopup)}
            selectedDoctor={selectedDoctor}
          />
        )}

        {viewDoctor && (
          <DoctorDetailsPopup
            doctor={viewDoctor}
            onClose={handleCloseViewDoctor}
          />
        )}
      </div>
    </>
  );
};

export default FindADoc;
