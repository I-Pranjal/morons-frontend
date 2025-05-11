import React, { useState, useEffect } from "react";
import { Settings, History as HistoryIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import History from './History';

const Sidebar = ({ isOpen, toggle }) => {
  // Get current location to highlight active menu item
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('history');
  const navigate = useNavigate();

  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('history')) setActiveItem('history');
    else if (path.includes('settings')) setActiveItem('settings');
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    // Auto close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      toggle();
    }
  };

  // Handle history item click
  const handleHistoryItemClick = (item) => {
    navigate(item.path);
    if (window.innerWidth < 768) {
      toggle();
    }
  };

  return (
    <aside
      className={`bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 fixed flex flex-col h-full z-30 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      {/* Sidebar Content Container */}
      <div className="flex flex-col h-full">
        {/* Safe area for mobile - prevents content from hiding behind header */}
        <div className="h-16 md:h-0"></div>
        
        {/* Menu Items - Main Navigation */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Main Navigation">
          {/* Section Headers */}
          <div className="mt-2 mb-2 px-4">
            <span className="text-xs font-medium text-black dark:text-white">Yesterday</span>
          </div>
          
          {/* History Component Integration */}
          <div className="px-2">
            <History compact={true} limit={5} onItemClick={handleHistoryItemClick} />
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
              ? 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
              : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          <div className="flex items-center">
            <Settings className="h-5 w-5 shrink-0" />
            <span className="ml-3 text-sm whitespace-nowrap">Settings</span>
          </div>
        </div>

        {/* Upgrade plan section */}
        <div className="p-3 mx-2 mb-4 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <div className="flex items-center">
            <span className="text-xs text-black dark:text-white">More access to the best models</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;