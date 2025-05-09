import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Video,
  Home,
  Settings,
  LogIn,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, toggle }) => {
  // Get current location to highlight active menu item
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('resume-analysis');
  const navigate = useNavigate();

  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('resume')) setActiveItem('resume-analysis');
    else if (path.includes('job')) setActiveItem('job-hunter');
    else if (path.includes('interview')) setActiveItem('mock-interview');
    else if (path === '/') setActiveItem('home');
  }, [location]);

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-5 w-5 shrink-0 text-gray-200" />,
      path: '/'
    },
    {
      id: 'resume-analysis',
      label: 'Resume Analysis',
      icon: <FileText className="h-5 w-5 shrink-0 text-gray-200" />,
      path: '/resume'
    },
    {
      id: 'job-hunter',
      label: 'Job Hunter',
      icon: <Search className="h-5 w-5 shrink-0 text-gray-200" />,
      path: '/job-hunter'
    },
    {
      id: 'mock-interview',
      label: 'Mock Interview',
      icon: <Video className="h-5 w-5 shrink-0 text-gray-200" />,
      path: '/interview'
    }
  ];

  const utilityItems = [
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-5 w-5 shrink-0 text-gray-200" />,
      path: '/settings'
    },
    {
      id: 'login',
      label: 'Login',
      icon: <LogIn className="h-5 w-5 shrink-0 text-gray-200" />,
      path: '/login'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // Auto close sidebar on mobile after navigation
    toggle();
  };

  // Helper function to render menu items
  const renderMenuItem = (item) => (
    <div
      key={item.id}
      onClick={() => {
        setActiveItem(item.id);
        handleNavigation(item.path);
      }}
      className={`flex items-center px-4 py-3 cursor-pointer transition-all duration-200 ${
        activeItem === item.id
          ? 'bg-gray-700 border-l-2 border-gray-400'
          : 'hover:bg-gray-700 hover:border-l hover:border-gray-400'
      }`}
      aria-label={item.label}
      role="button"
    >
      <div className="flex items-center">
        {item.icon}
        <span className="ml-3 text-sm text-gray-200 whitespace-nowrap font-medium">{item.label}</span>
      </div>
    </div>
  );

  // Render utility items for the footer
  const renderUtilityFooterItem = (item) => (
    <div
      key={item.id}
      onClick={() => {
        setActiveItem(item.id);
        handleNavigation(item.path);
      }}
      className="flex items-center px-3 py-2 cursor-pointer transition-colors hover:bg-gray-700 rounded"
      aria-label={item.label}
      role="button"
    >
      <div className="flex items-center">
        {item.icon}
        <span className="ml-2 text-xs text-gray-300 whitespace-nowrap">{item.label}</span>
      </div>
    </div>
  );

  return (
    <aside
      className={`bg-gray-900 border-r border-gray-700 transition-all duration-300 fixed flex flex-col h-full z-30 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      {/* Logo and Close Button */}
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-gray-100 font-semibold ml-2">Mr. Elite</span>
        </div>
        <button 
          onClick={toggle}
          className="text-gray-400 hover:text-gray-100 p-1 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Menu Items - Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-2" aria-label="Main Navigation">
        {/* Main Features Section */}
        <div className="mt-2">
          <div className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-gray-400">Features</div>
          {menuItems.map(renderMenuItem)}
        </div>
      </nav>

      {/* Utility Footer */}
      <div className="p-2 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center justify-around">
          {utilityItems.map(renderUtilityFooterItem)}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;