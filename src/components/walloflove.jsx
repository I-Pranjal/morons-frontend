import { useState, useEffect } from 'react';
import avater from '../assets/avatar.png'; 
import Ananya from '../assets/k.jpg';
import Arjun from '../assets/b.jpg';
import Karan from '../assets/d.jpg';
import Rahul from '../assets/e.jpg';
import Rohan from '../assets/f.jpg';
import Vikram from '../assets/g.jpg';
import Isha from '../assets/h.jpg';
import Priya from '../assets/i.jpg';
import Neha from '../assets/j.jpg';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    position: "Software Engineer",
    company: "Google",
    image: Arjun,
    text: "The resume tracking system helped me organize my job hunt. I could see which skills I needed to improve, and the resources provided were invaluable. I landed my dream job in just 3 months!",
    exam: "Technical Interview",
    timeToAchieve: "3 months",
    resources: ["LeetCode Premium", "System Design Interview Book", "Mock Interview Platform"]
  },
  {
    id: 2,
    name: "Neha Reddy",
    position: "UX Designer",
    company: "Flipkart",
    image: Neha,
    text: "I used the resume test website to prepare for my portfolio review. The system tracked which parts of my resume attracted the most attention and helped me refine my presentation!",
    exam: "Design Portfolio Review",
    timeToAchieve: "5 months",
    resources: ["UI/UX Workshop", "Portfolio Critique Group", "Design Systems Course"]
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    position: "Data Scientist",
    company: "Amazon",
    image: Vikram,
    text: "The platform's analytics on my resume reading patterns helped me understand what recruiters look for. The suggested improvements increased my callback rate by 70%!",
    exam: "Data Science Assessment",
    timeToAchieve: "2.5 months",
    resources: ["Kaggle Competitions", "SQL Practice Platform", "Machine Learning Course"]
  },
  {
    id: 4,
    name: "Karan Mehta",
    position: "HR Manager",
    company: "Infosys",
    image: Karan,
    text: "As someone who reviews resumes professionally, I was skeptical. But the platform's insights were spot-on! The system helped me improve my own resume and land a senior HR position.",
    exam: "HR Certification",
    timeToAchieve: "6 months",
    resources: ["HR Analytics Course", "Talent Management Certification", "HR Leadership Workshop"]
  },
  {
    id: 5,
    name: "Rohan Agarwal",
    position: "Marketing Specialist",
    company: "Swiggy",
    image: Rohan,
    text: "The goal tracking feature kept me accountable throughout my job search. The suggested timelines were realistic, and I achieved my dream marketing position ahead of schedule!",
    exam: "Marketing Strategy",
    timeToAchieve: "3.5 months",
    resources: ["Digital Marketing Certification", "Brand Strategy Workshop", "Public Speaking Course"]
  },
  {
    id: 6,
    name: "Priya Verma",
    position: "Frontend Developer",
    company: "Razorpay",
    image: Priya,
    text: "The resume test website helped me identify gaps in my skills. The weekly progress reports and suggested timelines kept me focused. I landed a role at my dream company in just 10 weeks!",
    exam: "Frontend Coding Challenge",
    timeToAchieve: "2.5 months",
    resources: ["JavaScript Masterclass", "React Advanced Patterns", "UI Components Library"]
  },
  {
    id: 7,
    name: "Ananya Patel",
    position: "Product Manager",
    company: "Microsoft",
    image: Ananya,
    text: "The personalized study plan changed everything for me. I could track my progress daily, and the AI suggestions pointed me to exactly what I needed to work on. Passed my PM interview with flying colors!",
    exam: "Product Case Study",
    timeToAchieve: "4 months",
    resources: ["Product School Resources", "Case Study Framework Guide", "Market Analysis Tools"]
  },
  {
    id: 8,
    name: "Isha Desai",
    position: "Financial Analyst",
    company: "HDFC Bank",
    image: Isha,
    text: "The resume tracking and feedback loops gave me clear action items each week. The timeline feature helped me pace my preparation perfectly for the rigorous interview process.",
    exam: "Financial Modeling Assessment",
    timeToAchieve: "4 months",
    resources: ["Financial Modeling Course", "Excel Advanced Functions", "Valuation Techniques Workshop"]
  },
  {
    id: 9,
    name: "Rahul Joshi",
    position: "Content Strategist",
    company: "Zomato",
    image: Rahul,
    text: "The platform gave me insight into how recruiters scan creative resumes. I could see which parts of my portfolio were getting attention and which needed improvement.",
    exam: "Content Strategy Presentation",
    timeToAchieve: "3 months",
    resources: ["Storytelling Workshop", "Content Analytics Course", "Brand Voice Development"]
  }
];

// Toast Component
const Toast = ({ message, onClose, isDarkMode }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

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
  
  return (
    <div className={`fixed bottom-4 right-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-black text-white'} px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center`}>
    
      <span>{message}</span>
      <button onClick={onClose} className="ml-3 text-white hover:text-gray-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default function WallOfLove() {
  const [toasts, setToasts] = useState([]);
  const [toastId, setToastId] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const [savedTestimonials, setSavedTestimonials] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);
  
  // Default number of cards to show in the first row
  const cardsPerRow = 3;
  
  // Set default to white mode (light mode)
  useEffect(() => {
    // Instead of checking system preference, we explicitly set to light mode (false)
    setIsDarkMode(false);
    
    // We can still listen for system changes if needed
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Comment the line below if you want to completely ignore system preferences
      // setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Get color scheme based on mode
  const getColorClasses = () => {
    if (isDarkMode) {
      return {
        bgPrimary: 'bg-gray-900',
        bgSecondary: 'bg-gray-800',
        bgAccent: 'bg-amber-500', 
        bgAccentHover: 'hover:bg-amber-600',
        bgGradient: 'bg-gradient-to-r from-gray-800 to-gray-900',
        bgCard: 'bg-gray-800',
        bgCardSecondary: 'bg-gray-700',
        textPrimary: 'text-white',
        textSecondary: 'text-gray-300',
        textAccent: 'text-amber-500',
        textAccentHover: 'hover:text-amber-400',
        borderPrimary: 'border-gray-700',
        borderAccent: 'border-amber-500',
        divider: 'bg-amber-500',
        shadowCard: 'shadow-lg shadow-gray-900/50',
        buttonPrimary: 'bg-amber-500 hover:bg-amber-600 text-gray-900',
        buttonSecondary: 'bg-transparent hover:bg-amber-500 text-white hover:text-gray-900 border border-amber-500',
        tagBg: 'bg-gray-700 hover:bg-gray-600',
        tagText: 'text-gray-200',
        timelineBg: 'bg-amber-900',
        timelineBgHover: 'hover:bg-amber-800',
        timelineText: 'text-amber-200',
        accent: 'text-red-400', 
        starFill: 'text-amber-500'
      };
    } else {
      return {
        bgPrimary: 'bg-white',
        bgSecondary: 'bg-gray-50',
        bgAccent: 'bg-yellow-400', 
        bgAccentHover: 'hover:bg-yellow-500',
        bgGradient: 'bg-gradient-to-r from-yellow-50 to-white',
        bgCard: 'bg-white',
        bgCardSecondary: 'bg-gray-50',
        textPrimary: 'text-black', 
        textSecondary: 'text-gray-700',
        textAccent: 'text-yellow-500',
        textAccentHover: 'hover:text-yellow-600',
        borderPrimary: 'border-gray-100',
        borderAccent: 'border-yellow-400',
        divider: 'bg-yellow-400', 
        shadowCard: 'shadow-lg',
        buttonPrimary: 'bg-yellow-400 hover:bg-yellow-500 text-black',
        buttonSecondary: 'bg-transparent hover:bg-black text-black hover:text-white border border-black',
        tagBg: 'bg-white hover:bg-gray-100',
        tagText: 'text-gray-800',
        timelineBg: 'bg-yellow-100',
        timelineBgHover: 'hover:bg-yellow-200',
        timelineText: 'text-yellow-800',
        accent: 'text-red-700', 
        starFill: 'text-yellow-500'
      };
    }
  };
  
  const colors = getColorClasses();
  
  const showToast = (message) => {
    const id = toastId;
    setToasts([...toasts, { id, message }]);
    setToastId(id + 1);
  };
  
  const closeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };
  
  const handleSaveTestimonial = (id) => {
    if (savedTestimonials.includes(id)) {
      setSavedTestimonials(savedTestimonials.filter(savedId => savedId !== id));
      showToast("Testimonial removed from saved items");
    } else {
      setSavedTestimonials([...savedTestimonials, id]);
      showToast("Testimonial saved for future reference");
    }
  };
  
  const handleResourceClick = (resource) => {
    showToast(`Exploring resource: ${resource}`);
  };
  
  const handleTimelineClick = (time) => {
    showToast(`Typical achievement timeline: ${time}`);
  };
  
  const handleContactClick = (person) => {
    showToast(`Request to connect with ${person} sent!`);
  };
  
  const handleCompanyClick = (company) => {
    showToast(`Viewing ${company} hiring insights...`);
  };
  
  // Toggle show all cards
  const toggleShowAllCards = () => {
    setShowAllCards(!showAllCards);
    if (!showAllCards) {
      showToast("Showing all success stories");
    }
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
  
  // Determine which testimonials to display
  const displayedTestimonials = showAllCards ? testimonials : testimonials.slice(0, cardsPerRow);
  
  return (
     <div className="w-full py-8 rounded-xl my-8 relative">
    
    {/* Top decorative border */}
      <BorderLine position="top-0" />
      
      {/* Bottom decorative border */}
      <BorderLine position="bottom-0" />
      
      {/* Decorative corner dots */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gray-300 -translate-x-1 -translate-y-1"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gray-300 translate-x-1 -translate-y-1"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gray-300 -translate-x-1 translate-y-1"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gray-300 translate-x-1 translate-y-1"></div>
      
      {/* Left and right decorative borders */}
      <div className="absolute left-0 top-6 bottom-6 w-0 border-l border-dashed border-gray-200"></div>
      <div className="absolute right-0 top-6 bottom-6 w-0 border-r border-dashed border-gray-200"></div>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins text-gray-900">Wall of Love</h2>
          {/* <div className={`h-1 w-24 ${colors.divider} mx-auto mb-6`}></div> */}
          <p className="text-xl text-center text-gray-700 mb-8 max-w-3xl mx-auto font-poppins">
            See why our users love our platform and how it helped them achieve their career goals
          </p>
        </div>
        
        {/* Testimonials Grid with Blur Effect for Non-Displayed Cards */}
        <div className="relative">
          {/* First Row Cards - Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className={`
                  ${colors.bgCard} rounded-xl ${colors.shadowCard} overflow-hidden border ${colors.borderPrimary}
                  transition-all duration-300 hover:shadow-xl
                  ${expandedId === testimonial.id ? 'scale-105 z-10' : ''}
                `}
              >
                {/* Top Section - Always visible */}
                <div className={`p-6 ${colors.bgGradient}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${colors.borderAccent}`}>
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className={`font-bold text-lg ${colors.textPrimary} font-poppins`}>{testimonial.name}</h3>
                      <button 
                        onClick={() => handleCompanyClick(testimonial.company)}
                        className={`${colors.accent} hover:opacity-80 font-medium text-sm transition-colors font-poppins`}
                      >
                        {testimonial.position} @ {testimonial.company}
                      </button>
                      
                      <div className={`flex items-center mt-1 ${colors.starFill}`}>
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleSaveTestimonial(testimonial.id)}
                      className={`
                        p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors
                        ${savedTestimonials.includes(testimonial.id) ? colors.accent : isDarkMode ? 'text-gray-400' : 'text-gray-400'}
                      `}
                      aria-label="Save testimonial"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path 
                          fillRule="evenodd" 
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Quote */}
                  <div className="mt-4 relative">
                    <div className={`text-4xl ${colors.textAccent} font-extrabold absolute top-0 left-0 font-poppins`}>"</div>
                    <p className={`${colors.textPrimary} pl-6 pr-2 font-poppins`}>
                      {expandedId === testimonial.id 
                        ? testimonial.text 
                        : `${testimonial.text.substring(0, 100)}${testimonial.text.length > 100 ? '...' : ''}`
                      }
                    </p>
                    <div className={`text-4xl ${colors.textAccent} font-extrabold absolute bottom-0 right-0 font-poppins`}>"</div>
                  </div>
                  
                  {/* Expand/Collapse Button */}
                  {testimonial.text.length > 100 && (
                    <button
                      onClick={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
                      className={`mt-2 ${colors.textAccent} ${colors.textAccentHover} font-medium flex items-center text-sm font-poppins`}
                    >
                      {expandedId === testimonial.id ? 'Show less' : 'Read more'}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform ${expandedId === testimonial.id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Bottom Section - Details */}
                <div className={`p-4 ${colors.bgCardSecondary} border-t ${colors.borderPrimary}`}>
                  <div className="flex justify-between mb-3">
                    <div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-poppins font-medium`}>Target Exam</span>
                      <p className={`font-bold ${colors.textPrimary} font-poppins`}>{testimonial.exam}</p>
                    </div>
                    <button 
                      onClick={() => handleTimelineClick(testimonial.timeToAchieve)}
                      className={`flex items-center text-xs ${colors.timelineBg} ${colors.timelineBgHover} ${colors.timelineText} px-2 py-1 rounded transition-colors font-poppins font-medium`}
                    >
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {testimonial.timeToAchieve}
                    </button>
                  </div>
                  
                  {/* Resources */}
                  <div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} font-poppins font-medium`}>Recommended Resources</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {testimonial.resources.map((resource, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleResourceClick(resource)}
                          className={`text-xs ${colors.tagBg} ${colors.tagText} px-2 py-1 rounded-full border ${colors.borderPrimary} transition-colors font-poppins font-medium`}
                        >
                          {resource}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Contact Button */}
                  <button
                    onClick={() => handleContactClick(testimonial.name)}
                    className={`w-full mt-3 ${colors.buttonSecondary} rounded py-1 text-sm font-bold transition-colors duration-300 font-poppins`}
                  >
                    Connect with {testimonial.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Blurred Preview of Additional Cards */}
          {!showAllCards && testimonials.length > cardsPerRow && (
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-30 blur-sm pointer-events-none">
                {testimonials.slice(cardsPerRow, cardsPerRow + 3).map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className={`
                      ${colors.bgCard} rounded-xl ${colors.shadowCard} overflow-hidden border ${colors.borderPrimary}
                      transition-all duration-300
                    `}
                  >
                    {/* Top Section */}
                    <div className={`p-6 ${colors.bgGradient}`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className={`w-14 h-14 rounded-full overflow-hidden border-2 ${colors.borderAccent}`}>
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className={`font-bold text-lg ${colors.textPrimary} font-poppins`}>{testimonial.name}</h3>
                          <div className={`${colors.accent} font-medium text-sm font-poppins`}>
                            {testimonial.position} @ {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Bottom Section - Simplified */}
                    <div className={`p-4 ${colors.bgCardSecondary} border-t ${colors.borderPrimary}`}></div>
                  </div>
                ))}
              </div>
              
              {/* Overlay for Blurred Cards */}
              <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={toggleShowAllCards}
              className={`${colors.buttonSecondary} font-medium px-6 py-2 rounded-lg transition-colors font-poppins`}
            >
              See All Success Stories
              <svg className="w-4 h-4 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
          )}
          
          {/* Show Less Button (when all cards are shown) */}
          {showAllCards && (
            <div className="mt-8 text-center">
              <button 
                onClick={toggleShowAllCards}
                className={`${colors.buttonSecondary} font-medium px-6 py-2 rounded-lg transition-colors font-poppins`}
              >
                Show Less
                <svg className="w-4 h-4 ml-2 inline-block rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {/* Call to Action */}
        {/* <div className="mt-12 text-center">
          <button 
            onClick={() => showToast("Starting your success journey!")}
            className={`${colors.buttonPrimary} font-extrabold px-8 py-4 rounded-lg shadow-lg transition-colors font-poppins`}
          >
            Start Your Success Journey Today
          </button>
        </div> */}
      </div>
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-20">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            onClose={() => closeToast(toast.id)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}