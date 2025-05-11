import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Mic, 
  BarChart, 
  Award, 
  Briefcase, 
  MessageSquare,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

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

export default function BookingExperience() {
  const [activeStep, setActiveStep] = useState(0);
  
  const milestones = [
    {
      title: "Sign Up & Share Your Goals",
      description: "Upload your resume and tell Mr. Elite your dream role. It learns where you want to go.",
      icon: <FileText size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-400"
    },
    {
      title: "Daily Voice Chats",
      description: "Each morning/evening, talk with Mr. Elite. It helps set tasks or reviews what you did – keeping you accountable day by day.",
      icon: <Mic size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-400"
    },
    {
      title: "Track Your Progress",
      description: "Watch a live dashboard chart your wins and skills over time. Every quiz, mock interview, and completed task adds up.",
      icon: <BarChart size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-400"
    },
    {
      title: "Celebrate Milestones",
      description: "Earn badges and weekly \"Mirror Reports\" (summaries of your gains) to see how far you've come.",
      icon: <Award size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-400"
    },
    {
      title: "Mock Interview Simulations",
      description: "Practice answering tech/product questions by voice. Mr. Elite will analyze your answers and feedback on clarity and confidence.",
      icon: <MessageSquare size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-400"
    },
    {
      title: "Land the Job",
      description: "With a polished resume and steady confidence, you'll be ready to interview and succeed.",
      icon: <Briefcase size={24} className="text-yellow-600" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-400"
    }
  ];

  return (
    <section id="booking-experience" className="w-full py-8 rounded-xl my-8 relative">
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
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 px-3 py-1 text-sm">YOUR JOURNEY</Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 font-poppins">
            Your Path to Success with <span className="text-yellow-600">Mr. Elite</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow this proven roadmap to transform your career and achieve your professional goals
          </p>
        </div>
        
        {/* Desktop Timeline */}
        <div className="hidden lg:block relative mt-20 mb-16">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-yellow-200 transform -translate-y-1/2 rounded-full"></div>
          
          {/* Timeline Points */}
          <div className="flex justify-between relative">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="relative z-10"
                onMouseEnter={() => setActiveStep(index)}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border-4 ${
                    index <= activeStep ? "bg-yellow-500 border-yellow-600" : "bg-white border-yellow-300"
                  }`}
                >
                  {index < activeStep ? (
                    <CheckCircle className="text-white" size={24} />
                  ) : (
                    <span className="font-bold text-lg">{index + 1}</span>
                  )}
                </div>
                <div className={`mt-4 text-center transition-all duration-300 ${
                  index === activeStep ? "opacity-100 scale-110" : "opacity-60 scale-100"
                }`}>
                  <p className="font-semibold text-xs md:text-sm">{milestone.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Current Step Detail */}
        <div className="max-w-3xl mx-auto mt-8">
          <Card className={`shadow-xl overflow-hidden transition-all duration-500 border-l-4 ${milestones[activeStep].borderColor}`}>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className={`p-6 md:p-8 md:w-1/4 flex items-center justify-center ${milestones[activeStep].color}`}>
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                    {milestones[activeStep].icon}
                  </div>
                </div>
                <div className="p-6 md:p-8 md:w-3/4">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 font-poppins">
                    {activeStep + 1}. {milestones[activeStep].title}
                  </h3>
                  <p className="text-gray-700 text-lg">{milestones[activeStep].description}</p>
                  
                  <div className="mt-6 flex space-x-2">
                    <button 
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors font-medium text-sm"
                      onClick={() => setActiveStep(Math.min(activeStep + 1, milestones.length - 1))}
                    >
                      Next Step
                    </button>
                    {activeStep > 0 && (
                      <button 
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm"
                        onClick={() => setActiveStep(Math.max(activeStep - 1, 0))}
                      >
                        Previous
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Mobile Steps List */}
        <div className="lg:hidden mt-12 space-y-4">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                index === activeStep ? "bg-yellow-50 border-2 border-yellow-300" : "bg-white border border-gray-100"
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mr-4 ${
                index <= activeStep ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {index < activeStep ? (
                  <CheckCircle size={18} />
                ) : (
                  <span className="font-bold">{index + 1}</span>
                )}
              </div>
              <div>
                <h4 className={`font-semibold ${index === activeStep ? "text-yellow-700" : "text-gray-700"}`}>
                  {milestone.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
        
        {/* Journey Progress */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-gray-600 font-medium">Your progress</span>
            <span className="text-sm font-bold text-yellow-600">
              Step {activeStep + 1} of {milestones.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
            <div 
              className="h-full bg-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / milestones.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-center">
              <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-none">Start</Badge>
            </div>
            <div className="text-center">
              <Badge className={`${activeStep === milestones.length - 1 ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700"} hover:bg-yellow-600 border-none`}>Success!</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}