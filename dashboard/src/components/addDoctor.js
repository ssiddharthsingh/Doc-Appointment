import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/addDoctor.css";

import axios from "axios";

const AddDoctor = ({ onClose }) => {
  const [docName, setdocName] = useState("");
  const [docCity, setdocCity] = useState("");
  const [docEmail, setdocEmail] = useState("");
  const [docPassword, setdocPassword] = useState("");
  const [docPhone, setdocPhone] = useState("");
  const [address, setAddress] = useState("");
  const [docof, setDoc] = useState("");
  const [docExp, setDocExp] = useState("");
  const [docQuali, setDocQuali] = useState("");
  const [files, setFiles] = useState([]);
  const [fee, setFee] = useState("");
  const navigate = useNavigate();

  // const handlerole = (event) => {
  //   setrole(event.target.value);
  // };

  const validateEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Validate password length or any other requirements
    return password.length >= 6;
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Use a regular expression for basic phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const checkdocEmail = async () => {
    // let emails = [];
    // if(emails.includes(email)) {
    //   return 1;
    // }
    // else return 0;
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (docName === "" || !docName) {
      alert("Name is missing");
      return;
    } else if (docEmail === "" || !docEmail) {
      alert("Email is missing");
      return;
    } else if (docPassword === "" || !docPassword) {
      alert("The password field cannot be empty");
      return;
    }

    if (!validateEmail(docEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!validatePassword(docPassword)) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Phone number validation
    if (!validatePhoneNumber(docPhone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    var result = await checkdocEmail();
    if (result === 1) {
      alert("Email you are trying to use is in use, please select another");
      return;
    }

    const images = new FormData();
    for (let i = 0; i < files.length; i++) {
      images.append("files", files[i]);
    }

    if (docPassword) {
      await axios
        .post("http://localhost:4500/upload", images)
        .then(async (res) => {
          console.log("images", res);
          let body = {
            docName: docName,
            docEmail: docEmail,
            docPassword: docPassword,
            docPhone: docPhone,
            docCity: docCity,
            docAddress: address,
            docExp: docExp,
            docQuali: docQuali,
            docof: docof,
            pic: res.data.body.files[0],
            role: 'Doctor',
            fee: fee,
          };
          await axios
            .post("http://localhost:4500/doctors/createDoctor", body)
            .then(async (result) => {
              if (
                result.status === 200 &&
                result.data.message === "doctor Data inserted."
              ) {
                alert(result.data.message);
                await axios
                  .get(
                    `http://localhost:4500/doctors/getDoctorbyEmail?docEmail=${docEmail}`
                  )
                  .then(async (docData) => {
                    console.log(docData.data[0], "docData");
                    if (docData.data.length > 0) {
                      // localStorage.setItem("userInfo", JSON.stringify(docData.data[0]))
                      // navigate('/login', { replace: true });
                      window.location.reload();
                    } else {
                      alert(result.data.message);
                      // navigate('/signup', { replace: true });
                      window.location.reload();
                    }
                  });
              } else {
                alert(result.data.message);
                // navigate('/signup', { replace: true });
                window.location.reload();
              }
              console.log(result.data.message, result.status);
            });
        })
        .catch((err) => {
          alert(err);
          //   navigate("/signup", { replace: true });
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

  useEffect(() => {
    let docData = JSON.parse(localStorage.getItem("userInfo"));

    if (docData) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <div className="AddDoc">
        <div className="AddDoc-Container">
          <form autoComplete="off" className="AddDoc-form" onSubmit={signUp}>
            <div className="AddDoc-part">
              <input
                className="inputbox"
                placeholder="Name"
                onChange={(e) => {
                  setdocName(e.target.value);
                }}
              />
              <input
                className="inputbox"
                placeholder="Email"
                required
                onChange={(e) => {
                  setdocEmail(e.target.value);
                }}
              />
              <input
                className="inputbox"
                placeholder="Password"
                onChange={(e) => {
                  setdocPassword(e.target.value);
                }}
              />
              <input
                className="inputbox"
                placeholder="Phone Number"
                required
                onChange={(e) => {
                  setdocPhone(e.target.value);
                }}
              />
              <div className="inputbox">
                <select
                  className="docCity"
                  value={docCity}
                  onChange={(e) => {
                    setdocCity(e.target.value);
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
                className="inputbox"
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />

              <input
                className="inputbox"
                placeholder="Experience"
                required
                onChange={(e) => {
                  setDocExp(e.target.value);
                }}
              />
              <input
                className="inputbox"
                placeholder="Qualification"
                required
                onChange={(e) => {
                  setDocQuali(e.target.value);
                }}
              />

              <div className="doc_of-option-tab">
                <select
                  className="Specialiaty"
                  value={docof}
                  onChange={(e) => {
                    setDoc(e.target.value);
                  }}
                >
                  <option value="" selected disabled hidden>
                    Select Specialiaty
                  </option>
                  <option value="Surgon">Surgon</option>
                  <option value="Physician">Physician</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                </select>
              </div>

              <input
                className="inputbox"
                placeholder="Fee"
                required
                onChange={(e) => {
                  setFee(e.target.value);
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

              

              <button type="submit" className="save-btn">
                Save
              </button>

              <button onClick={onClose} className="closebtn">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDoctor;
