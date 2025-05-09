import { useState } from 'react';
import { ChevronRight, Github, Mail, X, Home } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInbutton';
import SignInWithLinkedIn from './signInWithLinkedIn';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle email login submit
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to booking page on success
      window.location.href = '/booking';
    }, 1500);
  };

  // Handle GitHub OAuth login
  const handleGithubLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Simulate OAuth redirect
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to booking page on success
      window.location.href = '/booking';
    }, 1500);
  };

  // Handle direct navigation to booking page
  const navigateToBooking = () => {
    window.location.href = '/booking';
  };

  // Navigate to home page
  const navigateToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white p-8">
      <div className="w-full max-w-md p-10 space-y-8 bg-gray-900 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out hover:shadow-2xl hover:translate-y-1 relative m-4 border border-gray-800 border-opacity-80 perspective-1000">
        <div className="text-center transform transition-all duration-300">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">Welcome Back</h1>
          <p className="text-gray-300">Login to continue to your account</p>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg z-10">
            <div className="w-12 h-12 border-4 border-t-white border-white border-opacity-20 rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-5 py-4 rounded flex items-center justify-between mb-6">
            <p>{error}</p>
            <button onClick={() => setError('')}>
              <X size={18} />
            </button>
          </div>
        )}

        <div className="space-y-5 mt-8">
          {/* Google Sign In Button */}
          <div className="w-full px-5 py-4 flex items-center justify-center border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
            <GoogleSignInButton />
          </div>

          <button
            onClick={handleGithubLogin}
            className="w-full px-5 py-4 flex items-center justify-center space-x-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
          >
            <Github size={20} />
            <span>Continue with GitHub</span>
          </button>

          {/* LinkedIn Sign In Button */}
          <div className="w-full px-5 py-4 flex items-center justify-center border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md">
            <SignInWithLinkedIn />
          </div>

          <button
            onClick={() => setIsEmailLogin(true)}
            className="w-full px-5 py-4 flex items-center justify-center space-x-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
          >
            <Mail size={20} />
            <span>Continue with Email</span>
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-900 text-gray-400">Or</span>
            </div>
          </div>

          <button
            onClick={navigateToBooking}
            className="w-full px-6 py-5 flex items-center justify-center space-x-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
          >
            <span>Fill Authentication Form</span>
            <ChevronRight size={18} />
          </button>
          
          <button
            onClick={navigateToHome}
            className="w-full px-5 py-4 flex items-center justify-center space-x-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-md mt-2"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </button>
        </div>

        {isEmailLogin && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-white focus:ring-white border-gray-700 rounded"
                />
                <label htmlFor="remember_me" className="ml-3 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-white hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={handleEmailSubmit}
                className="group relative w-full flex justify-center py-4 px-5 border border-transparent rounded-lg text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl"
              >
                Login
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setIsEmailLogin(false)}
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Back to login options
              </button>
            </div>
          </div>
        )}

        {!isEmailLogin && (
          <div className="text-center text-sm mt-8">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={navigateToBooking}
                className="text-white font-medium hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.4),
            0 4px 6px -2px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset,
            0 20px 25px -5px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}