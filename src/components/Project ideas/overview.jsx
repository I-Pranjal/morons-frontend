import React, { useState } from 'react';
import { Sparkles, Target, Bot } from 'lucide-react';


function Overview({activeTab, suggestions}) {
  return (
     <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-red-400 h-5 w-5" />
            <h2 className="text-lg font-semibold">AI-Powered Project Ideas</h2>
          </div>
          <p className="text-sm text-gray-600 mb-2">Describe Your Interests, Goals, or Target Role</p>
          <textarea
            className="w-full h-24 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300"
            placeholder="E.g., AI/ML, sustainability, fintech, mobile apps, web3, social impact..."
          ></textarea>
          <button className="mt-4 bg-red-800 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generate Project Ideas
          </button>
        </div>

        {/* Right Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-red-400 h-5 w-5" />
            <h2 className="text-lg font-semibold">Smart Nudges by Mr. Elite</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">AI-powered suggestions to improve your project portfolio</p>

          <div className="flex flex-col gap-4">
            {suggestions.map((sug, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gray-100 p-2">
                    {sug.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800">{sug.title}</h3>
                  <span
                    className={`text-xs font-semibold ml-auto px-2 py-0.5 rounded-full ${
                      sug.level === 'high'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {sug.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{sug.description}</p>
                <button className="bg-red-800 text-white text-sm font-medium px-4 py-1.5 rounded-md w-max">
                  {sug.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default Overview
