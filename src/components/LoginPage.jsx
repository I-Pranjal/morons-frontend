import { useState } from 'react';
import { ChevronRight, Mail, X, Eye, EyeOff } from 'lucide-react';
import SignInWithLinkedIn from './signInWithLinkedIn';
import GoogleSignInButton from './GoogleSignInbutton';

export default function LoginPage() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle direct navigation to booking page
  const navigateToBooking = () => {
    window.location.href = '/booking';
  };

  // Navigate to home page
  const navigateToHome = () => {
    window.location.href = '/';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }
    
    if (isSignUp && !name) {
      setError('Please enter your full name');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Replace with your actual authentication logic
      console.log('Form submitted:', { name, email, password, whatsapp, isSignUp });
      // Add your authentication logic here
    }, 2000);
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In clicked');
    // Add your Google sign-in logic here
  };

  const handleLinkedInSignIn = () => {
    console.log('LinkedIn Sign In clicked');
    // Add your LinkedIn sign-in logic here
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Video Effect Simulation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
      
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-amber-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">M</span>
              </div>
              <span className="text-3xl font-bold text-white">The Moronss</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {!isEmailLogin ? 'Welcome Back' : (isSignUp ? 'Join The Moronss' : 'Welcome Back')}
            </h1>
            <p className="text-gray-400 text-sm">
              {!isEmailLogin ? 'Sign in to continue your journey' : (isSignUp ? 'Your AI mentor for technical success' : 'Sign in to continue your journey')}
            </p>
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm rounded-3xl z-20">
              <div className="w-8 h-8 border-3 border-t-amber-500 border-amber-500/30 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center justify-between mb-6">
              <span className="text-sm">{error}</span>
              <button onClick={() => setError('')} className="text-red-200 hover:text-white">
                <X size={16} />
              </button>
            </div>
          )}

          {!isEmailLogin ? (
            /* Social Login Options */
            <div className="space-y-4">
              {/* Google Sign In
              <button 
                onClick={handleGoogleSignIn}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button> */}

              <GoogleSignInButton />

                {/* LinkedIn Sign In */}
                {/* <button 
                  onClick={handleLinkedInSignIn}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>Continue with LinkedIn</span>
                </button> */}
              <SignInWithLinkedIn /> 
              {/* Email Login Button */}
              <button
                onClick={() => setIsEmailLogin(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 border border-gray-600 font-medium"
              >
                <Mail size={18} />
                <span>Continue with Email</span>
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-gray-400">Or</span>
                </div>
              </div>

              {/* Proceed to Booking */}
              <button
                onClick={navigateToBooking}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Authentication</span>
                <ChevronRight size={16} />
              </button>

              {/* Sign Up Link */}
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setIsEmailLogin(true);
                      setIsSignUp(true);
                    }}
                    className="text-amber-400 hover:text-amber-300 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* Email Login/Signup Form */
            <div className="space-y-4">
              {/* Toggle between Sign In and Sign Up */}
              <div className="text-center mb-6">
                <div className="inline-flex bg-gray-800 rounded-xl p-1">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      !isSignUp 
                        ? 'bg-amber-500 text-black' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isSignUp 
                        ? 'bg-amber-500 text-black' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {/* Name Field (only for signup) */}
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    placeholder={isSignUp ? "your.email@example.com" : "pranjalmishr@gmail.com"}
                  />
                </div>

                {/* WhatsApp Number (only for signup) */}
                {isSignUp && (
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-2">
                      WhatsApp Number *
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                      placeholder="+91 9876543210"
                    />
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 pr-12"
                      placeholder={isSignUp ? "Enter your password" : "••••••••••"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me / Forgot Password (only for sign in) */}
                {!isSignUp && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        name="remember_me"
                        type="checkbox"
                        className="h-4 w-4 text-amber-500 focus:ring-amber-500 bg-gray-800 border-gray-600 rounded"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <button 
                        onClick={() => setError('Password reset functionality will be implemented')}
                        className="text-amber-400 hover:text-amber-300"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 disabled:cursor-not-allowed text-black font-bold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Continue' : 'Sign In'}</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>

                {/* Toggle Sign In/Up Link */}
                <div className="text-center">
                  <p className="text-gray-400 text-sm">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-amber-400 hover:text-amber-300 font-medium"
                    >
                      {isSignUp ? 'Sign in' : 'Sign up'}
                    </button>
                  </p>
                </div>
              </div>

              {/* Back to Options */}
              <div className="text-center mt-6 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsEmailLogin(false)}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  ← Back to login options
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-xs">
            Secure enterprise-grade authentication platform
          </p>
        </div>
      </div>
    </div>
  );
}