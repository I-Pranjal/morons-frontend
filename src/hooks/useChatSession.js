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
  const sendMessage = async (theMessage) => {
    const userMessage = {
      sessionId: user?.randomInteger?.toString(),
      sender: theMessage.person,
      content: theMessage.content,
      chatType: theMessage.chatType,
    };


    try {
       setMessages((prev) => {
        const updated = [...prev, userMessage];
        const key = getStorageKey(user.randomInteger);
        localStorage.setItem(key, JSON.stringify(updated));
        return updated;
      });
      const res = await axios.post(`${API_BASE}/api/chat/message`, userMessage);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
    }
  };

  // const sendResumeFile = async (filesToProcess) => {
  //   for (const file of filesToProcess) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     try {
  //       const response = await fetch('https://full-fledged-mvp-v1-2.onrender.com/analyze/file', {
  //         method: 'POST',
  //         body: formData,
  //       });

  //       if (!response.ok) throw new Error('File upload failed');

  //       const result = await response.json();

  //       const newUserMessage = {
  //         person: 'assistant',
  //         content: result?.analysis || "The file was processed but no text was returned",
  //         chatType : 'Resume Analysis'
  //       };

  //       await sendMessage(newUserMessage);
  //     } catch (error) {
  //       console.error('File upload error:', error);
  //       await sendMessage({
  //         person: 'assistant',
  //         content: `Error uploading ${file.name}: ${error.message}`
  //       });
  //     }
  //   }
  // };

  useEffect(() => {
    if (user?.randomInteger) {
      loadMessages(user.randomInteger);
    }
  }, [user]);

  return {
    sessionId,
    messages,
    loading,
    sendMessage,
    setMessages,
    // sendResumeFile,
  };
};

export default useChatSession;
