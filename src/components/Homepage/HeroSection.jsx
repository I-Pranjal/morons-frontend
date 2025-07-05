import React, { useState } from 'react';
import { Send, Sparkles, Brain } from 'lucide-react';


export default function HeroSection() {
  const [message, setMessage] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background bg-gray-50 overflow-hidden">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-16">

        <div className="max-w-2xl">
          {/* Logo */}
          <div className="absolute top-8 left-8 flex items-center space-x-4 z-20">
            <img
              src="/975dc50d-91b9-47e0-b60a-734e8c3f7cf0.png"
              alt="GeniOS"
              className="h-16 md:h-20 object-contain"
            />
          </div>

          {/* <div className="absolute top-8 right-8 z-20">
            <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          Welcome, {profile?.name || 'User'}
        </div>
        <button variant="outline" size="sm" onClick={signOut}>
          <User className="w-4 h-4 mr-1" />
          Sign Out
        </button>
      </div>
          </div> */}


          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            The Operating<br />
            System<br />
            <span className="text-red-700">of Intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-12">
            Install Intelligence. Don't just learn it.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button className="bg-red-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors flex items-center gap-2">
              <span>🚀</span>
              Access System
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Why Stealth?
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Chat Interface */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                {/* Outer neural ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-40 animate-pulse"></div>
                <div className="absolute inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-400 to-cyan-400 animate-spin" style={{ animationDuration: '12s' }}></div>

                {/* Inner neural container */}
                <div className="absolute inset-2 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-emerald-400/20">
                  <Brain className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-cyan-400 animate-bounce" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">Mr. Elite</h3>
                <p className="text-sm text-gray-500">Your AI Mentor</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Intelligence Online</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Chat Message */}
            <div className="mb-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
                <div className="absolute -left-2 top-3 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <Brain className="w-2 h-2 text-white" />
                </div>
                <p className="text-gray-800 text-sm mb-2">
                  Hi, I've been analyzing ambition lately. Want me to plan yours?
                </p>
                <p className="text-xs text-gray-500 text-right">11:17 PM</p>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Quick questions:</span>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-400/20">
                  What is GeniOS?
                </button>
                <button className="w-full text-left px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-400/20">
                  Do I need to be technical?
                </button>
              </div>
            </div>

            {/* Input Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Ask Mr. Elite anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/90 backdrop-blur-sm"
              />
              {message && (
                <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              )}
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-emerald-400/80 rounded-full flex items-center justify-center hover:from-emerald-400/90 hover:to-emerald-400/70 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-400/20">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}