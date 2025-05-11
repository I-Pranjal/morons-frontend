import { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Sliders, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useUser } from '../context/userContext';

export default function ProfileSection() {
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Navigation handlers
  const handleNavigation = (path) => {
    setIsDropdownOpen(false);
    setActiveTab(path);
    // In a real app, we would navigate here
    console.log(`Navigating to ${path}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button with Enhanced Logo */}
      <button 
        onClick={toggleDropdown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center space-x-2 hover:bg-gray-100 rounded-full transition-all duration-300 p-2"
        aria-label="User profile menu"
      >
        <div className="relative">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center overflow-hidden border-2 ${isHovered ? 'border-blue-400' : 'border-white'} shadow-md transition-all duration-300 ${isHovered ? 'shadow-lg scale-110' : ''}`}>
            {/* Logo with gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
            
            {/* Logo Text */}
            <div className="relative z-10 font-bold text-white text-lg transform transition-all duration-300">
              <img
              src={user?.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              />
            </div>
            
            {/* Ripple effect on click */}
            {isDropdownOpen && (
              <div className="absolute inset-0 bg-white opacity-30 rounded-full animate-ping" />
            )}
            
            {/* Pulsing animation for active status */}
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border border-white animate-pulse" />
          </div>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu with Animation */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200 transform transition-all duration-200 opacity-100 scale-100 origin-top-right">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden border-2 border-white">
                <div className="font-bold text-white text-xl">JD</div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <div className="flex items-center mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-400 mr-1"></div>
                  <span className="text-xs text-green-500">Online</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => handleNavigation('dashboard')}
            className={`flex items-center px-4 py-2 text-sm w-full text-left transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <LayoutDashboard size={16} className={`mr-2 ${activeTab === 'dashboard' ? 'text-blue-500' : 'text-gray-500'}`} />
            Dashboard
            {activeTab === 'dashboard' && (
              <div className="ml-auto h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </button>
          
          <button 
            onClick={() => handleNavigation('settings')}
            className={`flex items-center px-4 py-2 text-sm w-full text-left transition-all duration-200 ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Settings size={16} className={`mr-2 ${activeTab === 'settings' ? 'text-blue-500' : 'text-gray-500'}`} />
            Settings
            {activeTab === 'settings' && (
              <div className="ml-auto h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </button>
          
          <button 
            onClick={() => handleNavigation('customization')}
            className={`flex items-center px-4 py-2 text-sm w-full text-left transition-all duration-200 ${activeTab === 'customization' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            <Sliders size={16} className={`mr-2 ${activeTab === 'customization' ? 'text-blue-500' : 'text-gray-500'}`} />
            Customization
            {activeTab === 'customization' && (
              <div className="ml-auto h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </button>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <button 
            onClick={() => handleNavigation('logout')}
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-all duration-200 group"
          >
            <LogOut size={16} className="mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}