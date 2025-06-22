import { useState, useEffect } from 'react';
import logo from '../assets/main Combined Tagline White.png'
import { Link } from 'react-router-dom';
// Toast Component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-neutral-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center animate-fadeIn z-50">
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default function Footer() {
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);
  const [email, setEmail] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (footer) {
        const rect = footer.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight;
        
        if (isVisible && !isAnimated) {
          setIsAnimated(true);
          animateFooter();
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check on mount in case footer is already visible
    setTimeout(handleScroll, 500);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAnimated]);
  
  const animateFooter = () => {
    const footerColumns = document.querySelectorAll('.footer-column');
    footerColumns.forEach((column, index) => {
      setTimeout(() => {
        column.classList.add('translate-y-0', 'opacity-100');
      }, 150 * index);
    });
    
    setTimeout(() => {
      const footerBottom = document.querySelector('.footer-bottom');
      if (footerBottom) {
        footerBottom.classList.add('opacity-100');
      }
    }, 800);
  };
  
  const showToast = (message) => {
    const id = toastId;
    setToasts([...toasts, { id, message }]);
    setToastId(id + 1);
  };
  
  const closeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };
  
  const handleLinkClick = (label) => {
    showToast(`Navigating to ${label}`);
  };
  
  const handleSocialClick = (platform) => {
    showToast(`Connecting to ${platform}`);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      showToast('Please enter your email address');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      showToast('Please enter a valid email address');
      return;
    }
    
    showToast(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };
  
  return (
    <footer id="footer" className="bg-neutral-900 text-white pt-16 pb-8 relative overflow-hidden mx-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 -top-20 -left-20 blur-xl animate-float-slow"/>
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 bottom-10 right-10 blur-xl animate-float"/>
        <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400 top-32 right-20 blur-lg animate-float-fast"/>
      </div>
      
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Footer top section with columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - About */}
          <div 
            className="footer-column transform translate-y-10 opacity-0 transition-all duration-700 ease-out hover:scale-105"
            // onMouseEnter={() => setHoveredColumn(0)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            <div className="flex items-center mb-4">
            <img
                src={logo}
                alt="Logo"
                className={`h-20 w-60 rounded-lg mr-2 transform transition-transform duration-300 ${
                    hoveredColumn === 0 ? 'rotate-12' : ''
                }`}
                />
            </div>
            <p className="text-gray-400 mb-6">
              Our platform helps students track their resume effectiveness, set career goals, and access resources to land their dream jobs.
            </p>
            <div className="flex space-x-3">
              <button 
                onClick={() => handleSocialClick('Twitter')}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button 
                onClick={() => handleSocialClick('LinkedIn')}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
              <button 
                onClick={() => handleSocialClick('Instagram')}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </button>
              <button 
                onClick={() => handleSocialClick('YouTube')}
                className="bg-gray-800 hover:bg-yellow-400 hover:text-black p-2 rounded-full transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Column 2 - Features */}
          <div 
            className="footer-column transform translate-y-10 opacity-0 transition-all duration-700 ease-out hover:scale-105"
            onMouseEnter={() => setHoveredColumn(1)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className={`h-5 w-1 bg-yellow-400 mr-2 transition-all duration-300 ${hoveredColumn === 1 ? 'w-3' : ''}`}></span>
              Our Features
            </h3>
            <ul className="space-y-3">
              <li>
              <Link to="/v2/linkedinanalyser">
                <button 
                  onClick={() => handleLinkClick('Resume Analysis')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Resume Analysis
                </button>
                </Link>
              </li>
              <li>
              <Link to="/assessment">
                <button 
                  onClick={() => handleLinkClick('Goal Tracking')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Goal Tracking
                </button>
                </Link>
              </li>
              <li>
              <Link to="/v8/generatelabs">
                <button 
                  onClick={() => handleLinkClick('Resource Library')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Resource Library
                </button>
                </Link>
              </li>
              <li>
              <Link to="/v8/userpreference">
                <button 
                  onClick={() => handleLinkClick('Study Plans')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Study Plans
                </button>
                </Link>
              </li>
              <li>
              <Link to="/v2/jobrolecomparator">
                <button 
                  onClick={() => handleLinkClick('Interview Prep')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Interview Prep
                </button>
                </Link>
              </li>
              <li>
              <Link to="/assessment">
                <button 
                  onClick={() => handleLinkClick('Progress Reports')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Progress Reports
                </button>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Quick Links */}
          <div 
            className="footer-column transform translate-y-10 opacity-0 transition-all duration-700 ease-out hover:scale-105"
            onMouseEnter={() => setHoveredColumn(2)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className={`h-5 w-1 bg-yellow-400 mr-2 transition-all duration-300 ${hoveredColumn === 2 ? 'w-3' : ''}`}></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
              <Link to="/about">
                <button 
                  onClick={() => handleLinkClick('About Us')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About Us
                </button>
                </Link>
              </li>
              <li>
              <Link to="/">
                <button 
                  onClick={() => handleLinkClick('Success Stories')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Success Stories
                </button>
                </Link>
              </li>
              <li>
              <Link to="/">
                <button 
                  onClick={() => handleLinkClick('Pricing Plans')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Pricing Plans
                </button>
                </Link>
              </li>
              <li>
              <Link to="/">
                <button 
                  onClick={() => handleLinkClick('Blog')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Blog & Resources
                </button>
                </Link>
              </li>
              <li>
              <Link to="/">
              <button
                  onClick={() => handleLinkClick('Contact')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact Us
                </button>
                </Link>
              </li>
              <li>
              <Link to="/">
                <button 
                  onClick={() => handleLinkClick('FAQ')}
                  className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                >
                  <svg className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  FAQ
                </button>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Newsletter */}
          <div 
            className="footer-column transform translate-y-10 opacity-0 transition-all duration-700 ease-out hover:scale-105"
            onMouseEnter={() => setHoveredColumn(3)}
            onMouseLeave={() => setHoveredColumn(null)}
          >
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className={`h-5 w-1 bg-yellow-400 mr-2 transition-all duration-300 ${hoveredColumn === 3 ? 'w-3' : ''}`}></span>
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest career tips, resource updates, and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="mb-4 group">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-l-md flex-1 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-r-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 group-hover:animate-pulse"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="text-gray-400 text-sm">
              <div className="flex items-start mb-2 group hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-5 h-5 text-yellow-400 mr-2 mt-1 flex-shrink-0 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>New Delhi</p>
              </div>
              <div className="flex items-start mb-2 group hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-5 h-5 text-yellow-400 mr-2 mt-1 flex-shrink-0 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>support@moronss.com</p>
              </div>
              <div className="flex items-start group hover:text-yellow-400 transition-colors duration-300">
                <svg className="w-5 h-5 text-yellow-400 mr-2 mt-1 flex-shrink-0 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>+91 8882611248</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-yellow-400 my-8 w-full"></div>
        
        {/* Bottom section with copyright and links */}
        <div className="footer-bottom opacity-0 transition-opacity duration-700 ease-out">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Moronss All rights reserved.
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => handleLinkClick('Privacy Policy')}
                className="text-gray-500 hover:text-yellow-400 text-sm transition-all duration-300 transform hover:scale-110"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => handleLinkClick('Terms of Service')}
                className="text-gray-500 hover:text-yellow-400 text-sm transition-all duration-300 transform hover:scale-110"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => handleLinkClick('Cookie Policy')}
                className="text-gray-500 hover:text-yellow-400 text-sm transition-all duration-300 transform hover:scale-110"
              >
                Cookie Policy
              </button>
            </div>
          </div>
          
          {/* Back to top button */}
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                showToast('Scrolling to top');
              }}
              className="bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white p-2 rounded-full transition-all duration-300 hover:transform hover:-translate-y-1"
              aria-label="Back to top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            onClose={() => closeToast(toast.id)} 
          />
        ))}
      </div>
    </footer>
  );
}