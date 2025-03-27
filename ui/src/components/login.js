import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from "../img/login.png";
import "../css/login.css";


const Login = () => {
  const [userEmail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const login = async (e) => {
    e.preventDefault();
    let loginData = {
      "email": userEmail,
      "password": password
    }
    let message;
    try{
      await axios.post(`http://localhost:4500/login/userLogin`, loginData).then(async response => {
        console.log(response,'response')
        message = response.data.message;
        
        if (response.status === 200 && response.data.message === 'Login Successfull!!') {
          alert(response.data.message);
          await axios.get(`http://localhost:4500/users/getUserbyEmail?email=${userEmail}`).then(async (userData) => {
            message = userData.data.message;
            console.log(userData.data[0], 'userData');

            if (userData.data.length > 0) {
              localStorage.setItem("userInfo", JSON.stringify(userData.data[0]))
            navigate('/', { replace: true });
            window.location.reload();
            }
            else {
              alert(response.data.message);
              navigate('/login', { replace: true });
              window.location.reload();
            }
          })
        }
      })
    }
    catch(err){
      alert("Invalid Credentials")
      return;
    }

  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userData, 'userData')
    if (userData) {
      navigate('/', { replace: true });
      // window.location.reload();
    }
    else {
      localStorage.clear('userInfo')
      navigate('/login', { replace: true });
    }
  }, [navigate])


  return (
    <>
      <div className="login-page">
        <div className="login-overlap-wrapper">
          <div className="login-overlap">
            <div className="headlins">
              <div className="NewHere">New Here?</div>
              <p className="sub-headline">
                Join us to unlock a world of convenience and control over your healthcare journey.
              </p>
            </div>
          
            <button className="sign-up-btn">
                <Link to="/signUp" className="sign-up"> Sign Up </Link>
            </button>

            <img className="login-img" alt="Login img" src={loginimg} />

            {/* FORM */}

            <form autoComplete='off' className="login-form" onSubmit={login}>

              <div className="login-part">

               
                  <button type="submit" className="login-btn" >Log In</button>
                  {/* <div className="login-txt">Log In</div> */}
                

                <div className="login-heading">Log In</div>

                <div className="password-box">
                  <input className="enter-your-password" type="password" placeholder="Password" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
                </div>

                <div className="email-box">
                  <input className="enter-your-email" type="text" placeholder="Email" value={userEmail} required onChange={(e) => { setUseremail(e.target.value) }} />
                </div>

              </div>
            </form>
            

          </div>
        </div>
      </div>
    </>
  );
}

export default Login