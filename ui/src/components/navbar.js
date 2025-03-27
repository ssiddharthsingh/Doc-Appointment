import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../img/profile.svg";

import "../css/navbar.css";


const Navbar = () => {
  const [auth, setAuth] = useState();
  const navigate = useNavigate();

  var userName = JSON.parse(localStorage.getItem("userInfo"));

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    setAuth(userData);
    if (userData) {
      setAuth(userData)
      const userRole = userData.role;
      // localStorage.setItem("userInfo",JSON.stringify(userData))
      // navigate('/',{replace:true});
    }
    else {
      localStorage.clear('userInfo');
    }
  }, [navigate])

  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    window.location.reload();
  }




  return (
   <>
      <div className="box">
        <header className="header">
          <div className="navbar">
            <div className="logo">
              <p className="med-care">
                <Link to="/" className="plusSign">+</Link>
                <Link to="/" className="SiteTitle">Dr.Point</Link>
              </p>
            </div>

            <div className="left-menu">
              <div className="sepration-box">
                <div className="sepration">
                  <Link to="/findADoc" className="find-a-doc"> Find A Doctor </Link>
                </div>
              </div>
            </div>

            <div className="dropdown-container">
              <button className="dropdown-button" onClick={toggleDropdown}>
              {auth ? (auth.role === "Doctor" ? userName.docName : userName.name) : "Login"}
              </button>

              {isDropdownOpen && (
                <ul className="dropdown">
                  {!auth && (
                    <>
                      <li>
                        <Link to="/login" className="dropdown-option">
                          User Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/doclogin" className="dropdown-option">
                          Doctor Login
                        </Link>
                      </li>
                    </>
                  )}
                  {auth && (
                    <>
                      <li>
                        <img className="profile" src={profile} alt="profile" />
                        <Link to="/MyProfile" className="dropdown-option-2">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-option-2" onClick={logoutUser}>
                          Logout
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </div>
        </header>
      </div>
    </>


  );
};

export default Navbar;
