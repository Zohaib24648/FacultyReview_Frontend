import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';









function RegisterPage() {
  const history = useNavigate();
  const [data, setData] = useState({
    email: '',
    firstname:'',
    lastname:'',
    password: '',
    erp: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post('http://localhost:3001/auth/register', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(res.status === 200)
      { history('/login');}
      else
      window.alert(res.data.msg)  } catch (error) {
      window.alert(`${error} Please try again`);
    }
  };

  return (
    <div><center>
      <h1>Welcome to Faculty Reviews</h1>
      <h2>Please Register</h2>
      <div style={{ display: 'flex', flexDirection: "column", height: "30vh", width: "10vw", justifyContent: "center", alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label><input name='email' type='email' value={data.email} onChange={handleChange}/>
          <label>ERP</label><input name='erp' type='text' value={data.erp} onChange={handleChange} />
          <label>Password</label><input name='password' type='password' value={data.password} onChange={handleChange} />
          <label>FirstName</label><input name='firstname' type='text' value={data.firstname} onChange={handleChange} />
          <label>LastName</label><input name='lastname' type='text' value={data.lastname} onChange={handleChange} />
          <button type="submit" className='Submit'>Register</button>
        </form>
      </div>
    </center></div>
  );
}












function LoginPage() {
  const history = useNavigate();
  const [data, setData] = useState({
    loginUsername: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value },
      console.log(data)
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Assuming success if we got to this point
      window.alert(res.data.msg);
      // You might want to navigate to a different page on successful login
      // For example, if you have a dashboard route:
       history('/home');
  
      // Store the token somewhere if you plan to use it for authenticated requests
      localStorage.setItem('token', res.data.token);
  
    } catch (error) {
      // Error handling, check if error response exists
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        window.alert(error.response.data.msg);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        window.alert("The request was made but no response was received.");
      } else {
        // Something else caused the error
        console.log('Error', error.message);
        window.alert("An error occurred, please try again.");
      }
    }
  };

  return (
    <div><center>
      <h1>Welcome to Faculty Reviews</h1>
      <h2>Please Login</h2>
      <div style={{ display: 'flex', flexDirection: "column", height: "30vh", width: "10vw", justifyContent: "center", alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <label>Email Address or ERP</label><input name='loginUsername' type='text' value={data.email} onChange={handleChange}/>
          <label>Password</label><input name='password' type='password' value={data.password} onChange={handleChange} />
          <button type="submit" className='Submit'>Login</button>
        </form>
      </div>
    </center></div>
  );
}


function HomePage() {
  const navigate = useNavigate(); // Correctly invoke useNavigate

  return (
    <div>
      <h1>Welcome to Faculty Reviews</h1>
      <h2>Home Page</h2>
      <button onClick={() => navigate('/login')}>Login</button>      {/* Use navigate for navigation */}
      <button onClick={() => navigate('/register')}>Register</button> {/* Use navigate for navigation */}
    </div>
  );
}








function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<Navigate to="/register" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
