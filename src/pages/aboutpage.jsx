import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Award, BookOpen, BarChart2, MessageCircle, Brain, CheckCircle } from 'lucide-react';
import  Navbar  from '../components/Navbar';
import  Footer  from '../components/footer';
import avatar from '../assets/avatar.png';
import dashboad from '../assets/dashboad.jpg';
import AI_mentor from '../assets/AI-mentor.jpg';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = {
    hero: useRef(null),
    what: useRef(null),
    personalized: useRef(null),
    method: useRef(null),
    different: useRef(null),
    mission: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:translate-y-1 border-l-4 border-yellow-400">
      <div className="flex items-start">
        <div className="bg-yellow-50 p-3 rounded-full mr-4">
          <Icon className="text-yellow-500" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );

  const StatCard = ({ number, text }) => (
    <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-xl hover:translate-y-1">
      <h3 className="text-3xl font-extrabold text-yellow-500 mb-2">{number}</h3>
      <p className="text-gray-700">{text}</p>
    </div>
  );

  return (
    <div className="bg-white text-gray-900 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        id="hero" 
        ref={sectionRefs.hero}
        className={`bg-gradient-to-r from-yellow-400 to-yellow-300 pt-30 pb-16 px-4 md:px-8 lg:px-16 transition-opacity duration-1000 ${isVisible.hero ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
              <span className="block">Your Personal</span>
              <span className="block text-5xl md:text-6xl">AI Career Mentor</span>
            </h1>
            <p className="text-xl mb-8 text-gray-800">
              Built exclusively for Gen Z students navigating careers in software engineering, machine learning, and product management.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full flex items-center transition-all">
                Get Started <ChevronRight size={20} className="ml-2" />
              </button>
              <button className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 rounded-full border-2 border-black flex items-center transition-all">
                How It Works
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
                src={AI_mentor}
                alt="AI mentor illustration" 
                className="rounded-lg shadow-xl w-[400px] h-[520px] object-cover" 
            />
            </div>
        </div>
      </section>

      {/* What Mr. Elite Does */}
      <section 
        id="what" 
        ref={sectionRefs.what}
        className={`py-16 px-4 md:px-8 lg:px-16 bg-white transition-all duration-1000 ${isVisible.what ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🔍 What Mr. Elite Does</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're preparing for an interview, confused about your resume, or unsure which skill to focus on, 
              Mr. Elite is here to guide you like a personal coach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard 
              icon={MessageCircle} 
              title="Voice-First Coaching" 
              description="Just talk to Mr. Elite like a friend. Express your goals, doubts, and thoughts freely — and receive smart, empathetic feedback."
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Resume Analysis" 
              description="Upload your resume and Mr. Elite will highlight strengths and gaps, suggest improvements, and track which changes improve callbacks."
            />
            <FeatureCard 
              icon={BarChart2} 
              title="Skill & Progress Tracking" 
              description="Get a personal dashboard that tracks your micro-goals, skill mastery, interview performance, and motivation trends."
            />
            <FeatureCard 
              icon={Brain} 
              title="Emotional Intelligence" 
              description="Mr. Elite detects stress and burnout, adjusts its tone, and provides emotional support and productivity advice."
            />
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🎉 Built for Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our users have reported impressive results after using Mr. Elite as their AI mentor.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard number="65%" text="Increase in interview success rate" />
            <StatCard number="100%" text="Free for students during beta" />
            <StatCard number="24/7" text="Personalized mentorship" />
          </div>
        </div>
      </section>

      {/* Personalized Section */}
      <section 
        id="personalized" 
        ref={sectionRefs.personalized}
        className={`py-16 px-4 md:px-8 lg:px-16 bg-white transition-all duration-1000 ${isVisible.personalized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">🛠️ Personalized for Every Student</h2>
            <p className="text-lg text-gray-600 mb-6">
              Each student is unique — that's why Mr. Elite creates a custom learning and career plan tailored to your specific needs.
            </p>
            <ul className="space-y-4">
              {['Dream job or company', 'Academic background', 'Skill level and interests', 'Daily performance'].map((item, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="text-yellow-500 mr-3" size={20} />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg text-gray-600">
              You're never treated like a statistic — Mr. Elite adapts to you, not the other way around.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src={dashboad}
              alt="Personalized dashboard" 
              className="rounded-lg shadow-xl max-w-full h-auto" 
            />
          </div>
        </div>
      </section>

      {/* The Mr. Elite Method */}
      <section 
        id="method" 
        ref={sectionRefs.method}
        className={`py-16 px-4 md:px-8 lg:px-16 bg-yellow-50 transition-all duration-1000 ${isVisible.method ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🚀 The Mr. Elite Method</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures you make continuous progress toward your career goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Assessment & Planning",
                desc: "Understand your baseline and set meaningful goals"
              },
              {
                step: "02",
                title: "Daily Voice Check-Ins",
                desc: "Break goals into small, achievable actions"
              },
              {
                step: "03",
                title: "Ongoing Optimization",
                desc: "Adapt your strategy based on progress"
              },
              {
                step: "04",
                title: "Achievement & Celebration",
                desc: "Acknowledge milestones and move forward"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md relative border-t-4 border-yellow-400">
                <div className="absolute -top-4 -left-4 bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold shadow-md">
                  {item.step}
                </div>
                <h3 className="font-bold text-xl mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section 
        id="different" 
        ref={sectionRefs.different}
        className={`py-16 px-4 md:px-8 lg:px-16 bg-white transition-all duration-1000 ${isVisible.different ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">💡 Why We're Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mr. Elite offers a radically different approach to career mentorship.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-yellow-400 text-black">
                <tr>
                  <th className="py-4 px-6 text-left font-bold">Traditional Platforms</th>
                  <th className="py-4 px-6 text-left font-bold">Mr. Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  ["One-size-fits-all advice", "Personalized AI mentorship"],
                  ["Text-heavy UX", "Voice-first interactions"],
                  ["Limited feedback loop", "Real-time feedback + weekly reports"],
                  ["No emotional awareness", "Emotional intelligence support"]
                ].map((pair, i) => (
                  <tr key={i}>
                    <td className="py-4 px-6 text-gray-600">{pair[0]}</td>
                    <td className="py-4 px-6 font-medium">{pair[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section 
        id="mission" 
        ref={sectionRefs.mission}
        className={`py-16 px-4 md:px-8 lg:px-16 bg-black text-white transition-all duration-1000 ${isVisible.mission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <Award className="text-yellow-400 mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold mb-6">📣 Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            We are here to make <span className="text-yellow-400 font-bold">career growth accessible, human, and empowering</span> for every student — using the best of AI, mentorship, and emotional intelligence.
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-12">
            We believe <span className="text-yellow-400 font-bold">every student deserves a mentor who listens, cares, and guides them</span>—and that's what Mr. Elite is.
          </p>
          <div className="inline-block bg-yellow-400 text-black font-extrabold py-4 px-10 rounded-full text-lg hover:bg-yellow-300 transition-all cursor-pointer">
            Get Started For Free
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}