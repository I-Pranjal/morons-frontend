import { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  MessageSquare, 
  Database, 
  Shield, 
  HelpCircle, 
  ChevronRight, 
  LogOut,
  Home,
  FileText,
  Target,
  Calendar,
  Briefcase
} from 'lucide-react';

// Main Settings component
export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [voiceVolume, setVoiceVolume] = useState(80);
  const [responseSpeed, setResponseSpeed] = useState(50);
  const [notifications, setNotifications] = useState({
    dailyCheckIns: true,
    weeklyReports: true,
    interviewTips: true,
    newFeatures: false
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} font-['Poppins']`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Settings className="w-8 h-8 mr-3" strokeWidth={1.5} />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'} transition`}>
              <Home className="w-6 h-6" />
            </button>
            <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold">
              ME
            </div>
          </div>
        </header>

        {/* Profile Section */}
        <section className="mb-8">
          <div className={`p-6 rounded-xl mb-4 ${darkMode ? 'bg-gray-900' : 'bg-white'} flex items-center justify-between`}>
            <div className="flex items-center">
              <div className="h-14 w-14 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xl mr-4">
                JD
              </div>
              <div>
                <h2 className="font-bold text-lg">John Doe</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  johndoe@example.com
                </p>
              </div>
            </div>
            <button className={`px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} transition`}>
              Edit Profile
            </button>
          </div>
        </section>

        {/* Main Settings Sections */}
        <div className="space-y-6">
          {/* Career Profile */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Career Profile
            </h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 font-medium text-sm">Current Resume</label>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      <span>Resume_JohnDoe_2025.pdf</span>
                    </div>
                    <button className="text-yellow-400 text-sm font-medium">Update</button>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-sm">Career Goals</label>
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-between`}>
                    <div className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      <span>Senior Product Manager</span>
                    </div>
                    <button className="text-yellow-400 text-sm font-medium">Edit</button>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 font-medium text-sm">Interview Prep Focus</label>
                  <div className="flex space-x-3">
                    <button className={`px-3 py-1 rounded ${darkMode ? 'bg-yellow-400 text-black' : 'bg-yellow-400 text-black'} font-medium`}>Tech</button>
                    <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Product</button>
                    <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Leadership</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Moon className="w-5 h-5 mr-2" />
              Appearance
            </h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="font-medium">Dark Mode</span>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full relative ${darkMode ? 'bg-yellow-400' : 'bg-gray-300'} transition-colors`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${darkMode ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-medium text-sm">Accent Color</label>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 ring-2 ring-offset-2 ring-yellow-400 ring-offset-black cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                </div>
              </div>
              <div>
                <label className="block mb-2 font-medium text-sm">Font Size</label>
                <div className="flex space-x-3">
                  <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Small</button>
                  <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>Medium</button>
                  <button className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Large</button>
                </div>
              </div>
            </div>
          </section>

          {/* Voice Settings */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Volume2 className="w-5 h-5 mr-2" />
              Voice Settings
            </h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="font-medium text-sm">Voice Volume</label>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{voiceVolume}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={voiceVolume} 
                  onChange={e => setVoiceVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="font-medium text-sm">Response Speed</label>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {responseSpeed < 33 ? 'Slow' : responseSpeed < 66 ? 'Normal' : 'Fast'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={responseSpeed} 
                  onChange={e => setResponseSpeed(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium text-sm">Mentor Style</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-400 text-black' : 'bg-yellow-400 text-black'} font-medium`}>Supportive</button>
                  <button className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Direct</button>
                  <button className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Technical</button>
                  <button className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>Analytical</button>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-sm">Wake Word</label>
                <div className="flex">
                  <input 
                    type="text" 
                    placeholder="Mr. Elite" 
                    className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'} border`}
                  />
                  <button className="ml-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-medium">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </h2>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Daily Mentor Moments</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Personalized check-ins based on your mood and progress
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, dailyCheckIns: !notifications.dailyCheckIns})}
                    className={`w-12 h-6 rounded-full relative ${notifications.dailyCheckIns ? 'bg-yellow-400' : 'bg-gray-600'} transition-colors`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.dailyCheckIns ? 'left-7' : 'left-1'}`}></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekly Mirror Reports</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Receive PDF summaries of achievements and next steps
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, weeklyReports: !notifications.weeklyReports})}
                    className={`w-12 h-6 rounded-full relative ${notifications.weeklyReports ? 'bg-yellow-400' : 'bg-gray-600'} transition-colors`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.weeklyReports ? 'left-7' : 'left-1'}`}></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Interview Tips</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Get timely tips based on your upcoming interviews
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, interviewTips: !notifications.interviewTips})}
                    className={`w-12 h-6 rounded-full relative ${notifications.interviewTips ? 'bg-yellow-400' : 'bg-gray-600'} transition-colors`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.interviewTips ? 'left-7' : 'left-1'}`}></span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">New Features</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Learn about new Mr. Elite capabilities
                    </p>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, newFeatures: !notifications.newFeatures})}
                    className={`w-12 h-6 rounded-full relative ${notifications.newFeatures ? 'bg-yellow-400' : 'bg-gray-600'} transition-colors`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications.newFeatures ? 'left-7' : 'left-1'}`}></span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Other Options */}
          <section>
            <h2 className="text-lg font-semibold mb-4">More Options</h2>
            <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} divide-y ${darkMode ? 'divide-gray-800' : 'divide-gray-200'}`}>
              <SettingsLink icon={<Calendar className="w-5 h-5" />} title="Task & Goal Tracking" />
              <SettingsLink icon={<MessageSquare className="w-5 h-5" />} title="Interview Practice" />
              <SettingsLink icon={<Database className="w-5 h-5" />} title="Data & Storage" />
              <SettingsLink icon={<Shield className="w-5 h-5" />} title="Privacy & Security" />
              <SettingsLink icon={<HelpCircle className="w-5 h-5" />} title="Help & Support" />
              <SettingsLink 
                icon={<LogOut className="w-5 h-5" />} 
                title="Log Out" 
                textColor="text-red-500"
                onClick={() => console.log('Logging out')}
              />
            </div>
          </section>
        </div>

        <footer className="mt-10 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Mr. ELITE v1.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}

// Settings link component
function SettingsLink({ icon, title, textColor = '', onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full p-4 flex items-center justify-between hover:bg-gray-800 transition ${textColor}`}
    >
      <div className="flex items-center">
        <span className="mr-3">{icon}</span>
        <span>{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}