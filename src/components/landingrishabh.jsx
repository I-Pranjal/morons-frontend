import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import BookingExperience from './BookingExperience';
import SchedulingWorkflow from './SchedulingWorkflow';
import CustomBookingSection from './CustomBookingSection';
import FeatureSection from './FeatureSection';

function LandingRishabh() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-[#121212] text-white' : 'bg-gray-50 text-black'
      }`}
    >
      <Navbar />
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Toggle Dark Mode
      </button>
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <SchedulingWorkflow />
        <CustomBookingSection />
        <BookingExperience />
        <FeatureSection />
      </main>
    </div>
  );
}

export default LandingRishabh;
