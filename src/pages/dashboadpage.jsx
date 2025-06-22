"use client"
import React from 'react';
import LearningCards from "../components/Dashboard/LearningCards ";
import Navbar from "../components/Navbar";
import ProfilePanel from "../dashboard Components/profileCard";
import DashboardStats from "../components/Dashboard/dashboardstats";
import CalendarNotesSection from "../components/Dashboard/calendarSection";
import DashboardProfileCard from '../components/Dashboard/ProfileCard';
import AssessmentReport from '../components/Dashboard/AssessmentReport';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Learning Cards Section */}
        <section>
          <LearningCards />
        </section>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Profile Section - Narrower & Taller */}
          <section className="lg:col-span-2">
            <div className="h-full">
              <DashboardProfileCard />
            </div>
          </section>
          
          {/* Center Content Area */}
          <section className="lg:col-span-3">
            <div className="space-y-6">
              {/* Progress Overview */}
              <div>
                <h2
                  className="text-2xl font-bold text-amber-300 mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Progress Overview
                </h2>
                <DashboardStats />
              </div>
              
              {/* Assessment Report - Below Progress Overview */}
              <div className="bg-neutral-800/30 rounded-xl p-6">
                <h2 
                  className="text-2xl font-bold text-amber-300 mb-6"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Recent Assessments
                </h2>
                <AssessmentReport />
              </div>
            </div>
          </section>
          
          {/* Calendar & Tasks Section */}
          {/* <section className="lg:col-span-1">
            <CalendarNotesSection />
          </section> */}
        </div>
      </main>
      
      {/* Footer spacing */}
      <footer className="h-8" />
    </div>
  );
}