import { useState, useEffect } from 'react';
import avater from '../assets/avatar.png'; 

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Priya Shah",
    position: "Software Engineer",
    company: "Google",
    image: avater,
    text: "The resume tracking system helped me organize my job hunt. I could see which skills I needed to improve, and the resources provided were invaluable. I landed my dream job in just 3 months!",
    exam: "Technical Interview",
    timeToAchieve: "3 months",
    resources: ["LeetCode Premium", "System Design Interview Book", "Mock Interview Platform"]
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "Microsoft",
    image: avater,
    text: "The personalized study plan changed everything for me. I could track my progress daily, and the AI suggestions pointed me to exactly what I needed to work on. Passed my PM interview with flying colors!",
    exam: "Product Case Study",
    timeToAchieve: "4 months",
    resources: ["Product School Resources", "Case Study Framework Guide", "Market Analysis Tools"]
  },
  {
    id: 3,
    name: "Layla Johnson",
    position: "Data Scientist",
    company: "Amazon",
    image: avater,
    text: "The platform's analytics on my resume reading patterns helped me understand what recruiters look for. The suggested improvements increased my callback rate by 70%!",
    exam: "Data Science Assessment",
    timeToAchieve: "2.5 months",
    resources: ["Kaggle Competitions", "SQL Practice Platform", "Machine Learning Course"]
  },
  {
    id: 4,
    name: "James Wilson",
    position: "UX Designer",
    company: "Apple",
    image: avater,
    text: "I used the resume test website to prepare for my portfolio review. The system tracked which parts of my resume attracted the most attention and helped me refine my presentation!",
    exam: "Design Portfolio Review",
    timeToAchieve: "5 months",
    resources: ["UI/UX Workshop", "Portfolio Critique Group", "Design Systems Course"]
  },
  {
    id: 5,
    name: "Sophia Rodriguez",
    position: "Marketing Specialist",
    company: "Netflix",
    image: avater,
    text: "The goal tracking feature kept me accountable throughout my job search. The suggested timelines were realistic, and I achieved my dream marketing position ahead of schedule!",
    exam: "Marketing Strategy Presentation",
    timeToAchieve: "3.5 months",
    resources: ["Digital Marketing Certification", "Brand Strategy Workshop", "Public Speaking Course"]
  },
  {
    id: 6,
    name: "Alex Thompson",
    position: "Frontend Developer",
    company: "Airbnb",
    image: avater,
    text: "The resume test website helped me identify gaps in my skills. The weekly progress reports and suggested timelines kept me focused. I landed a role at my dream company in just 10 weeks!",
    exam: "Frontend Coding Challenge",
    timeToAchieve: "2.5 months",
    resources: ["JavaScript Masterclass", "React Advanced Patterns", "UI Components Library"]
  },
  {
    id: 7,
    name: "Emma Davis",
    position: "HR Manager",
    company: "LinkedIn",
    image: avater,
    text: "As someone who reviews resumes professionally, I was skeptical. But the platform's insights were spot-on! The system helped me improve my own resume and land a senior HR position.",
    exam: "HR Certification",
    timeToAchieve: "6 months",
    resources: ["HR Analytics Course", "Talent Management Certification", "HR Leadership Workshop"]
  },
  {
    id: 8,
    name: "Raj Patel",
    position: "Financial Analyst",
    company: "Morgan Stanley",
    image: avater,
    text: "The resume tracking and feedback loops gave me clear action items each week. The timeline feature helped me pace my preparation perfectly for the rigorous interview process.",
    exam: "Financial Modeling Assessment",
    timeToAchieve: "4 months",
    resources: ["Financial Modeling Course", "Excel Advanced Functions", "Valuation Techniques Workshop"]
  },
  {
    id: 9,
    name: "Nina Kim",
    position: "Content Strategist",
    company: "Spotify",
    image: avater,
    text: "The platform gave me insight into how recruiters scan creative resumes. I could see which parts of my portfolio were getting attention and which needed improvement.",
    exam: "Content Strategy Presentation",
    timeToAchieve: "3 months",
    resources: ["Storytelling Workshop", "Content Analytics Course", "Brand Voice Development"]
  }
];

// Toast Component
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in flex items-center">
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
  
  return (
    <div className="w-full bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-black mb-3">Wall of Love</h2>
          <div className="h-1 w-24 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See why our users love our platform and how it helped them achieve their career goals
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`
                bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100
                transition-all duration-300 hover:shadow-xl
                ${expandedId === testimonial.id ? 'scale-105 z-10' : ''}
              `}
            >
              {/* Top Section - Always visible */}
              <div className="p-6 bg-gradient-to-r from-yellow-50 to-white">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-yellow-400">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg text-black">{testimonial.name}</h3>
                    <button 
                      onClick={() => handleCompanyClick(testimonial.company)}
                      className="text-red-700 hover:text-red-800 font-medium text-sm transition-colors"
                    >
                      {testimonial.position} @ {testimonial.company}
                    </button>
                    
                    <div className="flex items-center mt-1 text-yellow-500">
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
                      p-2 rounded-full hover:bg-gray-100 transition-colors
                      ${savedTestimonials.includes(testimonial.id) ? 'text-red-600' : 'text-gray-400'}
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
                  <div className="text-4xl text-yellow-400 font-extrabold absolute top-0 left-0">"</div>
                  <p className="text-gray-800 pl-6 pr-2">
                    {expandedId === testimonial.id 
                      ? testimonial.text 
                      : `${testimonial.text.substring(0, 100)}${testimonial.text.length > 100 ? '...' : ''}`
                    }
                  </p>
                  <div className="text-4xl text-yellow-400 font-extrabold absolute bottom-0 right-0">"</div>
                </div>
                
                {/* Expand/Collapse Button */}
                {testimonial.text.length > 100 && (
                  <button
                    onClick={() => setExpandedId(expandedId === testimonial.id ? null : testimonial.id)}
                    className="mt-2 text-yellow-600 hover:text-yellow-700 font-medium flex items-center text-sm"
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
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between mb-3">
                  <div>
                    <span className="text-xs text-gray-500">Target Exam</span>
                    <p className="font-bold text-black">{testimonial.exam}</p>
                  </div>
                  <button 
                    onClick={() => handleTimelineClick(testimonial.timeToAchieve)}
                    className="flex items-center text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-1 rounded transition-colors"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {testimonial.timeToAchieve}
                  </button>
                </div>
                
                {/* Resources */}
                <div>
                  <span className="text-xs text-gray-500">Recommended Resources</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {testimonial.resources.map((resource, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleResourceClick(resource)}
                        className="text-xs bg-white hover:bg-gray-100 text-gray-800 px-2 py-1 rounded-full border border-gray-200 transition-colors"
                      >
                        {resource}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Contact Button */}
                <button
                  onClick={() => handleContactClick(testimonial.name)}
                  className="w-full mt-3 bg-transparent hover:bg-black text-black hover:text-white border border-black rounded py-1 text-sm font-bold transition-colors duration-300"
                >
                  Connect with {testimonial.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => showToast("Starting your success journey!")}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-8 py-4 rounded-lg shadow-lg transition-colors"
          >
            Start Your Success Journey Today
          </button>
        </div>
      </div>
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-20">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            onClose={() => closeToast(toast.id)} 
          />
        ))}
      </div>
    </div>
  );
}