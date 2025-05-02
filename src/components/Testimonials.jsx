import { useEffect, useRef, useState } from 'react';
import avatar from '../assets/avatar.png'; 
import { toast } from 'react-toastify';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Priya Shah",
    position: "Software Engineer",
    company: "Google",
    image: avatar,
    text: "The resume tracking system helped me organize my job hunt. I could see which skills I needed to improve, and the resources provided were invaluable. I landed my dream job in just 3 months!",
    exam: "Technical Interview",
    timeToAchieve: "3 months",
    resources: ["LeetCode Premium", "System Design Interview Book", "Mock Interview Platform"],
    fullStory: "When I started my job search, I felt overwhelmed by the different requirements and feedback. The resume tracking system was a game-changer. It helped me organize feedback from each application and identify patterns. I could see I needed to improve my system design skills specifically. Using the recommended resources, I dedicated 2 hours daily to study and practice. After improving my resume based on the analytics, my callback rate increased by 50%. The personalized study plan was crucial in helping me prioritize which technical topics to focus on. After 3 months of consistent preparation, I not only passed the technical interviews but received multiple offers!"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    company: "Microsoft",
    image: avatar,
    text: "The personalized study plan changed everything for me. I could track my progress daily, and the AI suggestions pointed me to exactly what I needed to work on. Passed my PM interview with flying colors!",
    exam: "Product Case Study",
    timeToAchieve: "4 months",
    resources: ["Product School Resources", "Case Study Framework Guide", "Market Analysis Tools"],
    fullStory: "After three failed PM interviews, I knew I needed a structured approach. The platform analyzed my previous interview feedback and created a personalized study plan focusing on product strategy and market analysis. The daily tracking feature kept me accountable, and I could visualize my progress over time. The AI suggested specific case studies based on my weaker areas, which was incredibly helpful. I dedicated weekends to mock interviews using the platform's templates. The resume analytics showed me exactly where recruiters were focusing, allowing me to emphasize my quantitative achievements. After 4 months of dedicated preparation, I not only passed the Microsoft interview but felt confident throughout the entire process. I've recommended this platform to my entire network!"
  },
  {
    id: 3,
    name: "Layla Johnson",
    position: "Data Scientist",
    company: "Amazon",
    image: avatar,
    text: "The platform's analytics on my resume reading patterns helped me understand what recruiters look for. The suggested improvements increased my callback rate by 70%!",
    exam: "Data Science Assessment",
    timeToAchieve: "2.5 months",
    resources: ["Kaggle Competitions", "SQL Practice Platform", "Machine Learning Course"],
    fullStory: "Despite having a strong academic background, I struggled to get past the resume screening stage. The platform's heat map analysis of my resume was eye-opening - recruiters were spending less than 10 seconds on my skills section! After restructuring my resume based on the platform's suggestions and highlighting my practical experience with quantifiable results, my callback rate increased dramatically. For the technical assessment preparation, the customized practice problems helped me focus on Amazon's specific data science requirements. The platform suggested I participate in relevant Kaggle competitions to build a portfolio I could reference in interviews. In just 2.5 months, I went from getting rejected to receiving an offer from Amazon's data science team. The structured approach and specific feedback made all the difference."
  },
  {
    id: 4,
    name: "James Wilson",
    position: "UX Designer",
    company: "Apple",
    image: avatar,
    text: "I used the resume test website to prepare for my portfolio review. The system tracked which parts of my resume attracted the most attention and helped me refine my presentation!",
    exam: "Design Portfolio Review",
    timeToAchieve: "5 months",
    resources: ["UI/UX Workshop", "Portfolio Critique Group", "Design Systems Course"],
    fullStory: "Transitioning from graphic design to UX was challenging. The platform helped me identify exactly what UX recruiters were looking for in portfolios. The analytics showed which projects received the most attention and for how long. This guided me to expand certain case studies and completely rework others. The resource recommendations were spot-on - especially the Design Systems Course which helped me speak the language Apple uses internally. I created a study schedule focusing on one aspect of UX each week - research, wireframing, prototyping, etc. The mock portfolio reviews provided by the platform were invaluable, with detailed feedback that mirrored what I later received in actual interviews. After 5 months of refinement, my portfolio not only helped me land the job at Apple but has continued to serve as a template for my ongoing work documentation."
  },
  {
    id: 5,
    name: "Sophia Rodriguez",
    position: "Marketing Specialist",
    company: "Netflix",
    image: avatar,
    text: "The goal tracking feature kept me accountable throughout my job search. The suggested timelines were realistic, and I achieved my dream marketing position ahead of schedule!",
    exam: "Marketing Strategy Presentation",
    timeToAchieve: "3.5 months",
    resources: ["Digital Marketing Certification", "Brand Strategy Workshop", "Public Speaking Course"],
    fullStory: "As someone coming from a traditional marketing background, I needed to prove my digital capabilities to land a role at Netflix. The platform analyzed my resume and identified specific gaps in my experience. The goal-setting feature helped me break down my preparation into weekly milestones - from completing certifications to creating mock campaigns. The accountability reminders and progress tracking kept me motivated even when I faced rejections. The presentation templates and storytelling frameworks completely transformed how I communicated my marketing ideas. Following the platform's suggestion, I enrolled in a public speaking course which dramatically improved my presentation skills. The interview simulation feature prepared me for Netflix's unique culture questions. What I expected would take 6 months of preparation I accomplished in just 3.5 months. The personalized roadmap made all the difference in helping me transition to streaming media marketing."
  }
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Handle color scheme changes
  useEffect(() => {
    // Check system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    // Listen for changes
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleClick = () => {
    toast.info('Working');
  };

  // Auto-advance testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActive((current) => (current + 1) % testimonials.length);
          setIsTransitioning(false);
          // Reset full story view on testimonial change
          setShowFullStory(false);
        }, 500); // Match this with CSS transition duration
      }
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(interval);
  }, [isTransitioning, isPaused]);

  // Manual navigation
  const goToTestimonial = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActive(index);
        setIsTransitioning(false);
        // Reset full story view on testimonial change
        setShowFullStory(false);
      }, 500);
    }
  };
  
  // Toggle full story
  const toggleFullStory = () => {
    setShowFullStory(!showFullStory);
    setIsPaused(!isPaused);
  };

  // Get color classes based on mode
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
        highlight: 'bg-amber-500',
        highlightHover: 'hover:bg-amber-600',
        buttonText: 'text-white',
        infoBox: 'bg-gray-800',
        infoBorder: 'border-gray-700',
        tagBg: 'bg-yellow-100',
        tagText: 'text-yellow-800',
        dot: 'bg-gray-600',
        activeDot: 'bg-yellow-400',
        navButton: 'bg-gray-800 hover:bg-gray-700',
        navIcon: 'text-gray-300',
        divider: 'border-gray-700'
      };
    } else {
      return {
        background: 'bg-white',
        text: 'text-gray-800',
        subtext: 'text-gray-700',
        card: 'bg-white border-gray-100',
        highlight: 'bg-yellow-300',
        highlightHover: 'hover:bg-yellow-500',
        buttonText: 'text-black',
        infoBox: 'bg-gray-50',
        infoBorder: 'border-gray-200',
        tagBg: 'bg-yellow-100',
        tagText: 'text-yellow-800',
        dot: 'bg-gray-300',
        activeDot: 'bg-yellow-400',
        navButton: 'bg-white hover:bg-yellow-50',
        navIcon: 'text-black',
        divider: 'border-gray-200'
      };
    }
  };
  
  const colors = getColorClasses();
  
  // Toggle dark mode manually
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
<<<<<<< HEAD
    <div className={`w-full ${colors.bgPrimary} py-16 px-4 overflow-hidden transition-colors duration-300`}>
=======
    <div className="w-full bg-gray-50 py-16 px-4 overflow-hidden border-2 border-dashed border-gray-300 rounded-xl my-8">
>>>>>>> pr-6
      <div className="max-w-6xl mx-auto">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-800'} transition-colors`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-extrabold ${colors.textPrimary} mb-3`}>Student Success Stories</h2>
          <div className={`h-1 w-24 ${colors.divider} mx-auto mb-6`}></div>
          <p className={`text-lg ${colors.textSecondary} max-w-2xl mx-auto font-poppins`}>
            See how our platform has helped students achieve their career goals and crack their target exams
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          <div className={`relative overflow-hidden rounded-xl shadow-lg ${colors.bgCard} border transition-colors duration-300`}>
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex flex-col md:flex-row p-6">
                {/* Left side - Image and Name */}
                <div className={`md:w-1/3 flex flex-col items-center text-center p-4 border-b md:border-b-0 md:border-r ${colors.divider}`}>
                  <div className={`w-24 h-24 rounded-full overflow-hidden border-4 ${colors.borderAccent} mb-4`}>
                    <img 
                      src={testimonials[active].image} 
                      alt={testimonials[active].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className={`font-bold text-xl ${colors.textPrimary}`}>{testimonials[active].name}</h3>
                  <p className={`${colors.accent} mb-1`}>{testimonials[active].position}</p>
                  <p className="font-medium text-red-700 dark:text-red-400">{testimonials[active].company}</p>
                  
                  <div className={`mt-4 p-3 ${colors.infoBox} rounded-lg w-full`}>
                    <p className={`font-medium ${colors.textSecondary}`}>Target Exam:</p>
                    <p className={`${colors.textPrimary} font-bold`}>{testimonials[active].exam}</p>
                    <p className={`font-medium ${colors.textSecondary} mt-2`}>Achievement Time:</p>
                    <p className={`${colors.textPrimary} font-bold`}>{testimonials[active].timeToAchieve}</p>
                  </div>
                </div>
                
                {/* Right side - Testimonial */}
                <div className="md:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className={`text-5xl ${colors.highlight} font-extrabold mb-4`}>"</div>
                    <p className={`text-lg ${colors.textPrimary} mb-4`}>
                      {showFullStory ? testimonials[active].fullStory : testimonials[active].text}
                    </p>
                    <button
                      onClick={toggleFullStory}
                      className={`text-sm font-medium ${colors.highlight} ${colors.buttonText} px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${isDarkMode ? 'indigo' : 'yellow'}-400`}
                    >
                      {showFullStory ? "Show Less" : "See Full Story"}
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className={`font-bold ${colors.textPrimary} mb-2`}>Recommended Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {testimonials[active].resources.map((resource, idx) => (
                        <span 
                          key={idx} 
                          className={`${colors.tagBg} ${colors.tagText} px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToTestimonial(idx)}
                className={`h-3 rounded-full transition-all ${
                  active === idx 
                    ? `${colors.activeDot} w-6` 
                    : `${colors.dot} hover:bg-gray-400 dark:hover:bg-gray-500 w-3`
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow Navigation */}
          <button 
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 -ml-4 ${colors.navButton} w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${colors.navIcon} transition-colors focus:outline-none focus:ring-2 focus:ring-${isDarkMode ? 'indigo' : 'yellow'}-400`}
            onClick={() => goToTestimonial((active - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 ${colors.navButton} w-10 h-10 rounded-full shadow-lg flex items-center justify-center ${colors.navIcon} transition-colors focus:outline-none focus:ring-2 focus:ring-${isDarkMode ? 'indigo' : 'yellow'}-400`}
            onClick={() => goToTestimonial((active + 1) % testimonials.length)}
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div
            onClick={handleClick}
            className={`inline-block cursor-pointer ${colors.highlight} ${colors.highlightHover} transition-colors ${colors.buttonPrimary} font-extrabold px-8 py-4 rounded-lg shadow-lg`}
          >
            Start Your Success Journey Today
          </div>
        </div>
      </div>
    </div>
  );
}