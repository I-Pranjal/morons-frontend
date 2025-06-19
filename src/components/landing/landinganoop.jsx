import React, { useRef } from 'react'
import Testimonials from '../Testimonials'
import WallofLove from '../walloflove'
import Footer from '../footer';
import { toast } from 'react-toastify';
import {  Users, Settings, Code, Trophy,  } from 'lucide-react';
import AITutorScrollingCards from '../../components/landing/card';

 
 
function LandingAnoop() {
  return (
   
    <div className="min-h-screen bg-gray-900">
    <main className="container mx-auto px-4 py-8">
       {/* Why Choose The Moronss Section */}
      <div className="py-20 pt-0 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose The Moronss?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              We're not just another learning platform. We're your career transformation partner, 
              providing personalized AI mentorship that adapts to your unique journey.
            </p>
          </div>

          {/* cards  */}
           
          {/* <div className="grid grid-row-4 gap-8">
            AI-Powered Learning
            <div className="group p-8 rounded-2xl bg-gray-700/40 hover:bg-gray-700/60 transition-all duration-300 border border-gray-600/50 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Settings className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI-Powered Learning</h3>
              <p className="text-gray-300 leading-relaxed">
                Personalized curriculum generated specifically for your level and interests
              </p>
            </div>

            Hands-on Labs
            <div className="group p-8 rounded-2xl bg-gray-700/40 hover:bg-gray-700/60 transition-all duration-300 border border-gray-600/50 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Hands-on Labs</h3>
              <p className="text-gray-300 leading-relaxed">
                12 practical modules per lab with real coding challenges and projects
              </p>
            </div>

            Industry Recognition
            <div className="group p-8 rounded-2xl bg-gray-700/40 hover:bg-gray-700/60 transition-all duration-300 border border-gray-600/50 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Industry Recognition</h3>
              <p className="text-gray-300 leading-relaxed">
                Build a portfolio that recruiters actually want to see
              </p>
            </div>

            Career Guidance
            <div className="group p-8 rounded-2xl bg-gray-700/40 hover:bg-gray-700/60 transition-all duration-300 border border-gray-600/50 hover:border-yellow-500/30 hover:shadow-2xl hover:shadow-yellow-500/10">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Career Guidance</h3>
              <p className="text-gray-300 leading-relaxed">
                From internships to placements, we've got your career journey covered
              </p>
            </div>
          </div> */}
          <AITutorScrollingCards/>
        </div>
      </div>

      <Footer/>
    </main>
    </div>
  )
}

export default LandingAnoop ; 
