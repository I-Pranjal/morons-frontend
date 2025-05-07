import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, LogIn, UserPlus, ArrowRight, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HashLink } from "react-router-hash-link";

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

export default function CustomBookingSection() {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <section className="w-full py-8 rounded-xl my-8 relative">
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
      
      <div className="container px-4 md:px-6">
        <Card className="overflow-hidden bg-black border-0 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Section - Text Content */}
              <div className="text-white">
                <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium mb-4 px-3 py-1">
                  <Sparkles className="w-4 h-4 mr-1" />
                  New Feature
                </Badge>
                
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-poppins text-white leading-tight">
                  Ready to Find <span className="text-yellow-400">Your Voice</span>?
                </h2>
                
                <Separator className="my-6 bg-gray-800" />
                
                <p className="text-gray-300 mb-6 font-poppins text-lg">
                  Getting started is easy. Just <span className="font-semibold text-white">sign up</span> or <span className="font-semibold text-white">log in</span> and 
                  say <span className="italic text-yellow-400">"Hello"</span> to Mr. Elite. From there, it'll
                  guide you step-by-step.
                </p>
                
                <Alert className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 mb-6">
                  <AlertDescription className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <span className="font-medium">Psst — it's free for students right now!</span>
                  </AlertDescription>
                </Alert>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <HashLink smooth to="#booking-experience">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6 group">
                    Get Started – It's Free
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                  </HashLink>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" className="flex items-center gap-2 border-gray-700 text-black hover:bg-gray-800 hover:text-yellow-400">
                      <LogIn className="w-5 h-5" />
                      Log In
                    </Button>
                    
                    <HashLink smooth to="#hero">
                    <Button variant="outline" size="lg" className="flex items-center gap-2 border-gray-700 text-black hover:bg-gray-800 hover:text-yellow-400">
                      <UserPlus className="w-5 h-5" />
                      Sign Up
                    </Button>
                    </HashLink>
                  </div>
                </div>
              </div>
              
              {/* Right Section - Circular Gradients */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Circular Gradients of Yellow */}
                  <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
                    {/* Outermost ring - lightest yellow */}
                    <div className="w-64 h-64 rounded-full border-4 border-yellow-100/30 flex items-center justify-center">
                      {/* Second ring */}
                      <div className="w-52 h-52 rounded-full border-4 border-yellow-200/40 flex items-center justify-center">
                        {/* Third ring */}
                        <div className="w-40 h-40 rounded-full border-4 border-yellow-300/50 flex items-center justify-center">
                          {/* Fourth ring */}
                          <div className="w-28 h-28 rounded-full border-4 border-yellow-400/60 flex items-center justify-center">
                            {/* Innermost circle - darkest yellow */}
                            <div className="w-16 h-16 rounded-full bg-yellow-500/70 flex items-center justify-center">
                              <Mic className="w-8 h-8 text-black" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Microphone Button */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            className="mt-8 mx-auto"
                            onMouseEnter={() => setIsHovering(true)} 
                            onMouseLeave={() => setIsHovering(false)}
                          >
                            <Button 
                              size="lg" 
                              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black rounded-full h-16"
                            >
                              <Mic className="w-8 h-8 mr-2 bg-white" />
                              <span className="text-lg font-medium text-white">Speak Now</span>
                            </Button>
                            
                            {/* Sound Waves Animation */}
                            {isHovering && (
                              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
                                <div className="w-1 h-4 bg-yellow-200 animate-pulse rounded-full"></div>
                                <div className="w-1 h-8 bg-yellow-300 animate-pulse rounded-full"></div>
                                <div className="w-1 h-12 bg-yellow-400 animate-pulse rounded-full"></div>
                                <div className="w-1 h-8 bg-yellow-300 animate-pulse rounded-full"></div>
                                <div className="w-1 h-4 bg-yellow-200 animate-pulse rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black border border-yellow-500 text-yellow-400">
                          <p>Use your voice for a quick setup</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}