"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, Github, MessageCircle, Calendar, Edit } from "lucide-react";

export default function DashboardProfileCard() {
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Python", "MongoDB"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-300 to-yellow-500 p-4">
      <Card className="w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-lg relative bg-neutral-950 border border-slate-700">
        {/* Header Gradient + Availability Badge */}
        <div className="relative h-32 bg-amber-400 rounded-t-2xl">
          <Badge className="absolute top-3 right-3 bg-green-500/20 text-black border border-green-400/40 px-3 py-1 rounded-full text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Available
            </div>
          </Badge>
        </div>

        {/* Profile Image */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
          <div className="w-40 h-40 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
            <img
              src="/profile-image.jpg" // Ensure the correct path to the image
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <CardContent className="pt-32 text-center text-white px-6">
          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-4">
            {[Mail, Linkedin, Github, MessageCircle].map((Icon, idx) => (
              <Button
                key={idx}
                size="icon"
                variant="ghost"
                className="w-10 h-10 border border-slate-600 bg-slate-800 hover:bg-slate-700 rounded-full"
              >
                <Icon className="w-5 h-5 text-white" />
              </Button>
            ))}
          </div>

          {/* User Info */}
          <h1 className="text-xl font-bold">Pranjal Mishra</h1>
          <p className="text-sm text-slate-300">Full Stack Developer</p>
          <p className="text-xs text-slate-400 mt-1">pranjalnitjsr@gmail.com</p>

          {/* Skills */}
          <div className="mt-6 text-left">
            <h3 className="text-sm text-orange-400 font-semibold mb-2">Top Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="bg-slate-800 border border-slate-600 text-slate-200 text-xs px-3 py-1 rounded-full"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <Button className="mt-6 w-full bg-amber-200 hover:bg-amber-300 text-black font-semibold rounded-full">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>

          {/* Footer Quote + Join Info */}
          <div className="mt-4 text-center space-y-1">
            <p className="text-sm italic text-orange-300">
              "Building the future, one line of code at a time"
            </p>
            <div className="flex items-center justify-center text-xs text-slate-500">
              <Calendar className="w-3 h-3 mr-1" />
              Joined March 2019
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
