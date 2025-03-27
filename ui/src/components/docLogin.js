import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from "../img/doc-login.png";
import "../css/doclogin.css";

const DocLogin = () => {
  const [docEmail, setDocEmail] = useState("");
  const [docPassword, setDocPassword] = useState("");
  const navigate = useNavigate();

  const docLogin = async (e) => {
    e.preventDefault();
    let loginData = {
      "docEmail": docEmail,
      "docPassword": docPassword,
    };
    let message;
    try {
      await axios.post(`http://localhost:4500/login/docLogin`, loginData)
        .then(async response => {
          console.log(response, 'response');
          message = response.data.message;

          // console.log(response.status === 200 , response.data.message === "Login Successfull!!", 'response.status === 200 && response.data.message === "Login Successful!!"');

          if ( response.status === 200 && response.data.message === "Login Successfull!!" ) {

            // console.log(response, 'response2');
            await axios.get( `http://localhost:4500/doctors/getDoctorbyEmail?email=${docEmail}`).then(async (userData) => {
                message = userData.data.message;
                console.log(userData.data[0], 'userData');

                if (userData.data.length > 0) {
                  localStorage.setItem("userInfo", JSON.stringify(userData.data[0]));
                  alert(response.data.message);
                  navigate('/', { replace: true });
                  // window.location.reload();
                }
                else {
                  alert(response.data.message);
                  navigate('/docLogin', { replace: true });
                  window.location.reload();
                }
            } );
          }
          // else{
          //   console.log(response, 'response3');
          //   alert(response.data.message);
          //   navigate('/docLogin', { replace: true });
          //   //window.location.reload();
          // }
        });
    } catch (err) {
      alert(err.message);
      return;
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userData, 'userData');
    if (userData) {
      navigate('/', { replace: true });
    } else {
      localStorage.clear('userInfo');
      navigate('/docLogin', { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="login-page">
        <div className="login-overlap-wrapper">
          <div className="login-overlap">
          <img className="login-img" alt="Login img" src={loginimg} />
            {/* FORM */}
            <form autoComplete="off" className="login-form" onSubmit={docLogin}>
              <div className="login-part">
                <button type="submit" className="login-btn">
                  Log In
                </button>

                <div className="doc-login-heading">Doctor Log In</div>

                <div className="password-box">
                  <input
                    className="enter-your-password"
                    type="password"
                    placeholder="Password"
                    value={docPassword}
                    required
                    onChange={(e) => {
                      setDocPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="email-box">
                  <input
                    className="enter-your-email"
                    type="text"
                    placeholder="Email"
                    value={docEmail}
                    required
                    onChange={(e) => {
                      setDocEmail(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocLogin;
