import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import axios from "axios";
import Chart from "react-apexcharts";
import { Navigate, useNavigate } from "react-router-dom";
import AddDoctor from "./addDoctor";
import DoctorDetailsPopup from "./DoctorDetailsPopup";

const Dashboard = ({ activeTab }) => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState([]);
  const [docCount, setDocCount] = useState(0);
  const [patCount, setPatCount] = useState(0);
  const [appCount, setAppCount] = useState(0);
  const [viewDoctor, setViewDoctor] = useState(null);
  const [isAddDoctorModalOpen, setAddDoctorModalOpen] = useState(false);
  const [searchCity, setSearchCity] = useState("");
  
  const navigate = useNavigate();

  const fetchPatient = async () => {
    try {
      let response = await fetch(`http://localhost:4500/users/getPatients?city=${searchCity}`);
      let result = await response.json();
      setPatients(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));
    if (!userData || userData.role !== "Admin") {
      navigate("/login", { replace: true });
    }
    const fetchPatient = async () => {
      try {
        let response = await fetch("http://localhost:4500/users/getPatients");
        let result = await response.json();
        setPatients(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPatient();

    const fetchDoctor = async () => {
      try {
        let response = await fetch("http://localhost:4500/doctors/getDoctors");
        let result = await response.json();
        setDoctors(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDoctor();

    const fetchFeedback = async () => {
      try {
        let response = await fetch(
          "http://localhost:4500/feedback/getfeedback"
        );
        let result = await response.json();
        setFeedbackList(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchFeedback();

    const fetchAppointment = async () => {
      try {
        let response = await fetch(
          "http://localhost:4500/appointments/getAppointments"
        );
        let result = await response.json();
        setAppointments(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAppointment();

    const fetchCount = async () => {
      try {
        let response = await fetch("http://localhost:4500/users/getCount");
        let result = await response.json();
        setCount(result);
        console.log(
          "doctors",
          result[0][0].doctors,
          "patients",
          result[1][0].patients,
          "appoinments",
          result[2][0].appoinments
        );
        // setCount
        setDocCount(result[0][0].doctors);
        setPatCount(result[1][0].patients);
        setAppCount(result[2][0].appoinments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCount();
  }, []);

  const handleDeleteDoctor = (docEmail, id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(
          `http://localhost:4500/doctors/deleteDoctor?email=${docEmail}&id=${Number(
            id
          )}`
        )
        .then((res) => {
          alert("Doctor successfully deleted!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeletePatient = (email, id) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(
          `http://localhost:4500/users/deleteUser?email=${email}&id=${Number(
            id
          )}`
        )
        .then((res) => {
          alert("Patient successfully deleted!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const handleDeleteFeedback = (id) => {
  //   if (window.confirm("Are you sure?")) {
  //     axios
  //       .delete(
  //         `http://localhost:4500/feedback/deleteFeedback?id=${Number(id)}`
  //       )
  //       .then((res) => {
  //         alert("Feedback successfully deleted!");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const openAddDoctorModal = () => {
    setAddDoctorModalOpen(true);
  };

  const closeAddDoctorModal = () => {
    setAddDoctorModalOpen(false);
  };

  const handleViewDoctorDetails = (doctor) => {
    setViewDoctor(doctor);
  };

  const handleCloseViewDoctor = () => {
    setViewDoctor(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <div >
            <div className="home-container">
              <div className="stat-card doc-stat-card">
                <h3>Total Doctors</h3>
                <p>{docCount && docCount}</p>
              </div>
              <div className="stat-card pat-stat-card">
                <h3>Total Patients</h3>
                <p>{patCount && patCount}</p>
              </div>
              <div className="stat-card app-stat-card">
                <h3>Total Appointments</h3>
                <p>{appCount && appCount}</p>
              </div>

              <div className="barGaraph">
                <Chart
                  className="chart-container"
                  options={{
                    chart: {
                      id: "basic-bar",
                    },
                    xaxis: {
                      categories: ["Doctors", "Patients", "Appointments"],
                    },
                  }}
                  series={[
                    {
                      name: "Total",
                      data: [docCount, patCount, appCount],
                    },
                  ]}
                  type="bar"
                  width="400"
                />
              </div>
            <div className="donut-chart-container">
              <div className="donut-chart">
                <Chart
                  options={{
                    labels: ["Doctors", "Patients", "Appointments"],
                    legend: {
                      position: "bottom",
                    },
                  }}
                  series={[docCount, patCount, appCount]}
                  type="donut"
                  width="380"
                />
              </div>
            </div>
            </div>
          </div>
        );

      case "doctors":
        return (
          <div>
            <div>
              <h2 className="docs">Doctors</h2>
              <button className="AddDoc-btn" onClick={openAddDoctorModal}>
                Add Doctor
              </button>
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

                      <button
                        className="view-btn"
                        onClick={() => handleViewDoctorDetails(doctor)}
                      >
                        View Doctor
                      </button>

                      <button
                        onClick={() =>
                          handleDeleteDoctor(doctor.docEmail, doctor.id)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "patients":
        return (
          <div>
            {" "}
            <div>
              <h2 className="pats">Patients</h2>
               {/* Search by City */}
      <div className="search-by-city">
        <input
          type="text"
          placeholder="Search patients by city"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
        />
        <button onClick={fetchPatient}>Search</button>
      </div>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.id}</td>
                      <td>{patient.name}</td>
                      <td>{patient.email}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.city}</td>
                      <td>{patient.address}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeletePatient(patient.email, patient.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "appointments":
        return (
          <div>
            {" "}
            <div>
              <h2 className="apps">Appointments</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Doctor Name</th>
                    <th>Doctor Email</th>
                    <th>Patient Name</th>
                    <th>Patient Email</th>
                    <th>Date</th>
                    <th>Time Slot</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.doctorEmail}</td>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.patientEmail}</td>
                      <td>{new Date(appointment.date).toLocaleDateString()}</td>
                      <td>{appointment.slot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "feedback":
        return (
          <div>
            <div>
              <h2 className="feeds">Feedback</h2>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Author</th>
                    <th>Auther's Email</th>
                    <th>Doctor's Email</th>
                    <th>Feedback</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {feedbackList.map((feedback) => (
                    <tr key={feedback.id}>
                      <td>{feedback.id}</td>
                      <td>{feedback.patientName}</td>
                      <td>{feedback.patientEmail}</td>
                      <td>{feedback.doctorEmail}</td>
                      <td>{feedback.feedback}</td>
                      {/* <td>
                        <button
                          onClick={() => handleDeleteFeedback(feedback.id)}
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-content">
      <div className="content">{renderContent()}</div>

      {/* Add Doctor Modal */}
      {isAddDoctorModalOpen && <AddDoctor onClose={closeAddDoctorModal} />}

      {viewDoctor && (
        <DoctorDetailsPopup
          doctor={viewDoctor}
          onClose={handleCloseViewDoctor}
        />
      )}
    </div>
  );
};

export default Dashboard;
