import { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png'; 
import { toast } from 'react-toastify';
import Neha from '../assets/j.jpg';
import Arjun from '../assets/e.jpg';
import Rohan from '../assets/f.jpg';
import Rajesh from '../assets/g.jpg';
import Ananya from '../assets/k.jpg';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    position: "Software Engineer",
    company: "Google",
    image: Arjun,
    text: "The resume tracking system transformed my job hunt. It highlighted exactly which technical skills needed improvement and provided targeted resources. After 3 months of focused preparation, I cleared Google's interview rounds!",
    exam: "Technical Interview",
    timeToAchieve: "3 months",
    resources: ["LeetCode Premium", "System Design Interview Book", "Mock Interview Platform"]
  },
  {
    id: 2,
    name: "Rohan Agarwal",
    position: "Marketing Specialist",
    company: "Swiggy",
    image: Rohan,
    text: "The goal-tracking feature kept me disciplined throughout my preparation. The realistic timelines and weekly milestone suggestions helped me pace my learning perfectly. I secured my dream marketing role at Swiggy two weeks earlier than my target date!",
    exam: "Marketing Strategy Presentation",
    timeToAchieve: "3.5 months",
    resources: ["Digital Marketing Certification", "Brand Strategy Workshop", "Public Speaking Course"]
  },
  {
    id: 3,
    name: "Rajesh Iyer",
    position: "Data Scientist",
    company: "Amazon",
    image: Rajesh,
    text: "The platform's resume analytics feature was eye-opening. I could see exactly how recruiters were scanning my profile and what caught their attention. After implementing the suggested changes, my interview callback rate jumped by 65%!",
    exam: "Data Science Assessment",
    timeToAchieve: "2.5 months",
    resources: ["Kaggle Competitions", "SQL Practice Platform", "Machine Learning Course"]
  },
  {
    id: 4,
    name: "Neha Reddy",
    position: "UX Designer",
    company: "Flipkart",
    image: Neha,
    text: "I used this platform to prepare for my design portfolio review. The heatmap showing which sections of my resume attracted most attention helped me restructure my portfolio completely. The recruiters were impressed by my focused presentation!",
    exam: "Design Portfolio Review",
    timeToAchieve: "5 months",
    resources: ["UI/UX Workshop", "Portfolio Critique Group", "Design Systems Course"]
  },
  {
    id: 5,
    name: "Ananya Patel",
    position: "Product Manager",
    company: "Microsoft",
    image: Ananya,
    text: "The personalized study plan was exactly what I needed. Tracking my daily progress and following AI-based suggestions helped me address my weak areas systematically. I was well-prepared for my PM interview and received an offer within a week!",
    exam: "Product Case Study",
    timeToAchieve: "4 months",
    resources: ["Product School Resources", "Case Study Framework Guide", "Market Analysis Tools"]
  }
];

export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const handleClick = () => {
    toast.info('Working');
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setActive((current) => (current + 1) % testimonials.length);
          setIsTransitioning(false);
        }, 500); // Match this with CSS transition duration
      }
    }, 5000); // Change testimonial every 5 seconds
    
    return () => clearInterval(interval);
  }, [isTransitioning]);

  
  
  // Manual navigation
  const goToTestimonial = (index) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setActive(index);
        setIsTransitioning(false);
      }, 500);
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
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins text-gray-900">Student Success Stories</h2>
          <div className="h-1 w-72 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-center text-gray-700 mb-8 max-w-3xl mx-auto font-poppins">
            See how our platform has helped students achieve their career goals and crack their target exams
          </p>
        </div>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-gray-100">
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex flex-col md:flex-row p-6">
                {/* Left side - Image and Name */}
                <div className="md:w-1/3 flex flex-col items-center text-center p-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-400 mb-4">
                    <img 
                      src={testimonials[active].image} 
                      alt={testimonials[active].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-xl text-black">{testimonials[active].name}</h3>
                  <p className="text-gray-600 mb-1">{testimonials[active].position}</p>
                  <p className="font-medium text-red-700">{testimonials[active].company}</p>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg w-full">
                    <p className="font-medium text-gray-800">Target Exam:</p>
                    <p className="text-black font-bold">{testimonials[active].exam}</p>
                    <p className="font-medium text-gray-800 mt-2">Achievement Time:</p>
                    <p className="text-black font-bold">{testimonials[active].timeToAchieve}</p>
                  </div>
                </div>
                
                {/* Right side - Testimonial */}
                <div className="md:w-2/3 p-4 flex flex-col justify-between">
                  <div>
                    <div className="text-5xl text-yellow-400 font-extrabold mb-4">"</div>
                    <p className="text-lg text-gray-800 mb-8">{testimonials[active].text}</p>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-bold text-black mb-2">Recommended Resources:</h4>
                    <div className="flex flex-wrap gap-2">
                      {testimonials[active].resources.map((resource, idx) => (
                        <span 
                          key={idx} 
                          className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
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
                className={`w-3 h-3 rounded-full transition-all ${
                  active === idx 
                    ? 'bg-yellow-400 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
          
          {/* Arrow Navigation */}
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -ml-4 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-black hover:bg-yellow-50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => goToTestimonial((active - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 bg-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-black hover:bg-yellow-50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
                className="bg-transparent hover:bg-black text-black hover:text-white border border-black font-medium px-6 py-2 rounded-lg transition-colors font-poppins"
                >
                Start Your Success Journey Today
            </div>
        </div>
      </div>
    </div>
  );
}