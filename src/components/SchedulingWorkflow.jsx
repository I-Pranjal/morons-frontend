import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "../components/ui/Button";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  Mic, 
  Brain, 
  Heart, 
  BarChart2, 
  Calendar, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  XCircle,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function SchedulingWorkflow() {
  const [progress, setProgress] = useState(65);
  
  return (
    <section className="relative bg-gradient-to-br from-yellow-50 to-white py-16 ">
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
        
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 font-poppins px-4 py-1">
            Professional Career Guidance
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins tracking-tight text-gray-900">
            Transform Your Career Journey
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-poppins leading-relaxed">
            Mr. Elite provides personalized mentorship, strategic planning, and accountability 
            for software engineers, ML specialists, and product managers seeking career advancement.
          </p>
        </div>

        {/* Before/After Comparison - with border */}
        <div className="border-t border-b border-gray-300 py-16 mb-16">
          <Tabs defaultValue="after" className="mb-4">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-yellow-50 border border-yellow-200">
                <TabsTrigger value="before" className="font-poppins">Traditional Approach</TabsTrigger>
                <TabsTrigger value="after" className="font-poppins">Mr. Elite Approach</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="before">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader className="pb-4 border-b border-gray-100">
                  <CardTitle className="text-xl font-poppins text-center flex items-center justify-center gap-2">
                    <XCircle size={20} className="text-red-500" />
                    Without Mr. Elite
                  </CardTitle>
                  <CardDescription className="text-center font-poppins">
                    The traditional job search experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">❌</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Unstructured Approach</h4>
                          <p className="text-sm text-gray-400 font-poppins">Juggling preparation and academics with no clear guidance or framework</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">❌</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Wasted Effort</h4>
                          <p className="text-sm text-gray-400 font-poppins">Hours spent on resumes and applications with no professional feedback</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">❌</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Persistent Uncertainty</h4>
                          <p className="text-sm text-gray-400 font-poppins">Constant anxiety about whether your efforts are sufficient or properly directed</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-red-500">❌</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Comparison Trap</h4>
                          <p className="text-sm text-gray-400 font-poppins">Experiencing FOMO and decreased motivation when peers succeed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="after">
              <Card className="border-yellow-200 shadow-md bg-yellow-50/30">
                <CardHeader className="pb-4 border-b border-yellow-100">
                  <CardTitle className="text-xl font-poppins text-center flex items-center justify-center gap-2">
                    <CheckCircle2 size={20} className="text-green-600" />
                    With Mr. Elite
                  </CardTitle>
                  <CardDescription className="text-center font-poppins">
                    The structured, mentored approach to career advancement
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-green-600">✅</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">24/7 Voice-First Mentorship</h4>
                          <p className="text-sm text-gray-400 font-poppins">Access your AI mentor anytime for guidance, feedback, and encouragement</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-green-600">✅</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Instant Professional Feedback</h4>
                          <p className="text-sm text-gray-400 font-poppins">Receive immediate assessment on resumes, interview responses, and career decisions</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-green-600">✅</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Emotional Intelligence Support</h4>
                          <p className="text-sm text-gray-400 font-poppins">Receive context-aware support that prevents burnout and maintains motivation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 text-green-600">✅</div>
                        <div>
                          <h4 className="font-medium font-poppins text-white">Strategic Career Roadmap</h4>
                          <p className="text-sm text-gray-400 font-poppins">Follow a clear, personalized plan with measurable milestones to reach your goals</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-yellow-100 flex justify-center">
                  <div className="w-full max-w-md">
                    <p className="text-sm text-center mb-2 font-poppins text-yellow-800">Success Rate Improvement</p>
                    <Progress value={progress} className="h-2 bg-yellow-100" />
                    <p className="text-xs text-right mt-1 font-poppins text-gray-500">65% increased interview success</p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Feature Cards - with border */}
        <div className="border-b border-gray-300 pb-16 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 font-poppins">Professional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Mic className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg font-poppins">Voice-Enabled Check-Ins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 font-poppins">
                  Natural voice interactions for daily mood assessment and goal setting in a conversational format.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg font-poppins">AI-Powered Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 font-poppins">
                  Advanced resume reviews, skill gap analysis, and personalized improvement recommendations.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg font-poppins">Metric-Based Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 font-poppins">
                  Visualize progress with interactive charts, achievement timelines, and performance analytics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-yellow-700" />
                </div>
                <CardTitle className="text-lg font-poppins">Adaptive Support System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 font-poppins">
                  Context-aware emotional intelligence that provides the right support when you need it most.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Timeline - with border */}
        <div className="border-b border-gray-300 pb-16 mb-16">
          <h3 className="text-2xl font-bold text-center mb-10 font-poppins">Mr. Elite Methodology</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-300 transform -translate-x-1/2"></div>
            
            <div className="space-y-16">
              {/* Step 1 - Left side */}
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-16 mb-6 lg:mb-0 flex lg:justify-end">
                  <Card className="border-gray-300 shadow-sm max-w-md w-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-poppins flex items-center gap-2">
                        <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</span>
                        Assessment & Planning
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 font-poppins">
                        Begin with a comprehensive evaluation of your current skills, career goals, and timeline.
                        Mr. Elite creates a customized roadmap based on your unique situation.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="z-10 w-14 h-14 bg-yellow-400 rounded-full shadow-md flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="lg:w-1/2 lg:pl-16"></div>
              </div>
              
              {/* Step 2 - Right side */}
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-16 hidden lg:block"></div>
                <div className="z-10 w-14 h-14 bg-yellow-400 rounded-full shadow-md flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="lg:w-1/2 lg:pl-16">
                  <Card className="border-gray-300 shadow-sm max-w-md w-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-poppins flex items-center gap-2">
                        <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</span>
                        Daily Implementation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 font-poppins">
                        Engage in daily voice check-ins to report progress and receive adaptive guidance.
                        Break long-term goals into manageable daily actions with clear priority levels.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Step 3 - Left side */}
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-16 mb-6 lg:mb-0 flex lg:justify-end">
                  <Card className="border-gray-300 shadow-sm max-w-md w-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-poppins flex items-center gap-2">
                        <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</span>
                        Ongoing Optimization
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 font-poppins">
                        Receive continuous feedback and strategy refinement as you progress.
                        Mr. Elite adapts to changing circumstances and provides real-time encouragement 
                        during challenging periods.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="z-10 w-14 h-14 bg-yellow-400 rounded-full shadow-md flex items-center justify-center">
                  <BarChart2 className="w-6 h-6 text-white" />
                </div>
                <div className="lg:w-1/2 lg:pl-16"></div>
              </div>
              
              {/* Step 4 - Right side */}
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-16 hidden lg:block"></div>
                <div className="z-10 w-14 h-14 bg-yellow-400 rounded-full shadow-md flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="lg:w-1/2 lg:pl-16">
                  <Card className="border-gray-300 shadow-sm max-w-md w-full">
                    <CardHeader>
                      <CardTitle className="text-lg font-poppins flex items-center gap-2">
                        <span className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</span>
                        Achievement & Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-400 font-poppins">
                        Celebrate milestones with achievement recognition and detailed progress reports.
                        Develop a sustainable growth mindset for continued career advancement.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial and CTA */}
        <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-yellow-100 mb-10">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-3/5">
                <blockquote className="relative">
                  <div className="text-yellow-500 text-4xl absolute -top-6 -left-2">"</div>
                  <p className="text-lg italic text-yellow-900 mb-4 font-poppins pl-6">
                    Mr. Elite transformed my approach to job searching. The structured guidance and emotional 
                    support were exactly what I needed to land my dream position at a top tech company.
                  </p>
                  <footer className="pl-6">
                    <p className="font-semibold text-white font-poppins">Michael Chen</p>
                    <p className="text-sm text-gray-400 font-poppins">Senior Software Engineer, acquired by Fortune 100 company</p>
                  </footer>
                  <div className="text-yellow-500 text-4xl absolute -bottom-10 right-0">"</div>
                </blockquote>
              </div>
              <div className="md:w-2/5 flex justify-center">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm border border-yellow-200">
                  <h4 className="font-bold text-xl mb-4 font-poppins text-black text-center">Begin Your Journey</h4>
                  <p className="text-sm text-gray-400 mb-6 font-poppins text-center">
                    Take the first step toward career transformation with personalized AI mentorship.
                  </p>
                  <Link to="/booking">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-poppins py-3 rounded-md flex items-center justify-center gap-2">
                    Meet Mr. Elite Today
                    <ArrowRight size={16} />
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}