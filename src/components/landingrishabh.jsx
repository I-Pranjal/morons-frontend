import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import BookingExperience from './BookingExperience';
import SchedulingWorkflow from './SchedulingWorkflow';
import CustomBookingSection from './CustomBookingSection';
import FeatureSection from './FeatureSection';

function LandingRishabh() {

  return (
    <div>
      <Navbar />
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
