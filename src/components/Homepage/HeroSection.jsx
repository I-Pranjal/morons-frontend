import React from 'react';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';

export const HeroSection = () => {
  return (
    <section className="min-h-screen sm:flex  justify-center bg-white px-6 py-16 md:flex-row md:items-center">
      {/* Left Section */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <img src="/975dc50d-91b9-47e0-b60a-734e8c3f7cf0.png" alt="GeniOS" className="h-10 mb-4 mx-auto md:mx-0" />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          The Operating System <br />
          <span className="text-red-700">of Intelligence</span>
        </h1>
        <p className="text-lg text-gray-600">Install Intelligence. Don't just learn it.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-red-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-800 shadow">
            Join the Beta Waitlist
          </button>
          <button className="border border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 shadow-sm">
            Why Stealth?
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 mt-12 md:mt-0 md:ml-12 max-w-md w-full">
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
              <FaRobot className="text-white text-lg" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800">Mr. Elite</h3>
              <p className="text-xs text-gray-500">Your AI Mentor</p>
            </div>
          </div>

          <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-800 shadow-inner">
            <p>Hi, I've been analyzing ambition lately. Want me to plan yours?</p>
            <p className="text-right text-xs text-gray-500 mt-1">07:16 PM</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500">✨ Quick questions:</p>
            {["What is GeniOS?", "Do I need to be technical?"].map((prompt, idx) => (
              <button
                key={idx}
                className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="Ask Mr. Elite anything..."
              className="flex-1 text-sm outline-none bg-transparent"
            />
            <button className="text-red-600 hover:text-red-700">
              <FaPaperPlane className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};