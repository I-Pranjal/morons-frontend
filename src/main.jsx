import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Context/Usercontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <GoogleOAuthProvider clientId="315189290583-vvs4fu3ig3rubeca383seg5icvfbmcid.apps.googleusercontent.com"> */}
            <BrowserRouter>
            <UserProvider>
              <App />
            </UserProvider>
            </BrowserRouter> 
    {/* </GoogleOAuthProvider> */}
  </StrictMode>,
)
