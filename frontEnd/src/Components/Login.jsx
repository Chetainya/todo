import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import {useSelector , useDispatch} from 'react-redux'
import { UserSliceActions } from '../../Store/UserSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Your backend API endpoint for login
    const url = 'http://localhost:8000/user/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials:"include",
    mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({ email : username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData)
        throw new Error(errorData.err);
      }

      // Handle successful login response here
      const responseData = await response.json();
      console.log(responseData);
      dispatch(UserSliceActions.userData(responseData));
      navigate('/home')
      
      // Redirect user or perform necessary actions upon successful login
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className='flex flex-col items-center mt-10'>
      <h2 className=''>Login</h2>
      <div>
      {error && <p>{error}</p>}
      </div>
      
      <form onSubmit={handleLogin} className='flex flex-col justify-between items-center h-40 mt-10 w-screen'>
        <div className='flex items-center space-x-10'>
          <label>Username</label>
          <input
            type="email"
            name='email'
            value={username}
            onChange={(e) => setUsername(e.target.value)
            }
            className='border-4 rounded-xl border-black'
          />
        </div>
        <div className='flex items-center space-x-10'>
          <label>Password</label>
          <input
          className='border-4  rounded-xl border-black'
            type="password"
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='border-4 rounded-xl ' type="submit">Login</button>
      </form>
      
    </div>
  );
};

export default Login;
