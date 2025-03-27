import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/MyProfile.css";
import axios from 'axios';
import EditForm from './editForm';
// eslint-disable-next-line
// Import React Slick
import FeedbackForm from './feedBackForm';

import FeedbackCarousel from './feedbackCarousel';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MyProfile = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [feedbackFormVisible, setFeedbackFormVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);



  var userData = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    var userData = JSON.parse(localStorage.getItem('userInfo'));
    setAuth(userData);
    console.log('userData:', userData);
    // Check if user data is available
    if (!userData) {
      // If not, clear localStorage and navigate to the home page
      localStorage.removeItem('userInfo');
      navigate('/', { replace: true });
    } else {
      // If user data is available, check the user's role
      if (userData.role === 'Doctor') {
        // If the user is a doctor, retrieve doctor-specific data
        getDocAppointments(userData.docEmail);
        getFeedbackForDoctor(userData.docEmail);
      } else {
        // If the user is not a doctor, retrieve general user data
        getAppointments(userData.email);
      }
    }

    // eslint-disable-next-line
  }, []);

  // const convertTo12HourFormat = (time) => {
  //   const [hours, minutes] = time.split(":");
  //   const period = hours >= 12 ? "PM" : "AM";
  //   const formattedHours = hours % 12 || 12;
  //   return `${formattedHours}:${minutes} ${period}`;
  // };

  const getAppointments = async () => {
    try {
      let auth = JSON.parse(localStorage.getItem("userInfo"));
      console.log('Fetching appointments for:', auth.Email);

      const response = await axios.get(`http://localhost:4500/appointments/getPatientAppointments?patientEmail=${auth.email}`);
      console.log('Appointments data:', response.data);
      if (response.data && response.data.length > 0) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };



  const cancelAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:4500/appointments/cancelAppointment/${id}`);
      // Refresh appointments after cancellation
      getAppointments(auth.email);
      window.location.reload(true);
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const getDocAppointments = async () => {
    try {
      let auth = JSON.parse(localStorage.getItem("userInfo"));
      console.log('Fetching appointments for Doc:', auth.email);

      const response = await axios.get(`http://localhost:4500/appointments/getDocAppointments?doctorEmail=${auth.docEmail}`);
      console.log('Appointments data:', response.data);

      if (response.data && response.data.length > 0) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const showFeedbackForm = (doctorEmail) => {
    localStorage.setItem("feedbackDoctor", doctorEmail);
    setSelectedDoctor(doctorEmail);
    setFeedbackFormVisible(true);
  };

  const getFeedbackForDoctor = async (doctorEmail) => {
    try {
      const response = await axios.get(`http://localhost:4500/feedback/getFeedbackForDoctor?doctorEmail=${doctorEmail}`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks for doctor:', error);
    }
  };

  const carouselSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1

  };

  const openEditForm = () => {
    setIsEditFormVisible(true);
  };

  const closeEditForm = () => {
    setIsEditFormVisible(false);
  };

  const handleEditFormSave = (editedData) => {
    // Implement logic to save edited data (e.g., send a request to update user data)
    console.log('Edited data:', editedData);

    // Close the edit form
    closeEditForm();
  };



  return (
    <>
      {auth.role === 'Doctor' && (
        <div className="profileContainer">
          <h1 className="profileTitle">My Profile</h1>
          <div className='profilePic'>
            <div className='profilePicContainer'>
              <img className='userimg' src={`http://localhost:4500/images/${auth.pic}`} alt="pp" />
            </div>
            <button className="edit-btn" onClick={openEditForm}>
            Edit
            </button>

            <div className='username'>
              <h2> Dr. {userData.docName}</h2>
            </div>
            <div className='UserInfo'>
              <table className='user-table'>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>Dr. {userData.docName}</td>
                  </tr>
                  <tr>
                    <td>Speciality</td>
                    <td>{userData.docof}</td>
                  </tr>
                  <tr>
                    <td>Experience</td>
                    <td>{userData.docExp} years</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userData.docEmail}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{(userData.city === "Birgunj" || userData.docCity === "Birgunj") ? "+977" : "+91"} {userData.docPhone}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{userData.docCity}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{userData.docAddress}</td>
                  </tr>
                  


                </tbody>
              </table>
            </div>

            {/* Appointments Table */}

            <div className='appointments'>
              <h2>My Appointments</h2>
              {appointments.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                <table className='appointment-table'>
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Patient's Email</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.patientEmail}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{appointment.slot}</td>
                        <td>
                          <button className='cancel' onClick={() => cancelAppointment(appointment.id)}>
                            Cancel Appointment
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Appointment Table Ends */}

          {/* feedback */}

          <div className="feedback-carousel">
            <h2>Feedbacks</h2>
            {feedbacks.length === 0 ? (
              <p>No feedbacks yet.</p>
            ) : (
              <FeedbackCarousel feedbacks={feedbacks} carouselSettings={carouselSettings} />
            )}

            {/* feedback ends */}

            {/* Edit Form */}
            {isEditFormVisible && (
              <EditForm
                userData={auth}
                onSave={handleEditFormSave}
                onCancel={closeEditForm}
              />
            )}
          </div>
        </div>
      )}

      {auth.role === 'Patient' && (
        <div className="profileContainer">
          <h1 className="profileTitle">My Profile</h1>
          <div className='profilePic'>
            <div className='profilePicContainer'>
              <img className='userimg' src={`http://localhost:4500/images/${auth.pic}`} alt="pp" />
            </div>
            <button className="edit-btn" onClick={openEditForm}>
              Edit
            </button>

            <div className='username'>
              <h2>{userData.name}</h2>
            </div>
            <div className='UserInfo'>
              <table>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{userData.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{userData.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{(userData.city === "Birgunj" || userData.docCity === "Birgunj") ? "+977" : "+91"} {userData.phone}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{userData.city}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{userData.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='appointments'>
              <h2>My Appointments</h2>
              {appointments.length === 0 ? (
                <p>No Appointments For Today</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Doctor's Email</th>
                      <th>Date</th>
                      <th>Time Slot</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td>Dr. {appointment.doctorName}</td>
                        <td>{appointment.doctorEmail}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{appointment.slot}</td>
                        <td>

                          <button className='feedback-btn' onClick={() => showFeedbackForm(appointment.doctorEmail)}>Give Feedback</button>

                          <button className='cancel' onClick={() => cancelAppointment(appointment.id)}>
                            Cancel Appointment
                          </button>
                        </td>
                      </tr>
                    ))}
                    {selectedDoctor && feedbackFormVisible && (
                      <FeedbackForm doctorEmail={selectedDoctor.doctorEmail} onClose={() => setFeedbackFormVisible(false)} />
                    )}
                  </tbody>
                </table>
              )}
              {/* Edit Form */}
              {isEditFormVisible && (
                <EditForm
                  userData={auth}
                  onSave={(editedData) => {
                    // Implement logic to save edited data (e.g., send a request to update user data)
                    console.log('Edited data:', editedData);
                    // Close the edit form
                    closeEditForm();
                  }}
                  onCancel={closeEditForm}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default MyProfile
