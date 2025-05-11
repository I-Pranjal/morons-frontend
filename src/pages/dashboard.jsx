import React, { useState } from 'react';
import  Navbar  from '../components/Navbar';
import  Footer  from '../components/footer';
import { 
  ChevronRight, 
  Bell, 
  FileText, 
  Map, 
  Heart, 
  Star,
  BarChart3,
  Calendar,
  MessageCircle
} from 'lucide-react';

// Dashboard component that imports Navbar and Footer
const Dashboard = () => {
  // State for active section
  const [activeSection, setActiveSection] = useState('profile');

  // Mock data for resume strength
  const resumeStrengthData = [
    { name: 'Technical Skills', value: 85 },
    { name: 'Work Experience', value: 70 },
    { name: 'Education', value: 90 },
    { name: 'Projects', value: 65 },
    { name: 'Soft Skills', value: 75 }
  ];

  // Sidebar navigation items
  const navItems = [
    { id: 'profile', name: 'Profile Overview', icon: <BarChart3 size={20} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={20} /> },
    { id: 'resume', name: 'Resume Analyzer', icon: <FileText size={20} /> },
    { id: 'career', name: 'Career Roadmap', icon: <Map size={20} /> },
    { id: 'wellbeing', name: 'Motivation & Wellbeing', icon: <Heart size={20} /> },
    { id: 'goals', name: 'Experience Goals', icon: <Star size={20} /> }
  ];

  // Handler for sidebar navigation
  const handleNavigation = (id) => {
    setActiveSection(id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Import Navbar component */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 shadow-md hidden md:block">
          <div className="p-4 pt-24">
            <h2 className="text-xl font-bold text-black mb-6">Dashboard</h2>
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="mb-2">
                  <button
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${
                      activeSection === item.id
                        ? 'bg-yellow-100 text-black font-bold border-l-4 border-red-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3 text-gray-600">{item.icon}</span>
                    <span className="flex-1">{item.name}</span>
                    {activeSection === item.id && <ChevronRight size={16} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-y-auto p-6 pt-24 bg-gray-100">
          {/* Mobile sidebar toggle */}
          <div className="md:hidden mb-4">
            <select 
              className="w-full p-2 bg-gray-50 border rounded-md"
              value={activeSection}
              onChange={(e) => handleNavigation(e.target.value)}
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Content for Profile Overview */}
          {activeSection === 'profile' && (
            <div>
              <h1 className="text-2xl font-extrabold text-black mb-6">Profile Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Profile Summary Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="font-bold text-lg mb-4">Profile Completion</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-white font-extrabold text-xl">
                      75%
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Your profile is almost complete</p>
                      <button className="text-red-600 font-medium text-sm flex items-center mt-1">
                        Complete now <ChevronRight size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                {/* Goals Progress Card */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="font-bold text-lg mb-4">Experience Goals</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Interview Preparation</span>
                        <span className="font-medium">2/5 completed</span>
                      </div>
                      <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-red-600 h-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Resume Refinement</span>
                        <span className="font-medium">3/4 completed</span>
                      </div>
                      <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Strength Card */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
                <h2 className="font-bold text-lg mb-4">Resume Strength</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {resumeStrengthData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-full bg-gray-100 h-32 rounded-md relative mb-2">
                        <div 
                          className="absolute bottom-0 w-full bg-yellow-400 to-red-600 rounded-b-md"
                          style={{ height: `${item.value}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-center">{item.name}</span>
                      <span className="text-sm font-bold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Sessions Card */}
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Upcoming Sessions</h2>
                  <button className="text-red-600 font-medium text-sm flex items-center">
                    View all <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="mr-4 p-3 bg-yellow-400 rounded-md text-white">
                      <Calendar size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Mock Interview Session</h3>
                      <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                    </div>
                    <button className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg text-sm">
                      Join
                    </button>
                  </div>
                  
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="mr-4 p-3 bg-gray-200 rounded-md text-gray-600">
                      <MessageCircle size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">Resume Review Call</h3>
                      <p className="text-sm text-gray-600">May 14, 10:00 AM</p>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm">
                      Prepare
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content for Notifications */}
          {activeSection === 'notifications' && (
            <div>
              <h1 className="text-2xl font-extrabold text-black mb-6">Notifications</h1>
              <div className="bg-white rounded-lg shadow-md">
                <div className="border-b border-gray-200 p-4 flex items-start">
                  <div className="bg-yellow-400 p-2 rounded-full mr-3">
                    <Bell size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">New resume feedback available</h3>
                    <p className="text-sm text-gray-600">Your resume has been analyzed. Check out the detailed feedback.</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <button className="text-red-600 text-sm font-medium">View</button>
                </div>

                <div className="border-b border-gray-200 p-4 flex items-start">
                  <div className="bg-yellow-400 p-2 rounded-full mr-3">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Upcoming mock interview</h3>
                    <p className="text-sm text-gray-600">Your mock interview session is scheduled for tomorrow at 2:00 PM.</p>
                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                  </div>
                  <button className="text-red-600 text-sm font-medium">Prepare</button>
                </div>

                <div className="p-4 flex items-start">
                  <div className="bg-gray-200 p-2 rounded-full mr-3">
                    <Star size={20} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Goal completion reminder</h3>
                    <p className="text-sm text-gray-600">You're making good progress on your interview preparation goal.</p>
                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                  </div>
                  <button className="text-gray-500 text-sm font-medium">Mark as read</button>
                </div>
              </div>
            </div>
          )}

          {/* Content for Resume Analyzer */}
          {activeSection === 'resume' && (
            <div>
              <h1 className="text-2xl font-extrabold text-black mb-6">Resume Analyzer</h1>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg">Resume Analysis</h2>
                  <div className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    Good Standing
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Overall Score</h3>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-red-600 flex items-center justify-center text-white font-bold">
                      78%
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="bg-gray-100 h-2 rounded-full">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold">Strengths</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">Strong technical skills section with relevant technologies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm">Clear and concise work experience descriptions</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-bold">Areas for Improvement</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">!</span>
                        <span className="text-sm">Add more quantifiable achievements to showcase impact</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">!</span>
                        <span className="text-sm">Consider adding a projects section to highlight expertise</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg">
                    Upload New Resume
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Content for Career Roadmap */}
          {activeSection === 'career' && (
            <div>
              <h1 className="text-2xl font-extrabold text-black mb-6">Career Roadmap</h1>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-8">
                  <h2 className="font-bold text-lg mb-4">Your Career Path</h2>
                  <div className="relative">
                    {/* Career timeline */}
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
                    
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-black">Resume Building</h3>
                        <p className="text-sm text-gray-600 mt-1">Create a standout resume that highlights your skills and experiences</p>
                        <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                          Completed
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-12 pb-8">
                      <div className="absolute left-0 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-black">Interview Preparation</h3>
                        <p className="text-sm text-gray-600 mt-1">Practice common interview questions and scenarios</p>
                        <div className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                          In Progress
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-12">
                      <div className="absolute left-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-black">Job Applications</h3>
                        <p className="text-sm text-gray-600 mt-1">Apply to targeted positions aligned with your career goals</p>
                        <div className="mt-2 inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                          Upcoming
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="font-bold text-lg mb-4">Recommended Next Steps</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 flex items-start">
                      <div className="mr-3 p-2 bg-yellow-400 rounded-md text-white">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold">Schedule Mock Interview</h3>
                        <p className="text-sm text-gray-600">Practice with our AI interviewer to build confidence</p>
                        <button className="mt-2 text-red-600 text-sm font-medium flex items-center">
                          Schedule Now <ChevronRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-start">
                      <div className="mr-3 p-2 bg-gray-200 rounded-md text-gray-600">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold">Complete Resume Review</h3>
                        <p className="text-sm text-gray-600">Get detailed feedback on your resume from our experts</p>
                        <button className="mt-2 text-gray-600 text-sm font-medium flex items-center">
                          Learn More <ChevronRight size={14} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content for Motivation & Wellbeing */}
          {activeSection === 'wellbeing' && (
            <div>
              <h1 className="text-2xl font-extrabold text-black mb-6">Motivation & Wellbeing</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="font-bold text-lg mb-4">Today's Motivation</h2>
                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
                    <p className="text-lg italic">"The only way to do great work is to love what you do."</p>
                    <p className="text-sm text-gray-600 mt-1">- Steve Jobs</p>
                  </div>
                  <button className="mt-2 text-sm font-medium text-red-600 flex items-center">
                    Get a new quote <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                  <h2 className="font-bold text-lg mb-4">Mood Tracker</h2>
                  <p className="text-sm text-gray-600 mb-4">How are you feeling today?</p>
                  <div className="flex justify-between">
                    <button className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-1">
                        😔
                      </div>
                      <span className="text-xs">Stressed</span>
                    </button>
                    <button className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-1">
                        😐
                      </div>
                      <span className="text-xs">Okay</span>
                    </button>
                    <button className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-1">
                        🙂
                      </div>
                      <span className="text-xs">Good</span>
                    </button>
                    <button className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-1">
                        😊
                      </div>
                      <span className="text-xs">Great</span>
                    </button>
                    <button className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                        🤩
                      </div>
                      <span className="text-xs">Amazing</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h2 className="font-bold text-lg mb-4">Wellbeing Resources</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-lg flex items-start">
                    <div className="mr-4 p-2 bg-yellow-400 rounded-md text-white">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">Stress Management During Job Search</h3>
                      <p className="text-sm text-gray-600 mt-1">Learn techniques to manage stress during your job search journey</p>
                      <button className="mt-2 text-red-600 text-sm font-medium">Read Article</button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg flex items-start">
                    <div className="mr-4 p-2 bg-yellow-400 rounded-md text-white">
                      <Heart size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">5-Minute Mindfulness Exercises</h3>
                      <p className="text-sm text-gray-600 mt-1">Quick mindfulness practices to center yourself before interviews</p>
                      <button className="mt-2 text-red-600 text-sm font-medium">Try Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content for Experience Goals */}
          {activeSection === 'goals' && (
            <div>
              <h1 className="text-2xl font-extrabold text-black mb-6">Experience Goals</h1>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-lg">Your Goals</h2>
                  <button className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg text-sm">
                    Add New Goal
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Active Goal */}
                  <div className="border border-yellow-200 rounded-lg overflow-hidden">
                    <div className="bg-yellow-50 px-6 py-4 flex justify-between items-center">
                      <h3 className="font-bold">Ace Technical Interviews</h3>
                      <div className="bg-yellow-400 text-white text-xs font-medium px-2 py-1 rounded-full">
                        In Progress
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">2/5 completed</span>

                      </div>
                      <div className="bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
                        <div className="bg-red-600 h-full w-full" style={{ width: '40%' }}></div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-red-600 rounded" readOnly />
                          <span className="ml-3 text-sm line-through text-gray-500">Complete mock interview with AI</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" checked className="w-4 h-4 text-red-600 rounded" readOnly />
                          <span className="ml-3 text-sm line-through text-gray-500">Review common algorithm questions</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-red-600 rounded" readOnly />
                          <span className="ml-3 text-sm">Practice system design questions</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-red-600 rounded" readOnly />
                          <span className="ml-3 text-sm">Complete behavioral interview prep</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="w-4 h-4 text-red-600 rounded" readOnly />
                          <span className="ml-3 text-sm">Do a full mock interview with feedback</span>
                        </div>
                      </div>
                      
                      <button className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 rounded-lg">
                        Continue Progress
                      </button>
                    </div>
                  </div>
                  
                  {/* Completed Goal */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden opacity-75">
                    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                      <h3 className="font-bold">Create Professional Resume</h3>
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        Completed
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span className="font-medium">4/4 completed</span>
                      </div>
                      <div className="bg-gray-100 h-2 rounded-full overflow-hidden mb-4">
                        <div className="bg-green-500 h-full w-full"></div>
                      </div>
                      
                      <button className="mt-4 w-full bg-gray-200 text-gray-700 font-bold py-2 rounded-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-100">
                <div className="flex items-start">
                  <div className="p-3 bg-yellow-400 rounded-md text-white mr-4">
                    <Star size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Ready for your next career milestone?</h2>
                    <p className="text-sm text-gray-600 mt-1 mb-4">Let our AI help you set and achieve your career goals. From skill development to job applications.</p>
                    <button className="bg-red-600 text-white font-medium py-2 px-4 rounded-lg text-sm">
                      Create Custom Goal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Import Footer component */}
      <Footer />
    </div>
  );
};

export default Dashboard;