// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user data in localStorage', e);
        setUser(null);
      }
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('userDetails', JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('userDetails');
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
