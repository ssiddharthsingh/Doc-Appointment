import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import signUp from "./components/signup";
import login from "./components/login";
import FindADoc from "./components/findADoc";
import MyProfile from "./components/MyProfile";
import FeedbackForm from './components/feedBackForm';
import Navbar from "./components/navbar";
import docLogin from "./components/docLogin";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' Component={Home} />
          <Route path="/signUp" Component={signUp} />
          <Route path="/login" Component={login} />
          <Route path="/FindADoc" Component={FindADoc} />
          <Route path="/MyProfile" Component={MyProfile} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/docLogin" Component={docLogin} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
