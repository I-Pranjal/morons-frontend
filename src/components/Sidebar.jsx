import React, { useState, useEffect } from "react";
import {
  Brain,
  Search,
  FileText,
  LogIn,
  LogOut,
  Home,
  Settings,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, toggle }) => {
  // Get current location to highlight active menu item
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('ai-mentor');
  const navigate = useNavigate();

  // Set active menu item based on current path
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('mentor')) setActiveItem('ai-mentor');
    else if (path.includes('job')) setActiveItem('job-hunter');
    else if (path.includes('resume')) setActiveItem('resume-analysis');
    else if (path === '/') setActiveItem('home');
  }, [location]);

  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-5 w-5 shrink-0 text-white" />,
      path: '/'
    },
    {
      id: 'ai-mentor',
      label: 'AI Mentor',
      icon: <Brain className="h-5 w-5 shrink-0 text-white" />,
      path: '/mentor'
    },
    {
      id: 'job-hunter',
      label: 'Job Hunter',
      icon: <Search className="h-5 w-5 shrink-0 text-white" />,
      path: '/job-hunter'
    },
    {
      id: 'resume-analysis',
      label: 'Resume Analysis',
      icon: <FileText className="h-5 w-5 shrink-0 text-white" />,
      path: '/resume'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-5 w-5 shrink-0 text-white" />,
      path: '/settings'
    }
  ];

  const authItems = [
    {
      id: 'login',
      label: 'Login',
      icon: <LogIn className="h-5 w-5 shrink-0 text-white" />,
      path: '/login'
    },
    {
      id: 'signout',
      label: 'Sign Out',
      icon: <LogOut className="h-5 w-5 shrink-0 text-white" />,
      path: '/logout'
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
          ? 'bg-gray-800 border-l-2 border-white'
          : 'hover:bg-gray-800 hover:border-l hover:border-gray-600'
      }`}
      aria-label={item.label}
      role="button"
    >
      <div className="flex items-center">
        {item.icon}
        <span className="ml-3 text-sm text-white whitespace-nowrap">{item.label}</span>
      </div>
    </div>
  );

  return (
    <aside
      className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 fixed flex flex-col h-full z-30 ${
        isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
      }`}
    >
      {/* Logo and Close Button */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-white font-semibold ml-2">Mr. Elite</span>
        </div>
        <button 
          onClick={toggle}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Menu Items - Main Navigation */}
      <nav className="flex-1 overflow-y-auto py-2" aria-label="Main Navigation">
        {/* Main Features Section */}
        <div className="mt-2">
          <div className="px-4 py-1 text-xs text-gray-500">FEATURES</div>
          {menuItems.map(renderMenuItem)}
        </div>

        {/* Authentication Section */}
        <div className="mt-4">
          <div className="px-4 py-1 text-xs text-gray-500">ACCOUNT</div>
          {authItems.map(renderMenuItem)}
        </div>
      </nav>

      {/* Status Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="bg-green-500 h-2 w-2 rounded-full"></div>
          <span className="ml-2 text-xs text-gray-400">Online</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;