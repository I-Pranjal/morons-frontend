import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const getStorageKey = (userID) => `chat_messages_${userID}`;

/**
 * Renders a list of chat sessions (by unique date) from localStorage
 * @param {Object} props
 * @param {Object} props.user - User object containing randomInteger
 * @param {string} props.activeFeature - Currently selected chat feature
 * @param {function} props.onDateClick - Callback when a chat session date is clicked
 */
const ChatSessions = ({ user, activeFeature, onDateClick }) => {
  const [chatDates, setChatDates] = useState([]);

  useEffect(() => {
    if (!user?.randomInteger) return;

    const key = getStorageKey(user.randomInteger);
    const raw = localStorage.getItem(key);

    if (raw) {
      try {
        const sessions = JSON.parse(raw);
        const relevantSessions = sessions.filter(
          (session) => session.chatType === activeFeature
        );

        const dates = relevantSessions.map((session) => {
          const timestamp = session.createdAt || session.updatedAt;
          return new Date(timestamp).toDateString();
        });

        const uniqueDates = Array.from(new Set(dates));
        setChatDates(uniqueDates);
      } catch (err) {
        console.error('Failed to parse chat sessions:', err);
      }
    }
  }, [user, activeFeature]);

  if (chatDates.length === 0) {
    return (
      <div className="text-center py-2">
        <p className="text-xs text-gray-500">No chat sessions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 px-2 pt-3 pb-1">
      <h2 className="text-xs text-gray-400 px-1 pb-1 uppercase">History</h2>
      {chatDates
        .sort((a, b) => new Date(b) - new Date(a))
        .map((date, idx) => (
          <div
            key={idx}
            onClick={() => {
              onDateClick?.(date);
            }}
            className="px-3 py-2 hover:bg-yellow-50 cursor-pointer flex items-center rounded-md transition"
          >
            <Clock className="h-4 w-4 text-yellow-500" />
            <div className="ml-2 truncate">
              <p className="text-xs font-medium text-black truncate">{date}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatSessions;
