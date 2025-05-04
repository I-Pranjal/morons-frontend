import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mic, Brain, Heart, BarChart2, Calendar, Target } from "lucide-react";

export default function SchedulingWorkflow() {
  return (
    <section className="w-full py-12 md:py-16 bg-yellow-50 border-2 border-dashed border-gray-300">
      <div className="container px-4 md:px-6">
        {/* Before/After Split Screen */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 bg-gray-50 rounded-xl p-6">
          <div className="flex-1 border-r-0 md:border-r border-dashed border-gray-300 p-4">
            <h3 className="font-bold text-xl mb-4 text-center font-poppins">Before Mr. Elite</h3>
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600 font-poppins">
              <li className="flex items-start">
                <span className="inline-flex mr-2">❌</span>
                <span>Juggling prep & academics with no guidance</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2">❌</span>
                <span>Hours spent on resumes with no feedback</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2">❌</span>
                <span>Anxiety: "Is this even enough?"</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2">❌</span>
                <span>FOMO seeing classmates succeed</span>
              </li>
            </ul>
          </div>
          
          <div className="flex-1 p-4">
            <h3 className="font-bold text-xl mb-4 text-center font-poppins">After Mr. Elite</h3>
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#854D0E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <ul className="space-y-3 text-gray-600 font-poppins">
              <li className="flex items-start">
                <span className="inline-flex mr-2">✅</span>
                <span>24/7 voice-first AI mentor support</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2">✅</span>
                <span>Instant feedback and goal tracking</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2">✅</span>
                <span>Emotional support that prevents burnout</span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex mr-2">✅</span>
                <span>Clear roadmap to achieve your goals</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-yellow-100 text-yellow-900 font-poppins">
            Meet Your AI Mentor
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-poppins">
            Turn Job Search Anxiety Into Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
            Mr. Elite is your 24/7 voice-first AI coach designed to provide real mentorship, 
            self-reflection, and accountability for SDE/ML/Product job seekers.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Feature 1 - Voice Check-ins */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Mic className="w-8 h-8 text-yellow-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2 font-poppins">Daily Voice Check-Ins</h3>
            <p className="text-gray-600 text-sm font-poppins">
              Wake up to friendly voice prompts. Chat about your mood and set today's micro-goals.
            </p>
          </div>

          {/* Feature 2 - Instant Feedback */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-yellow-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2 font-poppins">Instant Feedback</h3>
            <p className="text-gray-600 text-sm font-poppins">
              Get resume reviews and career guidance, highlighting your strengths and gaps in real-time.
            </p>
          </div>

          {/* Feature 3 - Goal Tracking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <BarChart2 className="w-8 h-8 text-yellow-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2 font-poppins">Goal Tracking</h3>
            <p className="text-gray-600 text-sm font-poppins">
              See progress charts and heatmaps as you work toward each milestone in your job search.
            </p>
          </div>

          {/* Feature 4 - Emotional Support */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-yellow-700" />
            </div>
            <h3 className="font-semibold text-lg mb-2 font-poppins">Emotional Support</h3>
            <p className="text-gray-600 text-sm font-poppins">
              Mr. Elite senses your tone and switches to "buddy mode" when you're stressed or doubting yourself.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 font-poppins">How Mr. Elite Works</h3>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-yellow-200 transform -translate-x-1/2"></div>
            
            {/* Steps */}
            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 flex md:justify-end">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 max-w-md">
                    <h4 className="font-semibold mb-2 font-poppins">1. Start your day with voice check-ins</h4>
                    <p className="text-gray-600 text-sm font-poppins">
                      Share how you're feeling and what you want to accomplish today. Mr. Elite adapts to your mood.
                    </p>
                  </div>
                </div>
                <div className="z-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:hidden mb-4">
                </div>
                <div className="z-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 max-w-md">
                    <h4 className="font-semibold mb-2 font-poppins">2. Set goals and follow your roadmap</h4>
                    <p className="text-gray-600 text-sm font-poppins">
                      Mr. Elite helps you break down big career goals into manageable daily tasks.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0 flex md:justify-end">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 max-w-md">
                    <h4 className="font-semibold mb-2 font-poppins">3. Receive ongoing encouragement</h4>
                    <p className="text-gray-600 text-sm font-poppins">
                      When anxiety hits, Mr. Elite's "buddy mode" gives you the pep talk you need to keep going.
                    </p>
                  </div>
                </div>
                <div className="z-10 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote and CTA */}
        <div className="text-center bg-yellow-50 rounded-xl p-8 mb-8">
          <p className="text-xl italic text-yellow-800 mb-6 font-poppins">
            "You're not behind, you're just not being loud enough about how far you've come."
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full text-lg font-poppins">
            Meet Mr. Elite Today
          </Button>
        </div>
      </div>
    </section>
  );
}