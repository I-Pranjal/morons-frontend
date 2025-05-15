import React, { useState } from 'react'
import Navbar from '@/components/Navbar'

import ProfilePanel from '../dashboard Components/profileCard'
import MotivationBox from '../dashboard Components/motivation'
import SkillTracker from '../dashboard Components/skillTracker'
import MockInterviews from '../dashboard Components/mockInterview'
import ResumeAnalyzer from '../dashboard Components/resumeAnalyzer'
import CareerRoadmap from '../dashboard Components/careerRoadmap'

export default function NewDashboard() {
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const toggleVoice = () => setIsVoiceActive(prev => !prev)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-20 bg-white dark:bg-gray-900 shadow-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="pt-24 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* First Row: Profile on Left, Career Roadmap on Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <ProfilePanel className="h-full" />
          </div>
          <div className="md:col-span-2">
            <CareerRoadmap className="h-full" />
          </div>
        </div>

        {/* Continue with older layout in full-width, stacked format */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-10">
          <div className="md:col-span-2">
            <ResumeAnalyzer className="h-full" />
          </div>
          <div className="md:col-span-1">
            <MotivationBox className="h-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-10">
          <div className="md:col-span-1">
            <SkillTracker className="h-full" />
          </div>
          <div className="md:col-span-2">
            <MockInterviews className="h-full" />
          </div>
        </div>
      </main>
    </div>
  )
}