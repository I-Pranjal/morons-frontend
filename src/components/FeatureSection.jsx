import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic,
  FileText,
  MessageCircle,
  CheckSquare,
  FileSpreadsheet,
  Brain,
  UserCheck,
  Building
} from "lucide-react";

export default function FeatureSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: <Mic className="w-8 h-8 text-yellow-500" />,
      title: "Voice-First Chat",
      description: "No typing required. Speak naturally (like to a friend) and get instant advice."
    },
    {
      icon: <FileText className="w-8 h-8 text-yellow-500" />,
      title: "Resume & Goal Analysis",
      description: "Upload your CV and goals. Mr. Elite pinpoints where you shine and what needs work."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-yellow-500" />,
      title: "Daily Mentor Moments",
      description: "Get personalized check-ins and pep-talks based on your mood and progress."
    },
    {
      icon: <CheckSquare className="w-8 h-8 text-yellow-500" />,
      title: "Task & Goal Tracking",
      description: "Create micro-goals and watch your dashboard animate with progress graphs."
    },
    {
      icon: <FileSpreadsheet className="w-8 h-8 text-yellow-500" />,
      title: "Mirror Reports (Weekly)",
      description: "Receive weekly PDF summaries of achievements, skills gained, and next steps."
    },
    {
      icon: <Brain className="w-8 h-8 text-yellow-500" />,
      title: "Emotional Intelligence",
      description: "Mr. Elite senses your tone and adjusts its style – coaching, tutoring or brainstorming."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-yellow-500" />,
      title: "Mock Interview Simulations",
      description: "Practice answering tech/product questions by voice with real-time feedback."
    },
    {
      icon: <Building className="w-8 h-8 text-yellow-500" />,
      title: "Enterprise Hiring (Future)",
      description: "Soon, Mr. Elite's insights will power smarter, humane hiring tools for recruiters."
    }
  ];

  return (
    <section className="w-full py-12 bg-yellow-50 rounded-xl my-8 border-2 border-dashed border-gray-300">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 font-poppins text-gray-900">
          AI Superpowers
        </h2>
        <p className="text-xl text-center text-gray-700 mb-8 max-w-3xl mx-auto font-poppins">
          Mr. Elite comes packed with everything you need to turn career anxiety into confidence
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-900 border border-yellow-400 shadow-md transition-all duration-300 hover:shadow-2xl overflow-hidden group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center h-full relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                
                <div className="transition-all duration-300 flex flex-col items-center z-0">
                  <div className="bg-yellow-100 rounded-full p-4 mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-poppins text-white group-hover:text-yellow-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-poppins group-hover:text-white transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
                
                <div className="absolute -bottom-full left-0 right-0 bg-gradient-to-t from-yellow-500/20 to-transparent h-16 group-hover:bottom-0 transition-all duration-500"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}