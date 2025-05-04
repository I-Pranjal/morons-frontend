import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Mic, 
  BarChart, 
  Award, 
  Briefcase, 
  MessageSquare,
  ChevronRight
} from "lucide-react";

export default function BookingExperience() {
  const milestones = [
    {
      title: "Sign Up & Share Your Goals",
      description: "Upload your resume and tell Mr. Elite your dream role. It learns where you want to go.",
      icon: <FileText size={24} />,
      color: "bg-yellow-100"
    },
    {
      title: "Daily Voice Chats",
      description: "Each morning/evening, talk with Mr. Elite. It helps set tasks or reviews what you did – keeping you accountable day by day.",
      icon: <Mic size={24} />,
      color: "bg-yellow-200"
    },
    {
      title: "Track Your Progress",
      description: "Watch a live dashboard chart your wins and skills over time. Every quiz, mock interview, and completed task adds up.",
      icon: <BarChart size={24} />,
      color: "bg-yellow-100"
    },
    {
      title: "Celebrate Milestones",
      description: "Earn badges and weekly \"Mirror Reports\" (summaries of your gains) to see how far you've come.",
      icon: <Award size={24} />,
      color: "bg-yellow-200"
    },
    {
      title: "Land the Job",
      description: "With a polished resume and steady confidence, you'll be ready to interview and succeed.",
      icon: <Briefcase size={24} />,
      color: "bg-yellow-100"
    },
    {
      title: "Mock Interview Simulations (MVP)",
      description: "Practice answering tech/product questions by voice. Mr. Elite will analyze your answers and feedback on clarity and confidence.",
      icon: <MessageSquare size={24} />,
      color: "bg-yellow-200"
    }
  ];

  return (
    <section className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl my-8 bg-white">
      <div className="container px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center font-poppins">
          Your Journey with Mr. Elite
        </h1>
        
        <div className="relative mt-16">
          {/* Timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block"></div>
          
          {/* Milestones */}
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative">
                <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon */}
                  <div className="hidden md:block md:w-1/2 relative">
                    <div className={`absolute ${index % 2 === 0 ? 'right-0' : 'left-0'} transform translate-x-1/2 -translate-y-1/2 ${milestone.color} p-4 rounded-full z-10`}>
                      {milestone.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <Card className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:mr-6' : 'md:mr-auto md:ml-6'} shadow-md`}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-2">
                        <div className={`md:hidden ${milestone.color} p-2 rounded-full mr-3`}>
                          {milestone.icon}
                        </div>
                        <h3 className="text-xl font-bold font-poppins">{milestone.title}</h3>
                      </div>
                      <p className="text-gray-700 font-poppins">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Footstep illustrations */}
                {index < milestones.length - 1 && (
                  <div className="hidden md:flex justify-center my-2">
                    <ChevronRight className="text-yellow-400" size={20} />
                    <ChevronRight className="text-yellow-400 -ml-1" size={20} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Journey Progress Illustration */}
        <div className="mt-16 relative">
          <div className="h-2 bg-gray-200 rounded-full w-full">
            <div className="h-full bg-yellow-400 rounded-full w-1/4"></div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-center">
              <Badge className="bg-yellow-400 hover:bg-yellow-500">Start</Badge>
            </div>
            <div className="text-center">
              <Badge className="bg-gray-200 hover:bg-gray-300">Success!</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}