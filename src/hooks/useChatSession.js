// src/hooks/useChatSession.js
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/userContext';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const useChatSession = () => {
   const {user} = useUser() ;
  const [sessionId, setSessionId] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Create or load a chat session
  const initSession = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/chat/sessions`);
      setSessionId(res.data.id);

      const msgRes = await axios.get(`${API_BASE}/sessions/${res.data.id}/api/chat/messages`);
      setMessages(msgRes.data);
    } catch (err) {
      console.error('Failed to initialize session:', err);
    }
  };

  // Send a message and handle response
  const sendMessage = async (theMessage) => {
    // if (!sessionId || !messageText.trim()) return;
    const userMessage = {
      sessionId: user.randomInteger.toString() , // Convert randomInteger to string to mimic ObjectId format
      sender: theMessage.person , // Ensuring sender is either 'user' or 'assistant'
      content: theMessage.content,
    };

    console.log(userMessage); 

    // const placeholder = {
    //   sender: 'assistant',
    //   content: '', // Placeholder content until the assistant response is received
    //   isTyping: true, // Indicate typing status
    // };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/chat/message`, userMessage);

      const assistantText = res.data.content; // Assuming the response contains the assistant's message

      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender === 'assistant' && msg.isTyping
            ? { ...msg, content: assistantText, isTyping: false }
            : msg
        )
      );
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (userID) => {
    if (!userID) return;

    try {
      const res = await axios.get(`${API_BASE}/api/chat/messages/${userID}`);
      if (res.status !== 200) {
        throw new Error('Failed to load messages');
      }
      setMessages(res.data);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  }

  useEffect(() => {
    if (user && user.randomInteger) {
      loadMessages(user.randomInteger);
    }
  }, [user]);
  return {
    sessionId,
    messages,
    loading,
    sendMessage,
    setMessages
  };
};

export default useChatSession;
