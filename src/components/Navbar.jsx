import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="18" x2="20" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const isLab = currentPath.includes('/lab') || currentPath.includes('/v8/lab');
  const isDashboard = currentPath.includes('/dashboard') || currentPath.includes('/v2/dashboard');
  const isHub = currentPath.includes('/hub') || currentPath.includes('/v2/hub') || currentPath.includes('/projecthub') || currentPath.includes('/resumeandportfoliobuilder') || currentPath.includes('/contentgenerator');
  const isSettings = currentPath.includes('/settings') || currentPath.includes('/v2/settings');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 inset-x-0 z-50">
      <div className="px-8 mx-auto flex justify-between items-center h-16">
        {/* Logo on the extreme left */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Morons Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Buttons on the extreme right */}
        <div className="hidden md:flex items-center space-x-4 ml-auto px-4">
          {/* Conditional rendering of buttons based on the current path */}
          {!isLab && !isDashboard && !isHub && !isSettings && (
             <a href="https://tally.so/r/n0lXYZ">
                <Button className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-full transition duration-150">
              Early Beta Users
                </Button>
             </a>
          )}
          {!isLab && !isDashboard && !isHub && !isSettings && (
              <Link to="/login">
                <Button className="px-4 py-2 bg-amber-300 text-black border-amber-500 border hover:bg-amber-400 rounded-full transition duration-150">
                    Sign In
                </Button>
              </Link>
      
          )}

          {/* Show Dashboard */}
        { (isLab || isHub ) && (
            <Link to="/dashboard">
              <Button className="px-4 py-2 bg-amber-300 text-black hover:bg-amber-400 rounded-full transition duration-150">
                Dashboard
              </Button>
            </Link>
          )}



        </div>

        {/* Hamburger menu for small screens */}
        <div className="md:hidden flex items-center ml-auto">
          <button 
            onClick={toggleMenu} 
            className="text-black hover:text-gray-600 p-2 rounded-md transition-colors duration-150"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 shadow-lg border-t border-gray-600">
          <div className="px-4 py-3 space-y-3">
            <a 
              href="https://tally.so/r/n0lXYZ" 
              className="block px-4 py-2 text-white hover:bg-gray-600 rounded-md transition duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Early Beta Users
            </a>
            <Link 
              to="/login" 
              className="block px-4 py-2 text-white hover:bg-gray-600 rounded-md transition duration-150"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            
          {/* Show Dashboard */}
        { (isLab || isHub ) && (
            <Link to="/dashboard"
              className="block px-4 py-2 text-white hover:bg-gray-600 rounded-md transition duration-150" >
                Dashboard
            </Link>
          )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;