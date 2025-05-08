import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Clock, Video, Globe, Mic, PlayCircle, Book, Sparkles } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInbutton';
import SignInWithLinkedIn from './signInWithLinkedIn';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link'; 

// Decorative border component
const BorderLine = ({ position }) => {
  return (
    <div className={`absolute ${position} w-full overflow-hidden`}>
      <div className="w-full border-t border-dashed border-gray-200"></div>
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="absolute top-0 w-4 h-4 bg-white border border-gray-200 rounded-full transform -translate-y-1/2"
          style={{ left: `${i * 5}%` }}
        ></div>
      ))}
    </div>
  );
};

// Audio wave animation component
const AudioWaves = () => {
  return (
    <div className="flex items-end h-16 gap-1">
      {[...Array(12)].map((_, i) => {
        // Generate random heights for the audio bars between 20% and 100%
        const height = 20 + Math.random() * 80;
        return (
          <div 
            key={i}
            className="w-1 bg-gradient-to-t from-yellow-400 to-blue-500 rounded-full animate-pulse"
            style={{ 
              height: `${height}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${0.7 + Math.random() * 0.5}s`
            }}
          ></div>
        );
      })}
    </div>
  );
};

const Hero = () => {
  // Initialize date with Indian Standard Time (UTC+5:30)
  const [date, setDate] = useState(() => {
    // Create date in IST by adding the offset
    const now = new Date();
    // IST is UTC+5:30, so we add 5 hours and 30 minutes to UTC
    return new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  });
  
  useEffect(() => {
    // Update the date every minute to keep it current
    const dateInterval = setInterval(() => {
      const now = new Date();
      // Update to IST
      setDate(new Date(now.getTime() + (5.5 * 60 * 60 * 1000)));
    }, 60000);
    
    return () => {
      clearInterval(dateInterval);
    };
  }, []);

  // Get current month in full text format (e.g., "May")
  const currentMonth = date.toLocaleString('en-US', { month: 'long' });
  const currentYear = date.getFullYear();
  const currentDay = date.getDate();
  
  // Generate the first day of the month in IST
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  // Day of week for the first day (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Get the number of days in the current month
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // Generate days for the calendar display
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Generate calendar days array with empty slots for the correct positioning
  const calendarDays = [];
  
  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add the actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  return (
    <div id='hero' className="relative bg-gradient-to-br from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      {/* Top decorative border */}
      <BorderLine position="top-0" />
      
      {/* Bottom decorative border */}
      <BorderLine position="bottom-0" />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6 mx-auto max-w-6xl my-8 relative">
        {/* Decorative corner dots */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-300 dark:border-gray-600 -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-300 dark:border-gray-600 translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-300 dark:border-gray-600 -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-300 dark:border-gray-600 translate-x-1 translate-y-1"></div>
        
        {/* Left and right decorative borders */}
        <div className="absolute left-0 top-6 bottom-6 w-0 border-l border-dashed border-gray-200 dark:border-gray-700"></div>
        <div className="absolute right-0 top-6 bottom-6 w-0 border-r border-dashed border-gray-200 dark:border-gray-700"></div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Left hero content */}
          <div className="flex-1 space-y-6 pb-4 w-full">
            <div className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 rounded-full text-xs font-medium text-yellow-800 dark:text-yellow-200">
              For Gen Z students (18–27) stressed about software/ML/product careers →
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Turn Your Voice <br />
                into Confidence
              </h1>
              
              <p className="text-gray-700 dark:text-gray-300 text-base font-medium">
                Mr. Elite is a voice-first AI mentor who <span className="text-blue-600 dark:text-blue-400">listens</span> and <span className="text-blue-600 dark:text-blue-400">guides</span>. 
                <strong> Talk</strong> about your goals and fears out loud – Mr. Elite hears you. 
                It's a daily-use, voice-based AI coach that feels like a friend.
              </p>
              
              <p className="text-gray-600 dark:text-gray-400 text-base">
                Forget typing complex questions into chatbots. With Mr. Elite, you literally <strong>speak</strong> your 
                mind – about interviews, resumes, or code challenges – and get real-time feedback. It analyzes your 
                resume, tracks your progress, and even checks in on how you're feeling. Our AI adapts its tone to be 
                encouraging, strategic, or honest, giving insightful prompts that keep you growing.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Sign-in options with improved design */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center sm:justify-start">
                {/* LinkedIn button */}
                <div className="w-full sm:w-auto max-w-xs">
                  <SignInWithLinkedIn className="shadow-md hover:shadow-lg transition-all duration-200 border-2 border-blue-600 bg-white dark:bg-blue-900 dark:border-blue-700 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-100 font-medium rounded-lg" />
                </div>
                
                {/* GitHub button */}
                <div className="w-full sm:w-auto max-w-xs">
                  <Button 
                    variant="outline" 
                    className="w-full h-11 px-4 rounded-lg border-2 border-gray-700 dark:border-gray-600 bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <div className="mr-2">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </div>
                    Sign up with GitHub
                  </Button>
                </div>
                
                {/* Google Sign-In button */}
                <div className="w-full sm:w-auto max-w-xs">
                  <GoogleSignInButton className="shadow-md hover:shadow-lg transition-all duration-200 border-2 border-red-500 dark:border-red-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-medium rounded-lg" />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                {/* Primary CTA button (with Link) */}
                <Link to="/booking" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-[#FFCB47] text-[#1B1B1B] font-bold py-3 px-8 border-2 border-black dark:border-yellow-600 rounded-lg flex items-center justify-center hover:bg-[#e6b73e] shadow-md hover:shadow-lg transition-all duration-200">
                    <Mic className="mr-2 h-4 w-4" />
                    Start Speaking
                  </button>
                </Link>
                
                {/* Learn How It Works button - Modified to use HashLink to scroll to BookingExperience section */}
                <HashLink smooth to="#booking-experience" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-white dark:bg-gray-700 text-[#1B1B1B] dark:text-gray-200 font-bold py-3 px-8 border-2 border-black dark:border-gray-500 rounded-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 shadow-md hover:shadow-lg transition-all duration-200">
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Learn How It Works
                  </button>
                </HashLink>
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center sm:text-left">No typing needed – just use your voice</div>
            </div>
          </div>

          {/* Right illustration section */}
          <div className="w-full lg:w-auto max-w-[300px] mx-auto">
            <div className="relative overflow-hidden">
              {/* Modern illustration with audio waves */}
              <div className="bg-yellow-50 dark:bg-gray-700 rounded-lg p-4 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 dark:bg-yellow-900 rounded-full -mr-16 -mt-16 opacity-70"></div>
                
                {/* Modern professional illustration */}
                <div className="flex justify-center mb-4 relative">
                  <div className="relative flex flex-col items-center">
                    {/* Abstract brain/knowledge illustration */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-2 shadow-lg">
                      <Sparkles className="text-white w-12 h-12" />
                    </div>
                    
                    {/* Career growth arrow */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 w-32 rounded-full mb-2"></div>
                    
                    {/* Book/knowledge icon */}
                    <div className="flex gap-2">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center shadow-md">
                        <Book className="text-blue-600 dark:text-blue-300 w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-800 rounded-lg flex items-center justify-center shadow-md">
                        <Globe className="text-yellow-600 dark:text-yellow-300 w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-800 rounded-lg flex items-center justify-center shadow-md">
                        <Mic className="text-indigo-600 dark:text-indigo-300 w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Microphone */}
                    <div className="absolute bottom-0 right-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                        <Mic className="text-white w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Audio waves */}
                <div className="flex justify-center mb-2">
                  <AudioWaves />
                </div>
                
                {/* Career growth label */}
                <div className="bg-blue-600 dark:bg-blue-800 text-white rounded-lg p-2 text-center shadow-md">
                  <div className="font-medium text-sm">Career Growth Assistant</div>
                </div>
              </div>
              
              {/* Enhanced Calendar below */}
              <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-gray-800 border border-blue-100 dark:border-blue-800 rounded-lg mt-3 shadow-md overflow-hidden">
                <div className="bg-blue-600 dark:bg-blue-700 text-white p-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentMonth} {currentYear}
                    </div>
                    <div className="text-xs bg-blue-500 dark:bg-blue-600 px-2 py-0.5 rounded-full">
                      IST
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <div className="grid grid-cols-7 gap-0 text-center mb-1">
                    {daysOfWeek.map((day, i) => (
                      <div key={i} className="text-xs font-medium text-blue-800 dark:text-blue-300 py-1">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center bg-white dark:bg-gray-700 p-1 rounded-md">
                    {calendarDays.map((day, i) => {
                      if (day === null) {
                        return <div key={i} className="w-6 h-6"></div>;
                      }
                      
                      const isToday = day === currentDay;
                      const isUpcoming = day > currentDay && day < currentDay + 5;
                      const isHighlighted = day === 15 || day === 20 || day === 25;
                      
                      return (
                        <div 
                          key={i} 
                          className={`w-6 h-6 flex items-center justify-center text-xs rounded-full
                            ${isToday ? 'bg-blue-600 text-white font-medium shadow-md' : ''}
                            ${isUpcoming ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 font-medium' : ''}
                            ${isHighlighted ? 'bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700' : ''}
                            ${!isToday && !isUpcoming && !isHighlighted ? 'hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300' : ''}
                          `}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between text-xs mt-2 px-1 text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 mr-1"></div>
                      Today
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 dark:bg-yellow-500 mr-1"></div>
                      Events
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;