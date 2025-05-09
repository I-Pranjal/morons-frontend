// src/hooks/useChatSession.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_BACKEND_URL ;

export const useChatSession = () => {
  const [sessionId, setSessionId] = useState(null);
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
  const sendMessage = async (messageText) => {
    if (!sessionId || !messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
    };

    const placeholder = {
      id: Date.now() + 1,
      sender: 'jarvis',
      text: '',
      fullText: '',
      isTyping: true,
      currentIndex: 0,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage, placeholder]);

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/sessions/${sessionId}/messages`, {
        message: messageText,
      });

      const jarvisText = res.data.response;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === placeholder.id
            ? { ...msg, fullText: jarvisText, isTyping: true }
            : msg
        )
      );
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initSession();
  }, []);

  return {
    sessionId,
    messages,
    loading,
    sendMessage,
  };
};
