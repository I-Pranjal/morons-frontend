import { useState } from 'react';
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
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);
    const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md fixed top-0 inset-x-0 mx-auto z-50 max-w-7xl mt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo and left side */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                src={logo}
                                alt="Company Logo"
                                className="h-10 w-auto"
                            />
                        </div>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <button
                                className="flex items-center space-x-1 text-gray-800 hover:text-gray-500"
                                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                            >
                                <span>Solutions</span>
                                <ChevronDown />
                            </button>
                            {isSolutionsOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-1">
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Solution 1
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Solution 2
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Solution 3
                                    </a>
                                </div>
                            )}
                        </div>

                        <a href="#" className="text-gray-800 hover:text-gray-500">
                            AI Mentor
                        </a>

                        <a href="#" className="text-gray-800 hover:text-gray-500">
                            Dashboard
                        </a>

                        <div className="relative">
                            <button
                                className="flex items-center space-x-1 text-gray-800 hover:text-gray-500"
                                onClick={() => setIsDeveloperOpen(!isDeveloperOpen)}
                            >
                                <span>Developer</span>
                                <ChevronDown />
                            </button>
                            {isDeveloperOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-1">
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        API
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Documentation
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        SDK
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className="flex items-center space-x-1 text-gray-800 hover:text-gray-500"
                                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                            >
                                <span>Resources</span>
                                <ChevronDown />
                            </button>
                            {isResourcesOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg py-1">
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Blog
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Help Center
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                        Community
                                    </a>
                                </div>
                            )}
                        </div>

                        <a href="#" className="text-gray-800 hover:text-gray-500">
                           AI Support
                        </a>

                        <a href="#" className="text-gray-800 hover:text-gray-500">
                            Sign in
                        </a>

                        <a
                            href="#"
                            className="ml-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800"
                        >
                            Get started
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100"
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
                        <button
                            className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                        >
                            <span>Solutions</span>
                            <ChevronDown className={isSolutionsOpen ? "transform rotate-180" : ""} />
                        </button>
                        {isSolutionsOpen && (
                            <div className="pl-6 space-y-1">
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Solution 1
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Solution 2
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Solution 3
                                </a>
                            </div>
                        )}

                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            AI Mentor
                        </a>

                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Dashboard
                        </a>

                        <button
                            className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsDeveloperOpen(!isDeveloperOpen)}
                        >
                            <span>Developer</span>
                            <ChevronDown className={isDeveloperOpen ? "transform rotate-180" : ""} />
                        </button>
                        {isDeveloperOpen && (
                            <div className="pl-6 space-y-1">
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    API
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Documentation
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    SDK
                                </a>
                            </div>
                        )}

                        <button
                            className="flex items-center justify-between w-full text-left px-3 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                        >
                            <span>Resources</span>
                            <ChevronDown className={isResourcesOpen ? "transform rotate-180" : ""} />
                        </button>
                        {isResourcesOpen && (
                            <div className="pl-6 space-y-1">
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Blog
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Help Center
                                </a>
                                <a href="#" className="block px-3 py-2 text-gray-800 hover:bg-gray-100">
                                    Community
                                </a>
                            </div>
                        )}

                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            AI Support
                        </a>

                        <a
                            href="#"
                            className="block px-3 py-2 text-gray-800 hover:bg-gray-100"
                        >
                            Sign in
                        </a>

                        <a
                            href="#"
                            className="block px-3 py-2 bg-gray-900 text-white hover:bg-gray-800 text-center mt-2"
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