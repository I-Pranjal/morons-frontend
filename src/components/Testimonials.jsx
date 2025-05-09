import { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png'; 
import { toast } from 'react-toastify';
import Priya from '../assets/a.jpg';
import Michael from '../assets/b.jpg';
import Layla from '../assets/c.jpg';
import James from '../assets/d.jpg';
import Sophia from '../assets/e.jpg';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Priya Shah",
    position: "Software Engineer",
    company: "Google",
    image: Priya,
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
    image: Michael,
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
    image: Layla,
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
    image: James,
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
    image: Sophia,
    text: "The goal tracking feature kept me accountable throughout my job search. The suggested timelines were realistic, and I achieved my dream marketing position ahead of schedule!",
    exam: "Marketing Strategy Presentation",
    timeToAchieve: "3.5 months",
    resources: ["Digital Marketing Certification", "Brand Strategy Workshop", "Public Speaking Course"]
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
    
  
  return (
    <div className="w-full bg-gray-50 py-16 px-4 overflow-hidden border-2 border-dashed border-gray-300 rounded-xl my-8">
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