import React, { useState } from 'react'
import { Bell, Mic } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import ProfilePanel from '../dashboard Components/profileCard'
import MotivationBox from '../dashboard Components/motivation'
import SkillTracker from '../dashboard Components/skillTracker'
import MockInterviews from '../dashboard Components/mockInterview'
import ResumeAnalyzer from '../dashboard Components/resumeAnalyzer'
import CareerRoadmap from '../dashboard Components/careerRoadmap'
import Navbar from '../components/Navbar'

function NewDashboard() {
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive)
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <Navbar />
      </header>


      {/* Main Dashboard */}
      <main className="container px-4 py-6 md:px-6 md:py-8 mt-15">
  {/* First Row */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <ProfilePanel />
    <CareerRoadmap className="md:col-span-2" />
    <SkillTracker />
  </div>

  {/* Second Row */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
    <ResumeAnalyzer className="md:col-span-2" />
    <MotivationBox />
    <MockInterviews />
  </div>
</main>

    </div>
  )
}

export default NewDashboard ;
