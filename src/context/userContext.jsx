// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const UserContext = createContext();
const API_BASE = import.meta.env.VITE_BACKEND_URL;


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  // Load user data from localStorage and fetch from server if available
useEffect(() => {
  const loadUser = async () => {
    const storedUserStr = localStorage.getItem('user');
    if (!storedUserStr) return;

    try {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);
     
      const randomInteger = Number(storedUser.randomInteger);
      if (!randomInteger) return;
      const response = await axios.get(`${API_BASE}/api/users/getuserdetails/${randomInteger}`);

      if (response.status === 200) {
 
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } else {
        console.error('Failed to fetch user data from server');
      }
    } catch (e) {
      console.error('Error parsing or fetching user data', e);
      setUser(null);
    }
  };

  loadUser();
}, []);


  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
