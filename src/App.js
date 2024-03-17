import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
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

  useEffect(() => {
    console.log(data); // This will log the updated state whenever `data` changes.
  }, [data]);

  const handleSubmit = async(e) => {
    try {
      e.preventDefault();
    console.log(data); // Final log of data when the form is submitted.
    const res = await axios.post('http://localhost:3001/auth/register', {
      email: data.email,
      password: data.password,
      erp: data.erp,
      firstname: data.firstname,
      lastname: data.lastname
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    window.alert(JSON.stringify(res.data)); // Use JSON.stringify for better readability
  } catch (error) {
      window.alert(error+ "Please try again");
    }
  };

  return (
    <div><center>
      <h1>Welcome to Faculty Reviews</h1>
      <h2>Please Register</h2>
      <div style={{ display: 'flex', flexDirection: "column", height: "30vh", width: "10vw", justifyContent: "center", alignItems:'center' }}>
        <form onSubmit={handleSubmit}>
          <label>Email Address</label><input name='email' type='email' value={data.email} onChange={handleChange}/>
          <label>ERP</label><input name='erp' type='text' value={data.ERP} onChange={handleChange} />
          <label>Password</label><input name='password' type='password' value={data.password} onChange={handleChange} />
          <label>FirstName</label><input name='firstname' type='text' value={data.firstname} onChange={handleChange} />
          <label>LastName</label><input name='lastname' type='text' value={data.lastname} onChange={handleChange} />
          <button type="submit" className='Submit'>Register</button>
        </form>
      </div>
    </center></div>
  );
}

export default App;
