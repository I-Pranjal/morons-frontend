import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Neha from '../../assets/a.jpg';

// Sample testimonial data with placeholder images
const testimonials = [
  {
    id: 1,
    name: "Arjun Sharma",
    designation: "Software Engineer at Google",
    position: "Software Engineer",
    company: "Google",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    quote: "The resume tracking system transformed my job hunt. It highlighted exactly which technical skills needed improvement and provided targeted resources. After 3 months of focused preparation, I cleared Google's interview rounds!",
    exam: "Technical Interview",
    timeToAchieve: "3 months",
    resources: ["LeetCode Premium", "System Design Interview Book"]
  },
  {
    id: 2,
    name: "Rohan Agarwal", 
    designation: "Marketing Specialist at Swiggy",
    position: "Marketing Specialist",
    company: "Swiggy",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    quote: "The goal-tracking feature kept me disciplined throughout my preparation. The realistic timelines and weekly milestone suggestions helped me pace my learning perfectly. I secured my dream marketing role at Swiggy two weeks earlier than my target date!",
    exam: "Marketing Strategy Presentation",
    timeToAchieve: "3.5 months",
    resources: ["Digital Marketing Certification", "Brand Strategy Workshop"]
  },
  {
    id: 3,
    name: "Rajesh Iyer",
    designation: "Data Scientist at Amazon",
    position: "Data Scientist",
    company: "Amazon", 
    src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
    quote: "The platform's resume analytics feature was eye-opening. I could see exactly how recruiters were scanning my profile and what caught their attention. After implementing the suggested changes, my interview callback rate jumped by 65%!",
    exam: "Data Science Assessment",
    timeToAchieve: "2.5 months",
    resources: ["Kaggle Competitions", "SQL Practice Platform"]
  },
  {
    id: 4,
    name: "Neha Reddy",
    designation: "UX Designer at Flipkart",
    position: "UX Designer",
    company: "Flipkart",
    src: Neha,
    quote: "I used this platform to prepare for my design portfolio review. The heatmap showing which sections of my resume attracted most attention helped me restructure my portfolio completely. The recruiters were impressed by my focused presentation!",
    exam: "Design Portfolio Review",
    timeToAchieve: "5 months",
    resources: ["UI/UX Workshop", "Portfolio Critique Group"]
  },
  {
    id: 5,
    name: "Ananya Patel",
    designation: "Product Manager at Microsoft",
    position: "Product Manager", 
    company: "Microsoft",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    quote: "The personalized study plan was exactly what I needed. Tracking my daily progress and following AI-based suggestions helped me address my weak areas systematically. I was well-prepared for my PM interview and received an offer within a week!",
    exam: "Product Case Study",
    timeToAchieve: "4 months",
    resources: ["Product School Resources", "Case Study Framework Guide"]
  }
];

export default function AnimatedTestimonials() {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="w-full py-8 bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h1 className="text-6xl md:text-5xl font-bold text-white-900 mb-4">
          Student Success Stories
        </h1>
        <div className="w-24 h-0 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-white-700 max-w-4xl mx-auto px-8">
          See how our platform has helped students achieve their career goals and crack their target exams
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-8 pt-8">
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left side - Animated Images */}
          <div className="flex justify-center pt-16">
            <div className="relative h-80 w-80">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      z: -100,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      z: isActive(index) ? 0 : -100,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index)
                        ? 40
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      z: 100,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={320}
                      height={320}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center shadow-2xl"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className="space-y-6"
              >
                {/* Name and Position */}
                <div>
                  <h3 className="text-3xl font-bold text-white-900">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-lg text-white-600 mt-1">
                    {testimonials[active].designation}
                  </p>
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Target Exam</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{testimonials[active].exam}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Achievement Time</p>
                    <p className="text-lg font-bold text-yellow-600 mt-1">{testimonials[active].timeToAchieve}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <div className="text-3xl text-yellow-400 font-bold absolute -top-2 -left-1">"</div>
                  <motion.p className="text-lg text-white-700 leading-relaxed pl-8">
                    {testimonials[active].quote.split(" ").map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-bold text-white-900 mb-3">Recommended Resources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {testimonials[active].resources.map((resource, idx) => (
                      <span 
                        key={idx} 
                        className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium border border-yellow-200"
                      >
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {/* <div className="flex items-center gap-6 mt-8">
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-yellow-600 transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600 group-hover:text-yellow-600 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div> */}

              {/* Dots indicator */}
              {/* <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActive(idx)}
                    className={`transition-all duration-200 ${
                      active === idx 
                        ? 'w-8 h-3 bg-yellow-400 rounded-full' 
                        : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div> */}
            {/* </div> */}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            Start Your Success Journey Today
          </button>
        </div>
      </div>
    </div>
  );
}