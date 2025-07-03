import React from 'react';

export const IntelligenceSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-800 to-gray-900 text-white py-16 px-6 text-center">
      <h2 className="text-4xl font-bold mb-4">Install Intelligence. <br/><span className="text-yellow-400">Accelerate Everything.</span></h2>
      <p className="text-gray-300 mb-10 max-w-3xl mx-auto">
        GeniOS Intelligence continuously learns, adapts, and optimizes your career path.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {["Adaptive Learning", "Precision Targeting", "Predictive Analytics", "Real-time Optimization"].map(feature => (
          <div key={feature} className="bg-white/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold">{feature}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};