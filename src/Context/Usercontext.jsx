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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
    setLoading(false);
  };

  fetchUserinfo();
}, []);

useEffect(() => {
  const fetchResumeInfo = async () => {
    if (userInfo?.id) {
      try {
        const response = await axios.get(`https://genios-backend.onrender.com/resume/${userInfo.id}`);
        if (response.status === 200) {
          setResumeInfo(response.data);
          console.log("Resume info fetched successfully:", response.data);
        } else {
          console.error("Failed to fetch resume info:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching resume info:", error);
      }
    }
  };

  fetchResumeInfo();
}, [userInfo]); // <-- runs only when userInfo is set


  return (
    <UserContext.Provider value={{ userInfo, resumeInfo, setUserInfo, setResumeInfo, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUserContext = () => useContext(UserContext);
