import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const GoogleSignInButton = () => {
  const handleSuccess = (credentialResponse) => {
    console.log('Credential Response:', credentialResponse);

    axios.post(`${backendURL}/api/users/google`, {
      token: credentialResponse.credential,
    })
    .then(response => {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Login Successful!');
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
    });
  };

  const handleError = () => {
    console.error('Google Sign-In Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleSignInButton;
