import React, { useState, useEffect } from "react";
import { Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ChatSessions from './History';

// Dummy function placeholder (replace with your actual getStorageKey function)
// const getStorageKey = (randomInteger) => `chat__${randomInteger}`;
 const getStorageKey = (userID) => `chat_messages_${userID}`;

const Sidebar = ({ isOpen, toggle, user, activeFeature, onDateClick }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('history');
  const [chatDates, setChatDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('history')) setActiveItem('history');
    else if (path.includes('settings')) setActiveItem('settings');
  }, [location]);

  useEffect(() => {
    if (!user?.randomInteger) return;
    const key = getStorageKey(user.randomInteger);
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const sessions = JSON.parse(raw);
        const dates = Object.values(sessions).map((session) => {
          const timestamp = session.createdAt || session.updatedAt;
          return new Date(timestamp).toDateString();
        });
        const uniqueDates = Array.from(new Set(dates));
        setChatDates(uniqueDates);
      } catch (err) {
        console.error('Failed to parse chat sessions:', err);
      }
    }
  }, [user]);

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) {
      toggle();
    }
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 fixed flex flex-col h-full z-30 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="h-16 md:h-0"></div>

        <nav className="flex-1 overflow-y-auto py-2" aria-label="Main Navigation">

        <div className="mt-2 px-4">
          <span className="text-xs font-medium text-gray-800">{`Chat history - ${activeFeature}`}</span>
        </div>
        <div className="px-2">
          <ChatSessions user={user} activeFeature={activeFeature} onDateClick={onDateClick} />
        </div>

                </nav>

                {/* Settings Footer */}
        <div
          onClick={() => {
            setActiveItem('settings');
            handleNavigation('/settings');
          }}
          className={`p-3 mx-2 mb-2 rounded cursor-pointer ${
            activeItem === 'settings'
              ? 'bg-gray-200 text-gray-900'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center">
            <Settings className="h-5 w-5 shrink-0" />
            <span className="ml-3 text-sm whitespace-nowrap">Settings</span>
          </div>
        </div>

        {/* Upgrade Info */}
        <div className="p-3 mx-2 mb-4 rounded border border-gray-200 bg-gray-50">
          <div className="flex items-center">
            <span className="text-xs text-gray-700">More access to the best models</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
