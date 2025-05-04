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
              className="bg-gray-900 border-2 border-yellow-400 transition-all duration-300 hover:shadow-xl hover:border-yellow-500 overflow-hidden transform hover:scale-105"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center h-full relative">
                <div className={`${hoveredIndex === index ? 'blur-sm opacity-20' : ''} transition-all duration-500 flex flex-col items-center z-0`}>
                  <div className="bg-yellow-100 rounded-full p-4 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 font-poppins text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-poppins">
                    {feature.description}
                  </p>
                </div>
                {hoveredIndex === index && (
                  <div className="absolute inset-0 flex items-center justify-center p-6 z-10 bg-yellow-500 border-4 border-yellow-300 transition-all duration-500">
                    <p className="text-sm font-bold font-poppins text-black">
                      {feature.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}