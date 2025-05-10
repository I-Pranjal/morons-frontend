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
      chatType: theMessage.chatType || 'Resume Analysis',
    };
    console.log('Sending message:', userMessage);

    // Update UI immediately
    setMessages((prev) => {
      const updated = [...prev, userMessage];
      setMessages(updated);
      const key = getStorageKey(user.randomInteger);
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/chat/message`, userMessage);

      const assistantResponse = {
        sender: 'assistant',
        content: res.data.content,
        chatType: res.data.chatType || 'Resume Analysis',
        sessionId: res.data.sessionId,
      };

      setMessages((prev) => {
        const updated = [...prev, assistantResponse];
        const key = getStorageKey(user.randomInteger);
        localStorage.setItem(key, JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

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
  };
};

export default useChatSession;
