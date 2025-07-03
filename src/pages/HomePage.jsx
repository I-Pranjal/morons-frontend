import React from 'react';
import { HeroSection } from '../components/Homepage/HeroSection';
import { ComparisonSection } from '../components/Homepage/ComparisonSection';
import { AgentPreviewSection } from '../components/Homepage/AgentPreviewSection';
import { IntelligenceSection } from '../components/Homepage/IntelligenceSection';
import { WaitlistSection } from '../components/Homepage/WaitlistSection';
import { FooterSection } from '../components/Homepage/FooterSection';

export const HomePage = () => {
  return (
    <div className="bg-white text-gray-900">
      <HeroSection />
      <ComparisonSection />
      <AgentPreviewSection />
      <IntelligenceSection />
      <WaitlistSection />
      <FooterSection />
    </div>
  );
};