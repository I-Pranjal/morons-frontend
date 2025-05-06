import { useState } from 'react';

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
              <img 
                src="/src/assets/logo.png" 
                alt="Logo" 
                className="h-10 w-auto"
              />
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
            <a
              href="#"
              className="text-gray-800 hover:text-gray-500"
              title="Explore our service offerings"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-gray-500"
              title="Sign in to your account"
            >
              Login
            </a>
            <a
              href="#"
              className="ml-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 rounded-md transition duration-150"
            >
              Get started
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
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
            <a
              href="#"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              title="Explore our service offerings"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
              title="Sign in to your account"
            >
              Login
            </a>
            <a
              href="#"
              className="block px-3 py-2 bg-gray-900 text-white hover:bg-gray-800 text-center mt-2 rounded-md"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;