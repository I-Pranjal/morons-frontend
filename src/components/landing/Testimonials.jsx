import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Neha from '../../assets/a.jpg';
import Mera from '../../assets/h.jpg';

// Sample testimonial data with placeholder images
const testimonials = [
  {
  id: 1,
  name: "Meera Bansal",
  designation: "Senior Technical Mentor",
  position: "Technical Mentor",
  company: "PrepHub AI",
  src: Mera ,
  quote: "Arjun had potential but needed clear direction. Through resume tracking and targeted feedback, I watched him refine his technical focus and build confidence. His Google offer was no surprise—it was well-earned.",
  exam: "Google Technical Interview",
  timeToAchieve: "3 months",
  resources: ["LeetCode Premium", "System Design Interview Book"]
},
{
  id: 2,
  name: "Siddharth Menon",
  designation: "Career Strategy Mentor",
  position: "Marketing Coach",
  company: "GrowthMentor Lab",
  src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=400&fit=crop&crop=face",
  quote: "Rohan was ambitious but lacked pacing. I introduced him to weekly goal check-ins and timeline discipline. It worked—he landed his Swiggy role even before his deadline. That’s what smart focus looks like.",
  exam: "Marketing Strategy Presentation",
  timeToAchieve: "3.5 months",
  resources: ["Digital Marketing Certification", "Brand Strategy Workshop"]
},
{
  id: 3,
  name: "Anjali Desai",
  designation: "Data Science Mentor",
  position: "Mentor",
  company: "InsightPro",
  src: Neha,
  quote: "Rajesh’s skills were strong, but his resume didn’t reflect them. I helped him use our analytics tool to restructure key sections. After that, his interview rate soared, and Amazon recognized his true value.",
  exam: "Data Science Assessment",
  timeToAchieve: "2.5 months",
  resources: ["Kaggle Competitions", "SQL Practice Platform"]
},
{
  id: 4,
  name: "Vikram Kohli",
  designation: "UX Portfolio Mentor",
  position: "Design Mentor",
  company: "UXMentor Studio",
  src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
  quote: "Neha’s design work was great, but her portfolio lacked storytelling. We used AI-based heatmaps to identify weak spots. Once she restructured it, her Flipkart interviewers were genuinely impressed.",
  exam: "Design Portfolio Review",
  timeToAchieve: "5 months",
  resources: ["UI/UX Workshop", "Portfolio Critique Group"]
},
{
  id: 5,
  name: "Priya Nambiar",
  designation: "Product Management Mentor",
  position: "PM Coach",
  company: "PMLeap",
  src: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop&crop=face",
  quote: "Ananya was sharp, but needed structure. I guided her with our AI-based study planner and milestone tracking. Her consistency paid off—she got the Microsoft PM role within a week of interviewing.",
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
         Mentor Reflections on Growth
        </h1>
        <div className="w-24 h-0 bg-yellow-400 mx-auto mb-6"></div>
        <p className="text-xl text-white-700 max-w-4xl mx-auto px-8">
          Guiding students to crack their goals and build careers they once dreamed of.
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
                  duration: 0.6,
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
                          duration: 0.4,
                          ease: "easeInOut",
                          delay: 0.08 * index,
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
            <div className="flex items-center gap-6 mt-8">
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
              </div>

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
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="mt-8 text-center">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
            Start Your Success Journey Today
          </button>
        </div> */}
      </div>
    </div>
  );
}