import { useState } from 'react';
import { Mic, PlayCircle, Brain, Zap, Bot, Sparkles, Moon } from 'lucide-react';
import GoogleSignInButton from './GoogleSignInbutton';
import SignInWithLinkedIn from './signInWithLinkedIn';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

// Decorative border component
const BorderLine = ({ position }) => {
  return (
    <div className={`absolute ${position} w-full overflow-hidden`}>
      <div className="w-full border-t border-dashed border-gray-300"></div>
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 w-4 h-4 bg-white border border-gray-300 rounded-full transform -translate-y-1/2"
          style={{ left: `${i * 5}%` }}
        ></div>
      ))}
    </div>
  );
};

// Audio wave animation component with futuristic style
const AudioWaves = () => {
  return (
    <div className="flex items-end h-16 gap-1">
      {[...Array(12)].map((_, i) => {
        // Generate random heights for the audio bars between 20% and 100%
        const height = 20 + Math.random() * 80;
        return (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-full animate-pulse"
            style={{
              height: `${height}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${0.7 + Math.random() * 0.5}s`
            }}
          ></div>
        );
      })}
    </div>
  );
};

// Futuristic circuit line component
const CircuitLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-0 w-16 h-px bg-yellow-500"></div>
      <div className="absolute top-1/4 left-16 w-px h-16 bg-yellow-500"></div>
      <div className="absolute top-2/4 right-8 w-24 h-px bg-yellow-400"></div>
      <div className="absolute bottom-1/3 right-32 w-px h-12 bg-yellow-400"></div>
      <div className="absolute bottom-1/3 right-32 w-16 h-px bg-yellow-500"></div>

      {/* Glowing dots */}
      <div className="absolute top-1/4 left-0 w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
      <div className="absolute top-2/4 right-8 w-2 h-2 rounded-full bg-yellow-500 animate-pulse"
        style={{ animationDelay: "0.5s" }}></div>
      <div className="absolute bottom-1/3 right-32 w-2 h-2 rounded-full bg-yellow-400 animate-pulse"
        style={{ animationDelay: "1s" }}></div>
    </div>
  );
};

// Custom crescent shape component with enhanced stroke
const CrescentShape = () => {
  return (
    <div className="relative w-28 h-28"> {/* Increased size from 24 to 28 */}
      {/* Base circle with gradient and stroke */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full shadow-lg shadow-yellow-900/20 border-4 border-yellow-400"></div>

      {/* Overlapping circle to create crescent effect */}
      <div className="absolute -right-4 top-0 w-24 h-28 bg-white rounded-full"></div>

      {/* Additional inner stroke for emphasis */}
      <div className="absolute inset-2 border-2 border-yellow-600 rounded-full opacity-70 clip-hidden"></div>

      {/* Brain icon centered in the circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Brain className="text-black w-10 h-10" />
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <div id='hero' className="relative bg-gradient-to-br from-gray-50 to-white py-16">
      {/* Top decorative border */}
      <BorderLine position="top-0" />

      {/* Bottom decorative border */}
      <BorderLine position="bottom-0" />

      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 mx-auto max-w-6xl my-8 relative">
        {/* Decorative corner dots */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-yellow-600 -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-yellow-600 translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-yellow-600 -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-yellow-600 translate-x-1 translate-y-1"></div>

        {/* Left and right decorative borders */}
        <div className="absolute left-0 top-6 bottom-6 w-0 border-l border-dashed border-gray-300"></div>
        <div className="absolute right-0 top-6 bottom-6 w-0 border-r border-dashed border-gray-300"></div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Left hero content - REDUCED WIDTH */}
          <div className="flex-1 space-y-6 pb-4 w-full lg:w-3/5">
            <div className="inline-block px-3 py-1 bg-yellow-500 rounded-full text-xs font-medium text-black">
              For Gen Z students (18–27) stressed about software/ML/product careers →
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-black">
                Turn Your Voice <br />
                into Confidence
              </h1>

              <p className="text-gray-700 text-base font-medium">
                Mr Mentor is a voice-first AI mentor who <span className="text-yellow-600">listens</span> and <span className="text-yellow-600">guides</span>.
                <strong> Speak</strong> your ambitions and concerns – Mr Mentor understands and responds with personalized guidance.
              </p>

              <p className="text-gray-600 text-base">
                Simply speak naturally about interviews, projects, or career challenges. Mr Mentor delivers real-time
                insights, tracks your growth, and adjusts its approach based on your needs – whether you need
                motivation, strategy, or honest feedback.
              </p>
            </div>

            <div className="space-y-6">
              {/* Sign-in options with improved design */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center sm:justify-start">
                {/* LinkedIn button */}
                <div className="w-full sm:w-auto max-w-xs">
                  <SignInWithLinkedIn className="shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 bg-white text-black font-medium rounded-lg hover:border-yellow-600" />
                </div>

                {/* Google Sign-In button */}
                <div className="w-full sm:w-auto max-w-xs">
                  <GoogleSignInButton className="shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 bg-white text-black font-medium rounded-lg hover:border-yellow-600" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                {/* Primary CTA button (with Link) */}
                <Link to="/jarvis" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-yellow-500 text-black font-bold py-3 px-8 border-2 border-black rounded-lg flex items-center justify-center hover:bg-yellow-400 shadow-md hover:shadow-lg transition-all duration-200">
                    <Mic className="mr-2 h-4 w-4" />
                    Start Speaking
                  </button>
                </Link>

                {/* Learn How It Works button */}

                <a href="https://tally.so/r/n0lXYZ">
                  <button
                    className="w-full sm:w-auto bg-white text-black font-bold py-3 px-8 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Early Beta Users
                  </button>
                </a>
              </div>

              <div className="text-xs text-gray-500 mt-1 text-center sm:text-left">No typing needed – just use your voice</div>
            </div>
          </div>

          {/* Right futuristic illustration section - WIDENED FURTHER */}
          <div className="w-full lg:w-2/5 max-w-[500px] mx-auto"> {/* Increased from 400px to 500px */}
            <div className="relative overflow-hidden">
              {/* Futuristic AI mentor visualization */}
              <div className="bg-white rounded-lg p-6 relative overflow-hidden shadow-xl border border-gray-200">
                <CircuitLines />

                {/* Modern AI visualization */}
                <div className="flex justify-center mb-6 relative">
                  <div className="relative flex flex-col items-center">
                    {/* AI crescent visualization */}
                    <div className="mb-4">
                      <CrescentShape />
                    </div>

                    {/* Energy connection lines */}
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1 w-48 rounded-full mb-4"></div> {/* Widened from w-40 to w-48 */}

                    {/* Feature icons */}
                    <div className="flex gap-8"> {/* Increased gap from 5 to 8 */}
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shadow-md border border-gray-200">
                        <Zap className="text-yellow-600 w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shadow-md border border-gray-200">
                        <Bot className="text-yellow-600 w-6 h-6" />
                      </div>
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center shadow-md border border-gray-200">
                        <Mic className="text-yellow-600 w-6 h-6" />
                      </div>
                    </div>

                    {/* Glowing effect */}
                    <div className="absolute -inset-1 bg-yellow-500/10 rounded-full blur-xl"></div>
                  </div>
                </div>

                {/* Audio waves */}
                <div className="flex justify-center mb-4">
                  <AudioWaves />
                </div>

                {/* AI Assistant label */}
                <div className="bg-yellow-500 text-black rounded-lg p-3 text-center shadow-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <div className="font-bold text-sm">ELITE AI MENTOR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;