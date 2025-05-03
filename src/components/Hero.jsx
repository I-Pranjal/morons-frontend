import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Clock, Video, Globe } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInbutton';
import SignInWithLinkedIn from './signInWithLinkedIn';



// Sample data for dynamic consultation cards
const consultationTypes = [
  {
    name: "Elite Bot",
    title: "Waitlist Onboarding",
    description: "Let's get you set up in our Early Access Club—complete just the basics and we'll ping you when your mentor room opens.",
    duration: "5 mins",
    platform: "Web Chat",
    location: "Virtual – Global"
  },
  {
    name: "Career Compass",
    title: "Voice Introduction",
    description: "Kick off with a quick voice greeting—tell me your name and career goals, and I'll remember them for our next deep dive.",
    duration: "7 mins",
    platform: "Voice Call",
    location: "Hosted by Mr. Elite"
  },
  {
    name: "Goal Mapper",
    title: "Goal Setting Session",
    description: "We'll map out your top 3 career milestones and sketch a high-level plan to hit them—think of it as your AI-powered roadmap.",
    duration: "20 mins",
    platform: "In-App Chat",
    location: "Your Dashboard"
  },
  {
    name: "Resume Auditor",
    title: "Resume Strength Audit",
    description: "Upload your CV and I'll give you real-time feedback on formatting, keywords, and impact statements to boost your profile.",
    duration: "15 mins",
    platform: "Document Review",
    location: "Secure Upload"
  },
  {
    name: "Strategy Deep Dive",
    title: "1-on-1 Strategy Coaching",
    description: "A personalized consult where we refine your approach—interview prep, networking tactics, or skill-gap analysis, based on your needs.",
    duration: "30 mins",
    platform: "Video Call",
    location: "Zoom"
  }
];


// Platform icons mapping
const platformIcons = {
  "Zoom": () => <Video className="text-blue-500" size={16} />,
  "Google Meet": () => <div className="w-4 h-4 bg-white rounded flex items-center justify-center">
    <div className="w-3 h-3 flex items-center justify-center">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 4.5h18v15H3v-15Z" fill="#fff"/>
        <path d="M22.5 11.63v4.722a1.16 1.16 0 0 1-1.15 1.15H13l4 3v-3H3.65a1.154 1.154 0 0 1-1.15-1.15V4.65a1.154 1.154 0 0 1 1.15-1.15h16.7a1.154 1.154 0 0 1 1.15 1.15v1.02L16 12l6.5 6.5V12.838l-5.137-5.09 1.135-1.117 3.752 3.7v-1.7Z" fill="#00832d"/>
        <path d="M22.5 6.818v4.812l-5.137-5.09 1.135-1.117 3.752 3.7v-.305a1.154 1.154 0 0 0-1.15-1.15h-16.7a1.154 1.154 0 0 0-1.15 1.15v10.7a1.154 1.154 0 0 0 1.15 1.15h13.35v-1.5H5a.5.5 0 0 1-.5-.5V7.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5v4.5h1.5V8.15l4.5 4.35v-5.682Z" fill="#0066da"/>
        <path d="M22.5 12.818v5.532a1.16 1.16 0 0 1-1.15 1.15H17v-3l4 3h-7.35v-1.5H21a.5.5 0 0 0 .5-.5v-9.06l1 1Z" fill="#e94235"/>
      </svg>
    </div>
  </div>,
  "Microsoft Teams": () => <div className="w-4 h-4 bg-indigo-600 rounded flex items-center justify-center">
    <div className="w-2 h-2 text-white">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="white">
        <path d="M11.984 2c5.51 0 9.984 4.473 9.984 9.984 0 5.51-4.473 9.984-9.984 9.984-5.51 0-9.984-4.473-9.984-9.984C2 6.473 6.473 2 11.984 2zM20 12h-4v4h-4v-4H8V8h4V4h4v4h4v4z" />
      </svg>
    </div>
  </div>
};

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



const Hero = () => {
  // Initialize date with Indian Standard Time (UTC+5:30)
  const [date, setDate] = useState(() => {
    // Create date in IST by adding the offset
    const now = new Date();
    // IST is UTC+5:30, so we add 5 hours and 30 minutes to UTC
    return new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  });


  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(consultationTypes[0]);
  
  useEffect(() => {
    // Update the date every minute to keep it current
    const dateInterval = setInterval(() => {
      const now = new Date();
      // Update to IST
      setDate(new Date(now.getTime() + (5.5 * 60 * 60 * 1000)));
    }, 60000);
    
    // Set up an interval to change the card every 3 seconds
    const cardInterval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % consultationTypes.length;
        setCurrentCard(consultationTypes[newIndex]);
        return newIndex;
      });
    }, 3000);
    
    return () => {
      clearInterval(dateInterval);
      clearInterval(cardInterval);
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
    <div className="relative bg-white py-16">
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
            <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
            Join the Early Access Club →
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-bold">
              Your Personalized<br/>
              AI Career Mentor
              </h1>
              
              <p className="text-gray-600 text-base">
              Meet Mr Elite—your on-demand coach for resume audits, goal mapping, and strategy deep dives.A real-time listener and career compass—step into your custom mentor room and start refining your skills today.AI-powered guidance that listens, advises and propels you—without the jargon or fluff.
              </p>
            </div>
            
            <div className="space-y-2 grid w-fit">
              {/* LinkedIn button */}
             <SignInWithLinkedIn />
              
              {/* GitHub button */}
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-gray-300 h-10 px-4 rounded-md bg-gray-800 text-white hover:bg-gray-700"
              >
                <div className="mr-2">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                Sign up with GitHub
              </Button>
              <GoogleSignInButton  />

              
            </div>
          </div>

          {/* Right calendar section */}
          <div className="w-full lg:w-auto max-w-[260px]">
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              {/* Consultation Card */}
              <Card className="rounded-b-none border-b">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-medium">{currentCard.name.charAt(0)}</span>
                    </div>
                    <div className="font-medium text-sm">{currentCard.name}</div>
                  </div>
                  
                  <h3 className="font-semibold text-base mb-1">{currentCard.title}</h3>
                  <p className="text-gray-600 text-xs mb-2">{currentCard.description}</p>
                  
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-gray-700 text-xs">{currentCard.duration}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {platformIcons[currentCard.platform] ? platformIcons[currentCard.platform]() : <Video size={16} className="text-gray-500" />}
                      <span className="text-gray-700 text-xs">{currentCard.platform}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Globe size={16} className="text-gray-500" />
                      <span className="text-gray-700 text-xs">{currentCard.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Calendar Display */}
              <div className="bg-white p-2">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm">
                    {currentMonth} {currentYear}
                  </div>
                  <div className="text-xs text-gray-500">
                    Indian Standard Time
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-0 text-center">
                  {daysOfWeek.map((day, i) => (
                    <div key={i} className="text-xs text-gray-500 py-1">{day}</div>
                  ))}
                  
                  {calendarDays.map((day, i) => {
                    if (day === null) {
                      return <div key={i} className="w-6 h-6"></div>;
                    }
                    
                    const isToday = day === currentDay;
                    const isActive = isToday || day === 20;
                    
                    return (
                      <div 
                        key={i} 
                        className={`w-6 h-6 flex items-center justify-center text-xs
                          ${isActive ? 'font-medium' : 'text-gray-400'}
                          ${isToday ? 'bg-black text-white rounded-md' : ''}
                        `}
                      >
                        {day}
                      </div>
                    );
                  })}
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