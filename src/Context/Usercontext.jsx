import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();
const API_BASE = import.meta.env.VITE_AI_URL;

// Main Provider Component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [resumeInfo, setResumeInfo] = useState(null);
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserAndResume = async () => {
//       try {
//         const userRes = await axios.get(`${API_BASE}/api/user`);
//         const resumeRes = await axios.get(`${API_BASE}/api/resume/${userRes.data.user_id}`);
        
//         setUserInfo(userRes.data);
//         setResumeInfo(resumeRes.data);
//       } catch (err) {
//         console.error("Error fetching user or resume info:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserAndResume();
//   }, []);

  useEffect(() => {
    const fetchUserinfo = async () => {
      if(localStorage.getItem('user')) {
        setUserInfo(JSON.parse(localStorage.getItem('user')));
      }
      setLoading(false);
    }
    fetchUserinfo();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, resumeInfo, setUserInfo, setResumeInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUserContext = () => useContext(UserContext);
