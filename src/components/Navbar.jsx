import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import logo from '../assets/logo.png';

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Menu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 inset-x-0 mx-auto z-50 max-w-7xl mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-800 hover:text-gray-500"
              title="Access your personalized dashboard"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-500"
              title="Learn more about our company"
            >
              About Us
            </a>
            <Link
              to="/jarvis"
              className="text-gray-800 hover:text-gray-500"
              title="Explore our service offerings"
            >
              Mr. ELITE
            </Link>
            <Link
              to="/login"
              className="text-gray-800 hover:text-gray-500"
              title="Sign in to your account"
            >
              Login
            </Link>
            <Link to="/booking" className="ml-2">
              <Button
                className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-md transition duration-150"
              >
                Get started
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg mt-1">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              title="Access your personalized dashboard"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              title="Learn more about our company"
            >
              About Us
            </a>
            <Link
              to="/jarvis"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              title="Explore our service offerings"
            >
              Mr. ELITE
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              title="Sign in to your account"
            >
              Login
            </Link>
            <Link to="/booking">
              <Button
                className="w-full px-3 py-2 bg-gray-900 text-white hover:bg-gray-800 text-center mt-2 rounded-md"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
