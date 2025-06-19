import React, { useState } from 'react';
import Navbar from '../Navbar';
import Hero from '../Hero';
import BookingExperience from '../BookingExperience';
import SchedulingWorkflow from '../SchedulingWorkflow';
import CustomBookingSection from '../CustomBookingSection';
import FeatureSection from '../FeatureSection';
// import Footer from './footer';

function LandingRishabh() {
  return (
    <div className="w-100vw">
      <Navbar />
      <main className="w-100vw">
        <Hero />
        {/* <SchedulingWorkflow />
         <CustomBookingSection />
         <BookingExperience />
         <FeatureSection /> */}
        {/* <Footer/> */}
      </main>
    </div>
  );
}

export default LandingRishabh;