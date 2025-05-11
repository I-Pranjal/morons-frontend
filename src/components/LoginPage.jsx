import { useState } from 'react';
import { ChevronRight, Mail, X, Home } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInButton';
import SignInWithLinkedIn from './SignInWithLinkedIn';
import useManualSignIn from '../hooks/useManualSignIn';
import FuturisticGrid from './FuturisticGrid';
import AnimatedCube from './AnimatedCube';
import logo from '../assets/logo.png';

export default function LoginPage() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    name, 
    setName, 
    isLoading, 
    error, 
    setError, 
    handleEmailSubmit 
  } = useManualSignIn();
  
  // Handle direct navigation to booking page
  const navigateToBooking = () => {
    window.location.href = '/booking';
  };

  // Navigate to home page
  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-200 animate-gradient-background"></div>
      
      {/* Background Futuristic Grid */}
      <FuturisticGrid />
      
      {/* Main Card with Glass Effect */}
      <div className="w-full max-w-6xl bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-white border-opacity-20">
        <div className="flex flex-col md:flex-row">
          {/* Left section - Login Form */}
          <div className="w-full md:w-1/2 p-10 md:p-12 relative backdrop-blur-sm">
            {/* Elegant Logo */}
            <div className="flex justify-center mb-8">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>
            
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Authentication Portal</h2>
              <p className="text-sm text-gray-700 mt-1">Secure login to access system controls</p>
            </div>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40 backdrop-blur-sm rounded-lg z-10">
                <div className="w-12 h-12 border-4 border-t-amber-500 border-amber-200 rounded-full animate-spin"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-lg flex items-center justify-between mb-6">
                <p>{error}</p>
                <button onClick={() => setError('')}>
                  <X size={18} />
                </button>
              </div>
            )}

            {!isEmailLogin ? (
              <div className="space-y-4 mt-8">
                {/* SSO Options with Glass Effect */}
                <div className="w-full px-5 py-3 flex items-center justify-center bg-white bg-opacity-40 backdrop-blur-sm border border-white border-opacity-30 rounded-lg hover:bg-opacity-50 transition-all duration-300 shadow-md">
                  <GoogleSignInButton />
                </div>

                <div className="w-full px-5 py-3 flex items-center justify-center bg-white bg-opacity-40 backdrop-blur-sm border border-white border-opacity-30 rounded-lg hover:bg-opacity-50 transition-all duration-300 shadow-md">
                  <SignInWithLinkedIn />
                </div>

                <button
                  onClick={() => setIsEmailLogin(true)}
                  className="w-full px-5 py-3 flex items-center justify-center space-x-3 bg-white bg-opacity-40 backdrop-blur-sm border border-white border-opacity-30 rounded-lg hover:bg-opacity-50 transition-all duration-300 shadow-md"
                >
                  <Mail size={18} className="text-gray-800" />
                  <span className="text-gray-800">Continue with Email</span>
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 border-opacity-30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white bg-opacity-50 backdrop-blur-sm text-gray-700 rounded-md">Or</span>
                  </div>
                </div>

                <button
                  onClick={navigateToBooking}
                  className="w-full px-5 py-3 flex items-center justify-center space-x-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all duration-300 font-medium shadow-md"
                >
                  <span>Proceed to Authentication</span>
                  <ChevronRight size={16} />
                </button>
                
                <button
                  onClick={navigateToHome}
                  className="w-full px-5 py-3 flex items-center justify-center space-x-3 bg-black bg-opacity-80 text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md"
                >
                  <Home size={18} />
                  <span>Return to Dashboard</span>
                </button>
                
                <div className="text-center text-sm mt-6">
                  <p className="text-gray-700">
                    Don't have access credentials?{' '}
                    <button
                      onClick={navigateToBooking}
                      className="text-amber-600 font-medium hover:underline focus:outline-none"
                    >
                      Request Access
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-8 space-y-4">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white bg-opacity-70 backdrop-blur-sm border border-gray-300 border-opacity-30 rounded-lg focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                      Remember this device
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-amber-600 hover:underline">
                      Forgot credentials?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleEmailSubmit}
                    className="group relative w-full flex justify-center py-3 px-5 border border-transparent rounded-lg text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 shadow-md"
                  >
                    Authenticate
                  </button>
                </div>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEmailLogin(false)}
                    className="text-amber-600 hover:text-amber-700 transition-colors duration-300"
                  >
                    Return to login options
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right section - Enhanced 3D Animation */}
          <div className="hidden md:flex md:w-1/2 p-12 flex-col items-center justify-center relative bg-gradient-to-br from-amber-100 to-amber-50 bg-opacity-30 backdrop-blur-sm">
            <div className="text-center relative z-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Security Portal</h2>
              <p className="text-gray-700 mb-12">AI-powered authentication system</p>
              
              <div className="flex justify-center mb-10 relative h-64 w-64">
                <AnimatedCube />
              </div>
              
              <div className="flex justify-center mt-12">
                <div className="text-center">
                  <img src={logo} alt="Logo" className="h-12 w-auto mx-auto" />
                  <p className="text-xs text-gray-700 mt-3">Enterprise-grade security platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}