import React, { useState } from 'react';
import { Sparkles, Target, Bot, ArrowRight, Zap } from 'lucide-react';

function Overview({ suggestions }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* Left Section - AI Project Generator */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 text-red-600 p-3 rounded-xl">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI-Powered Project Ideas</h2>
              <p className="text-gray-600">Describe your interests and get personalized project suggestions</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your interests, goals, or target role
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                placeholder="E.g., AI/ML projects for data science roles, sustainable tech solutions, fintech applications, mobile apps for social impact..."
              />
              <div className="text-xs text-gray-500 mt-2 text-right">
                {prompt.length}/500 characters
              </div>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-200 ${
                prompt.trim() && !isGenerating
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25 hover:shadow-xl'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Project Ideas
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 text-left hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Role-Specific Ideas</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Get projects tailored to your target job role</p>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <button className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 text-left hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Trending Projects</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">Discover what's popular in tech right now</p>
            <div className="flex items-center text-purple-600 font-medium text-sm group-hover:gap-2 transition-all">
              <span>Explore Trends</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Right Section - Smart Suggestions */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 text-yellow-600 p-3 rounded-xl">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Smart Recommendations</h2>
            <p className="text-gray-600">AI-powered suggestions to improve your project portfolio</p>
          </div>
        </div>

        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-6 hover:border-gray-300 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        suggestion.level === 'high'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {suggestion.level.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{suggestion.description}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    {suggestion.button}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
