import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/slidebar.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [auth, setAuth] = useState();
  // const navigate = useNavigate();

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    setAuth(userData);
    if (userData) {
      setAuth(userData)
      // localStorage.setItem("userInfo",JSON.stringify(userData))
      // navigate('/',{replace:true});
    }
    else {
      localStorage.clear('userInfo');
    }
  }, [])

  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    window.location.reload();
  }

  return (
    <div className="sidebar">
        <div>
        <h1><span>+</span>Dr.Point</h1>
        </div>

        <div
        className={`tab ${activeTab === 'Home' ? 'active' : ''}`}
        onClick={() => setActiveTab('Home')}
        >
        Home
        </div>
        
      <div
        className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
        onClick={() => setActiveTab('doctors')}
      >
        Doctors
      </div>
      <div
        className={`tab ${activeTab === 'patients' ? 'active' : ''}`}
        onClick={() => setActiveTab('patients')}
      >
        Patients
      </div>
      <div
        className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
        onClick={() => setActiveTab('appointments')}
      >
        Appointments
      </div>
      <div
        className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
        onClick={() => setActiveTab('feedback')}
      >
        Feedback
      </div>
      <div className="logout-button" onClick={logoutUser}>
        Logout
      </div>

    </div>
  );
};

export default Sidebar;
