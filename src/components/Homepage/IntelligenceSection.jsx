import React from 'react';
import { Brain, Zap, Target, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

export const IntelligenceSection = () => {
  const intelligenceFeatures = [
    {
      icon: Brain,
      title: "Adaptive Learning",
      description: "System learns from your behavior patterns and optimizes guidance",
      color: "from-purple-500/10 to-purple-600/5"
    },
    {
      icon: Target,
      title: "Precision Targeting",
      description: "AI identifies exact skills and experiences needed for your goals",
      color: "from-blue-500/10 to-blue-600/5"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forecasts your career trajectory and success probability",
      color: "from-green-500/10 to-green-600/5"
    },
    {
      icon: Zap,
      title: "Real-time Optimization",
      description: "Continuously adjusts strategies based on market changes",
      color: "from-yellow-500/10 to-yellow-600/5"
    }
  ];

  return (
    <section className="py-24 bg-gray-100 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#15B4A3]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F4C94C]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 px-4 py-2 rounded-full mb-6">
            <Brain className="w-5 h-5 text-teal-400" />
            <span className="text-teal-400 font-medium">Powered by Advanced AI</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-600 mb-6">
            Install Intelligence.
            <br />
            <span className="text-red-800">Accelerate Everything.</span>
          </h2>
          
          <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">
            GeniOS Intelligence continuously learns, adapts, and optimizes your career path. 
            It's not just smart—it's getting smarter with every action you take.
          </p>
        </div>

        {/* Intelligence Features Grid - Updated to match image */}
        <div className="grid grid-cols-4 gap-6 mb-16">
          {intelligenceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="bg-white/40 rounded-lg hover:scale-105 transition-all duration-300"
              >
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-neutral-500" />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-500 mb-4">{feature.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Intelligence Demo - Updated to match image */}
        <div className="bg-teal-500/20 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">Watch Intelligence Work</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-neutral-800">
                  <div className="w-2 h-2 bg-[#15B4A3] rounded-full animate-pulse"></div>
                  <span>Analyzing your career profile...</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-800">
                  <div className="w-2 h-2 bg-[#F4C94C] rounded-full animate-pulse delay-500"></div>
                  <span>Identifying skill gaps for target roles...</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-800">
                  <div className="w-2 h-2 bg-[#8E1616] rounded-full animate-pulse delay-1000"></div>
                  <span>Generating personalized roadmap...</span>
                </div>
                <div className="flex items-center gap-3 text-[#15B4A3] font-medium">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Intelligence activated. System optimized.</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/30 rounded-xl p-6 border border-white/10 bg-slate-900">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">127%</div>
                <div className="text-[#15B4A3] mb-4">Average Career Acceleration</div>
                <div className="text-sm text-neutral-800">
                  Users with GeniOS Intelligence reach their career goals 2.3x faster
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* CTA Section - Updated to match image */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-[#15B4A3] to-[#F4C94C] text-black font-bold text-xl px-16 py-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-teal-500/25 inline-flex items-center gap-4">
            <Zap className="w-6 h-6" />
            Access Intelligence Hub
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <p className="text-lg mt-6 text-black">
            Access your personalized intelligence dashboard
          </p>
        </div>
      </div>
    </section>
  );
};