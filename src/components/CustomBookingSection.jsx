import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Info } from "lucide-react";
import { useState } from "react";

export default function CustomBookingSection() {
  const [personalized, setPersonalized] = useState("keith");

  const handleRedirectToAnalyzer = () => {
    window.open("https://resume-anlysis-1.onrender.com", "_blank");
  };

  return (
    <section className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl my-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Section - Intelligent scheduling */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">
              Smart scheduling that respects your time
            </h2>
            <p className="text-gray-600 mb-8 font-poppins">
              Whether you're mentoring or being mentored, you deserve focus time. Set limits, auto-manage your availability, and give yourself space between sessions—our AI handles the rest.
            </p>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-6 text-gray-500 font-poppins">Auto buffers & smart alerts</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 font-poppins">Minimum Notice Period</label>
                  <Select defaultValue="3hours">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white">
                      <SelectItem value="1hour">1 hour</SelectItem>
                      <SelectItem value="2hours">2 hours</SelectItem>
                      <SelectItem value="3hours">3 hours</SelectItem>
                      <SelectItem value="6hours">6 hours</SelectItem>
                      <SelectItem value="12hours">12 hours</SelectItem>
                      <SelectItem value="24hours">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 font-poppins">Buffer before session</label>
                    <Select defaultValue="30mins">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="15mins">15 mins</SelectItem>
                        <SelectItem value="30mins">30 mins</SelectItem>
                        <SelectItem value="45mins">45 mins</SelectItem>
                        <SelectItem value="60mins">60 mins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 font-poppins">Buffer after session</label>
                    <Select defaultValue="30mins">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 text-white">
                        <SelectItem value="15mins">15 mins</SelectItem>
                        <SelectItem value="30mins">30 mins</SelectItem>
                        <SelectItem value="45mins">45 mins</SelectItem>
                        <SelectItem value="60mins">60 mins</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Personalized booking link */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">
              Your personal AI Resume Analyzer
            </h2>
            <p className="text-gray-600 mb-8 font-poppins">
              A custom made Resume Analyzer which parses and analyzes your resume based on your described job.
            </p>

            <div className="mt-8">
              <div 
                className="bg-gray-50 p-3 rounded-lg mb-6 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={handleRedirectToAnalyzer}
              >
                <p className="text-lg font-medium font-poppins text-blue-600 underline">elite.ai/resumeanalyzer</p>
              </div>

              <Card className="border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarFallback>JV</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold font-poppins">Jon Vogue</h3>
                      <h4 className="text-2xl font-bold mt-1 font-poppins">Career Coaching</h4>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mt-3 font-poppins">
                    <Info className="w-4 h-4 mr-2" />
                    <span>AI-powered guidance, real human support — helping you grow with confidence.</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}