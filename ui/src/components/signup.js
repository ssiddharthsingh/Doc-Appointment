import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/signUp.css";
import axios from "axios";
import Signupimg from "../img/Signupimg.png";
import eye from "../img/eye.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [userEmail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setrole] = useState("");
  const [docOf, setDoc] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // const handlerole = (event) => {
  //   setrole(event.target.value);
  // };

  const checkEmail = async () => {
    // let emails = [];
    // if(emails.includes(email)) {
    //   return 1;
    // }
    // else return 0;
  };

  const validateEmail = (userEmail) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    return emailRegex.test(userEmail);
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (name === "" || !name) {
      alert("Name is missing");
      return;
    }
    if (userEmail === "" || !userEmail) {
      alert("Email is missing");
      return;
    }
    if (!validateEmail(userEmail)) {
      alert("Please enter a valid email addresss");
      return;
    }
    if (password === "" || !password) {
      alert("Any of the password field cannot be empty");
      return;
    }

    var result = await checkEmail();
    if (result === 1) {
      alert("Email you are trying to use is in use, please select another");
      return;
    }

    const images = new FormData();
    for (let i = 0; i < files.length; i++) {
      images.append("files", files[i]);
    }

    if (password) {
      await axios
        .post("http://localhost:4500/upload", images)
        .then(async (res) => {
          console.log("images", res);
          let body = {
            name: name,
            city: city,
            userEmail: userEmail,
            password: password,
            phone: phone,
            address: address,
            role: "Patient",
            pic: res.data.body.files[0],
          };
          await axios
            .post("http://localhost:4500/users/createUser", body)
            .then(async (result) => {
              if (
                result.status === 200 &&
                result.data.message === "User Data inserted."
              ) {
                alert("Account created successfully");
                await axios
                  .get(
                    `http://localhost:4500/users/getUserbyEmail?email=${userEmail}`
                  )
                  .then(async (userData) => {
                    console.log(userData.data[0], "userData");
                    if (userData.data.length > 0) {
                      // localStorage.setItem("userInfo", JSON.stringify(userData.data[0]))
                      navigate("/login", { replace: true });
                      window.location.reload();
                    } else {
                      alert(result.data.message);
                      navigate("/signup", { replace: true });
                      window.location.reload();
                    }
                  });
              } else {
                alert(result.data.message);
                navigate("/signup", { replace: true });
                window.location.reload();
              }
              console.log(result.data.message, result.status);
            });
        })
        .catch((err) => {
          alert(err);
          navigate("/signup", { replace: true });
          window.location.reload();
        });
    }
  };

  // handle file inputs
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      let files = e.target.files;
      let x = [];
      for (let i = 0; i < files.length; i++) {
        x.push(files[i]);
      }
      setFiles(x);
      console.log("files:", x);
    }
  };

  // Show password
  const togglePassword = () => {
    const passwordInput = document.getElementById("password");
    const checkbox = document.getElementById("check");

    if (checkbox.checked) {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userInfo"));

    if (userData) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="signup-page">
        <div className="signup-overlap-wrapper">
          <div className="signup-overlap">
            <img className="Signupimg" alt="signupimg" src={Signupimg} />
            <button className="loginbtn">
              <Link to="/login" className="log-in-txt">
                {" "}
                Login{" "}
              </Link>
            </button>

            <p className="signup-sub-heading">
              Log in for personalized healthcare recommendations and a seamless
              appointment booking experience tailored to your needs
            </p>
            <div className="oneOfUs">One Of Us?</div>

            <form autoComplete="off" className="sign-up-form" onSubmit={signUp}>
              <div className="sign-up-part">
                <button type="submit" className="signup-btn">
                  Sign Up
                </button>

                <input
                  className="name-box inputbox"
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <input
                  className="emailbox inputbox"
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setUseremail(e.target.value);
                  }}
                />

                <input
                  className="passwordbox inputbox"
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <input
                  type="checkbox"
                  id="check"
                  className="show-password-checkbox"
                  onClick={togglePassword}
                />
                <label htmlFor="check" className="check-text">
                  {" "}
                  <img 
                    src={eye}
                    alt="eye"
                    className="eye"
                  />
                  {" "}
                </label>

                <div className="address-box inputbox">
                  <select
                    className="city"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Select City
                    </option>

                    <option value="Raxaul">Raxaul</option>
                    <option value="Birgunj">Birgunj</option>
                    <option value="Sitamarhi">Sitamarhi</option>
                  </select>
                </div>

                <input
                  className="second-address-box inputbox"
                  placeholder="Address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />

                <input
                  className="phone-box inputbox"
                  placeholder="Phone Number"
                  required
                  pattern="\d{10}"
                  title="Please enter a 10-digit phone number"
                  onChange={(e) => {
                    // Ensure only numbers are entered
                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                    // Limit to 10 characters
                    const truncatedValue = onlyNumbers.slice(0, 10);
                    setPhone(truncatedValue);
                  }}
                />

                <div className="form-group">
                  <label htmlFor="files" className="file">
                    <input
                      className="pic"
                      type="file"
                      id="files"
                      name="files"
                      multiple
                      onChange={handleFileChange}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                  </label>
                </div>

                <div className="sign-up-heading">Sign Up</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
