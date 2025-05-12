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
        // console.log('User loaded from localStorage:', JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user data in localStorage', e);
        setUser(null);
      }
    }
    // else{
    //   const guestUser = JSON.stringify({
    //     _id: Math.random().toString(36).substring(2, 15),
    //     name: `Guest_${Math.random().toString(36).substring(2, 8)}`,
    //     email: `guest${Math.floor(Math.random() * 10000)}@example.com`,
    //     profilePicture: `https://api.adorable.io/avatars/96/${Math.random().toString(36).substring(2, 15)}.png`,
    //     randomInteger: Math.floor(Math.random() * 1000000000),
    //     sampleUser: true,
    //   });
    //   setUser(JSON.parse(guestUser));
    //   localStorage.setItem('user', guestUser);
    //   console.log('No user found in localStorage');
    // }
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
