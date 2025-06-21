import { useState } from 'react';
import { Mic, ArrowRight, Users, BookOpen, Target, TrendingUp, Settings, Code, Trophy, Star, Zap } from 'lucide-react';
import { FlipWords } from "../components/ui/flip-words";

// Google Sign-In Button Component
const GoogleSignInButton = ({ className = "" }) => {
  const handleGoogleSignIn = () => {
    // Add your Google Sign-In logic here
    console.log('Google Sign-In clicked');
    alert('Google Sign-In functionality would be implemented here');
  };

  return (
    <button 
      onClick={handleGoogleSignIn}
      className={`group w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center border border-gray-300 ${className}`}
    >
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
  );
};

// LinkedIn Sign-In Button Component
const SignInWithLinkedIn = ({ className = "" }) => {
  const handleLinkedInSignIn = () => {
    // Add your LinkedIn Sign-In logic here
    console.log('LinkedIn Sign-In clicked');
    alert('LinkedIn Sign-In functionality would be implemented here');
  };

  return (
    <button 
      onClick={handleLinkedInSignIn}
      className={`group w-full sm:w-auto bg-[#0077B5] hover:bg-[#005885] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center ${className}`}
    >
      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      Continue with LinkedIn
    </button>
  );
};

const Hero = () => {
  const [email, setEmail] = useState('');

  const handleWaitlistSubmit = () => {
    if (email.trim()) {
      console.log('Email submitted:', email);
      // You can add actual submission logic here
      alert('Thank you for joining our waitlist!');
      setEmail('');
    }
  };
   const words = ["Get Hired.", "Thrive.", "Succeed.", "Go Pro."];

  return (
    <div className="my-10 mb-0 bg-neutral-900 py-10 text-white w-100vw">
      {/* Hero Section */}
      <div id='hero' className="my-10 flex flex-col justify-center items-center px-6 w-full">
        <div className="max-w-7xl mx-auto text-center space-y-10 w-full">
          
          {/* Main Heading */}
          <div className="space-y-5 w-full">
            {/* <div className="inline-flex items-center bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 text-sm font-medium text-yellow-400 mb-6 w-auto">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Career Mentorship
            </div> */}

              <p className='text-lg md:text-xl text-gray-300 mb-2'>
              Supported by the best
              </p>
            <div className='mb-6 flex justify-center items-center space-x-5 w-full'>
              <img src="https://www.health-thing.com/wp-content/uploads/2023/07/MS_Startups_Celebration_Badge_Dark.png" className="w-20 lg:w-40" />
              <img src="https://www.iiitd.ac.in/sites/default/files/images/logo/style1colorlarge.png" className="w-20 lg:w-48 rounded-2xl" />
              <img src="https://www.serversimply.com/media/20181218-Nvidia-Inception.png" className="w-20 lg:w-36 rounded-xl" />
            </div>
            <center>
              <h1 className="text-3xl md:text-8xl  font-bold leading-tight text-white w-auto">
                Learn.Build.
                <span className="text-yellow-400">
                  <FlipWords words={words} />
                </span>
              </h1>
            </center>

            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed w-full">
              Welcome to The Moronss, where wetransform your career journey with personalized AI mentorship.
              From hands-on labs to industry recognition, we equip you with the skills and confidence to land your dream job.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.location.href = '/login'}
              className="group bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-3 px-10 rounded-full text-2xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center"
            >
              Get Started
    </button>
            
          </div>

          {/* Waitlist Section */}
          {/* <div className="space-y-3">
            <p className="text-gray-400 text-sm">Join our waitlist for early access</p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-sm"
              />
              <button 
                onClick={handleWaitlistSubmit}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-5 rounded-lg transition-colors text-sm whitespace-nowrap"
              >
                Join Waitlist
              </button>
            </div>
          </div> */}


          {/* Stats Section */}
          {/* <div className="pt-5 text-gray-300 border-t border-gray-600/50">
          <p>
            Our vision is to empower every aspiring developer with the skills and confidence to excel in their careers and we are constantly expanding PAN India
          </p>
 As we get support of some of the colleges and universities, we will provide images of college logo to showcases more credibility.
          </div>  */}            
        </div>
      </div>


 
    </div>
  );
};

export default Hero;