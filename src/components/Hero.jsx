import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Clock, Video, Globe, Mic, PlayCircle, Book, Sparkles } from 'lucide-react';

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
    <div className="relative bg-gradient-to-br from-yellow-50 to-white py-16">
      {/* Top decorative border */}
      <BorderLine position="top-0" />
      
      {/* Bottom decorative border */}
      <BorderLine position="bottom-0" />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mx-auto max-w-6xl my-8 relative">
        {/* Decorative corner dots */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-300 -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-300 translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-300 -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-300 translate-x-1 translate-y-1"></div>
        
        {/* Left and right decorative borders */}
        <div className="absolute left-0 top-6 bottom-6 w-0 border-l border-dashed border-gray-200"></div>
        <div className="absolute right-0 top-6 bottom-6 w-0 border-r border-dashed border-gray-200"></div>
        
        <div className="flex gap-4 items-center justify-between flex-col lg:flex-row">
          {/* Left hero content */}
          <div className="flex-1 space-y-4 pb-4">
            <div className="inline-block px-3 py-1 bg-yellow-100 rounded-full text-xs font-medium">
              For Gen Z students (18–27) stressed about software/ML/product careers →
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">
                Turn Your Voice <br />
                into Confidence
              </h1>
              
              <p className="text-gray-700 text-base font-medium">
                Mr. Elite is a voice-first AI mentor who <span className="text-blue-600">listens</span> and <span className="text-blue-600">guides</span>. 
                <strong> Talk</strong> about your goals and fears out loud – Mr. Elite hears you. 
                It's a daily-use, voice-based AI coach that feels like a friend.
              </p>
              
              <p className="text-gray-600 text-base">
                Forget typing complex questions into chatbots. With Mr. Elite, you literally <strong>speak</strong> your 
                mind – about interviews, resumes, or code challenges – and get real-time feedback. It analyzes your 
                resume, tracks your progress, and even checks in on how you're feeling. Our AI adapts its tone to be 
                encouraging, strategic, or honest, giving insightful prompts that keep you growing.
              </p>
            </div>
            
            <div className="space-y-2">
              {/* Primary CTA button */}
              <Button 
                className="w-full sm:w-auto bg-blue-700 text-white hover:bg-blue-800 h-10 px-6 rounded-md flex items-center"
              >
                <Mic className="mr-2 h-4 w-4" />
                Start Speaking
              </Button>
              
              {/* Secondary CTA button */}
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-gray-300 h-10 px-6 rounded-md bg-white text-gray-800 hover:bg-gray-50 flex items-center"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Learn How It Works
              </Button>
              
              <div className="text-xs text-gray-500 mt-1">No typing needed – just use your voice</div>
            </div>
          </div>

          {/* Right illustration section */}
          <div className="w-full lg:w-auto max-w-[300px]">
            <div className="relative overflow-hidden">
              {/* Modern illustration with audio waves */}
              <div className="bg-yellow-50 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-100 rounded-full -mr-16 -mt-16 opacity-70"></div>
                
                {/* Modern professional illustration */}
                <div className="flex justify-center mb-4 relative">
                  <div className="relative flex flex-col items-center">
                    {/* Abstract brain/knowledge illustration */}
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center mb-2">
                      <Sparkles className="text-white w-12 h-12" />
                    </div>
                    
                    {/* Career growth arrow */}
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 w-32 rounded-full mb-2"></div>
                    
                    {/* Book/knowledge icon */}
                    <div className="flex gap-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Book className="text-blue-600 w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Globe className="text-yellow-600 w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Mic className="text-indigo-600 w-6 h-6" />
                      </div>
                    </div>
                    
                    {/* Microphone */}
                    <div className="absolute bottom-0 right-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
                <div className="bg-blue-600 text-white rounded-lg p-2 text-center">
                  <div className="font-medium text-sm">Career Growth Assistant</div>
                </div>
              </div>
              
              {/* Enhanced Calendar below */}
              <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-lg mt-3 shadow-sm overflow-hidden">
                <div className="bg-blue-600 text-white p-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-sm flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {currentMonth} {currentYear}
                    </div>
                    <div className="text-xs bg-blue-500 px-2 py-0.5 rounded-full">
                      IST
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  <div className="grid grid-cols-7 gap-0 text-center mb-1">
                    {daysOfWeek.map((day, i) => (
                      <div key={i} className="text-xs font-medium text-blue-800 py-1">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center bg-white p-1 rounded-md">
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
                            ${isUpcoming ? 'bg-blue-100 text-blue-800 font-medium' : ''}
                            ${isHighlighted ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : ''}
                            ${!isToday && !isUpcoming && !isHighlighted ? 'hover:bg-gray-50 text-gray-600' : ''}
                          `}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex justify-between text-xs mt-2 px-1 text-gray-500">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
                      Today
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 mr-1"></div>
                      Events
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Review section */}
        <div className="mt-6 flex flex-wrap justify-center gap-8">
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 4.5].map((star, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${star === 4.5 ? 'text-green-200' : 'text-green-500'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="ml-2">
              <svg width="60" height="12" viewBox="0 0 80 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M74.4215 12.9729H72.5V6.19214H74.4215V12.9729ZM73.4644 5.36415C72.8942 5.36415 72.4247 4.89465 72.4247 4.32446C72.4247 3.75427 72.8942 3.28477 73.4644 3.28477C74.0345 3.28477 74.504 3.75427 74.504 4.32446C74.504 4.89465 74.0345 5.36415 73.4644 5.36415ZM80 12.9729H78.0786V9.67339C78.0786 8.69397 78.0557 7.45258 76.7315 7.45258C75.3844 7.45258 75.1839 8.50383 75.1839 9.5865V12.9729H73.2625V6.19214H75.1066V7.0714H75.1381C75.4839 6.55127 76.1672 6.00399 77.184 6.00399C79.1358 6.00399 80 7.62445 80 9.7316V12.9729Z" fill="#0A66C2"/>
                <path d="M0 1.7041C0 1.04117 0.234375 0.520833 0.703125 0.143229C1.17188 0.047743 1.69271 0 2.26562 0C2.8073 0 3.30729 0.143229 3.76562 0.429688C4.22396 0.716146 4.45312 1.13021 4.45312 1.67188C4.45312 2.32031 4.22396 2.83073 3.76562 3.20312C3.30729 3.57552 2.79167 3.76172 2.21875 3.76172H2.19531C1.65365 3.76172 1.15365 3.57552 0.695312 3.20312C0.236979 2.83073 0.0078125 2.33594 0 1.7041ZM4.28125 13H0.148438V4.45312H4.28125V13ZM15.5469 13H11.4141V8.34375C11.4141 6.9349 10.8698 6.23047 9.78125 6.23047C9.32292 6.23047 8.93229 6.35417 8.60938 6.60156C8.28646 6.84896 8.05729 7.15365 7.92188 7.51562C7.86458 7.69271 7.83594 7.92969 7.83594 8.22656V13H3.70312C3.71875 9.02083 3.73438 6.25521 3.75 4.70312C3.76562 3.15104 3.77344 2.25 3.77344 2H7.83594V3.77344H7.8125C8.04688 3.40104 8.29688 3.09896 8.5625 2.86719C8.82812 2.63542 9.14583 2.44271 9.51562 2.28906C9.88542 2.13542 10.3255 2.05859 10.8359 2.05859C11.9245 2.05859 12.8568 2.41536 13.6328 3.12891C14.4089 3.84245 14.7969 4.94531 14.7969 6.4375V13H15.5469Z" fill="black"/>
              </svg>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i} 
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="ml-2 bg-yellow-50 rounded-full w-6 h-6 flex items-center justify-center text-yellow-600 font-bold text-xs">
              P
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <svg 
                  key={i} 
                  className="w-4 h-4 text-red-500"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="ml-2 bg-red-50 rounded-full w-6 h-6 flex items-center justify-center text-red-600 font-bold text-xs">
              G
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;