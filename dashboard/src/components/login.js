import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "../css/login.css";

import logincover from "../img/logincover.jpg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => {
    const passwordInput = document.getElementById("password");
    const checkbox = document.getElementById("check");

    if (checkbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  const login = async (e) => {
    e.preventDefault();
    let loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `http://localhost:4500/login/userLogin`, loginData);

      // if (
      //   response.status === 200 &&
      //   response.data.message === "Login Successfull!!"
      // ) {
      //   alert(response.data.message);
      //}
      const userData = await axios.get(
        `http://localhost:4500/users/getUserbyEmail?email=${email}`
      );

      if (userData.data.length > 0) {
        const userRole = userData.data[0].role;

        if (userRole === "Admin") {
          localStorage.setItem("userInfo", JSON.stringify(userData.data[0]));
          navigate("/", { replace: true });
          window.location.reload();
        } else {
          alert("Only Admin Can Login!!");
          navigate("/login", { replace: true });
          window.location.reload();
        }
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("invalid username or password ");
    }
  };

  // useEffect(() => {
  //   let userData = JSON.parse(localStorage.getItem("userInfo"));

  //   if (userData) {
  //     navigate("/newsshow", { replace: true });

  //   } else {
  //     localStorage.clear("userInfo");
  //     navigate("/login", { replace: true });

  //   }
  // }, [navigate]);

  return (
    <>
      <div className="login-cover">
        <img src={logincover} alt="login-cover" className="login-cover-img" />
      </div>
      <div className="login-container">
        
          <h2 className="login-head">+Dr.Point Admin</h2>
        
        <form onSubmit={login}>

            <label className="email-label" htmlFor="email"> Email </label>
            <input className="email-input" id="email" name="email" type="email" placeholder="Email" required value={email} onChange={(e) => { setEmail(e.target.value); }} />

            <label className="pass-label" htmlFor="password"> Password </label>
            <input className="pass-input" id="password" name="password" type="password" placeholder="************" required value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input type="checkbox" id="check" onClick={togglePassword} />
            <label htmlFor="check" className="check-text"> Show Password </label>
          
          
            <button className="logIn-btn"> Log In </button>
          
        </form>
      </div>
    </>
  );
};

export default Login;
