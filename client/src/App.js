import './App.css';
import Home from "./component/Home";
import EditorPage from "./component/EditorPage";
import Login from "./component/Login";
import CreateAccount from "./component/CreateAccount";
import Profile from "./component/Profile";
import {Routes, Route} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    < >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Editor" element={<EditorPage />} />

      </Routes>
    </>
  );
}

export default App;
