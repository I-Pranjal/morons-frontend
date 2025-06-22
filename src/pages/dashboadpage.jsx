"use client"
import React from 'react';
import LearningCards from "../components/Dashboard/LearningCards ";
import Navbar from "../components/Navbar";
import ProfilePanel from "../dashboard Components/profileCard";
import DashboardStats from "../components/Dashboard/dashboardstats";
import CalendarNotesSection from "../components/Dashboard/calendarSection";

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
        
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Profile Section */}
          <section className="lg:col-span-2">
            <ProfilePanel />
          </section>
          
          {/* Progress Overview Section */}
          <section className="lg:col-span-2">
            <h2
              className="text-2xl font-bold text-amber-300 mb-6"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Progress Overview
            </h2>
            <DashboardStats />
          </section>
          
          {/* Calendar & Tasks Section */}
          <section className="lg:col-span-1">
            <CalendarNotesSection />
          </section>
        </div>
      </main>
      
      {/* Footer spacing */}
      <footer className="h-8" />
    </div>
  );
}