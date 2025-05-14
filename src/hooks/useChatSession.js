// src/hooks/useChatSession.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext';



const API_BASE = import.meta.env.VITE_BACKEND_URL;

const useChatSession = () => {
  const { user } = useUser();
  const [sessionId, setSessionId] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Namespace key for localStorage
  const getStorageKey = (userID) => `chat_messages_${userID}`;

  // Load messages from localStorage + API
  const loadMessages = async (userID) => {
    if (!userID) return;

    const storageKey = getStorageKey(userID);
    const storedMessages = localStorage.getItem(storageKey);

    if (storedMessages) {
      try {
        const parsed = JSON.parse(storedMessages);
        setMessages(parsed);
      } catch (e) {
        console.error('Failed to parse stored messages:', e);
      }
    }

    try {
      const res = await axios.get(`${API_BASE}/api/chat/messages/${userID}`);
      if (res.status !== 200) throw new Error('Failed to load messages from server');

      setMessages(res.data);
      localStorage.setItem(storageKey, JSON.stringify(res.data));
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  // Send message
  const sendResumeMessage = async (theMessage) => {
    const userMessage = {
      sessionId: user?.randomInteger?.toString(),
      sender: theMessage.person,
      content: theMessage.content,
      chatType: theMessage.chatType,
    };
    
      setMessages((prev) => {
    const updated = [...prev, userMessage];
    const key = getStorageKey(user.randomInteger);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
      });

    try {
      await axios.post(`${API_BASE}/api/chat/message`, userMessage);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };


// const submitInterviewFile = async (file) => {
//   const formData = new FormData();
//   console.log('Submitting interview file');
//   formData.append('cv_file', file);
//   formData.append('job_description', 'sde');

//   for (let pair of formData.entries()) {
//     console.log(`${pair[0]}:`, pair[1]);
//   }

//   try {
//     // const apiUrl = `${API_BASE}/api/chat/proxyinterview`; // Your proxy route
//     const apiUrl = 'http://localhost:5000/api/chat/proxyinterview'; // Your proxy route

//     const res = await axios.post(apiUrl, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     console.log('Response from proxy API:', res.data);

//     if (res.data && res.data.questions) {
//       await sendResumeMessage({
//         person: 'assistant',
//         content: res.data.questions.join('\n'),
//         chatType: 'Mock Interview',
//       });
//     }

//   } catch (error) {
//     console.error('Error in submitInterviewFile:', error);
//     await sendResumeMessage({
//       person: 'assistant',
//       content: `Failed to process the interview file: ${error.message}`,
//     });
//   }
// };


const submitInterviewFile = async (file) => {
  const formData = new FormData();
  formData.append('cv_file', file);
  formData.append('job_description', 'SDE' );
  formData.append('num_questions', '5'); // Optional but backend expects it

  try {
    const res = await fetch('https://interview-u2zx.onrender.com/generate-questions', {
      method: 'POST',
      body: formData, // DO NOT set headers manually for FormData
    });

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Response from resume API:", data);
    localStorage.setItem('interview_session_id', data.session_id) ; 
    if (data && data.questions) {
      await sendResumeMessage({
        person: 'assistant',
        content: data.questions.join('\n'),
        chatType: 'Mock Interview',
      });
    } 
    return data;
  } catch (err) {
    console.error('❌ Error uploading file:', err);
    throw err;
  }
};


const askInterviewQuestion = async (question) => {
  const userMessage = {
    sessionId: user?.randomInteger?.toString(),
    person: 'user',
    content: question,
    chatType: 'Mock Interview',
  };
  await  sendResumeMessage(userMessage);
  const queryMessage ={
  "session_id": localStorage.getItem('interview_session_id'),
  "message": question
  }
  try {
    const res = await axios.post('https://interview-u2zx.onrender.com/chat', 
    queryMessage, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
     const data = await res.data;
     if (data) {
      await sendResumeMessage({
        sessionId: user?.randomInteger?.toString(),
        person: 'assistant',
        content: data.response,
        chatType: 'Mock Interview',
      });
    } 
  }
  catch (err) {
    console.error('Error sending message:', err);
  }
  } ;





  useEffect(() => {
    if (user?.randomInteger) {
      loadMessages(user.randomInteger);
    }
  }, [user]);

  return {
    sessionId,
    messages,
    loading,
    sendResumeMessage,
    submitInterviewFile,
    setMessages,
    askInterviewQuestion,
  };
};

export default useChatSession;
