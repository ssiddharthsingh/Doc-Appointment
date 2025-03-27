import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Dashboard from './components/dashboard';
import Login from './components/login';
import './app.css';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          
          <Route
            path="/" element={
              <>
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                <Dashboard activeTab={activeTab} />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
