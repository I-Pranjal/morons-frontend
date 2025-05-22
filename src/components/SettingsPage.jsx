import { useState, useRef, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Bell,
  Calendar,
  FileText,
  Clock,
  ChevronRight,
  LogOut,
  Mail,
  MapPin,
  Briefcase,
  Shield,
  HelpCircle,
  Home,
  Globe,
  Save
} from 'lucide-react';
import { useUser } from '../context/userContext';
import useSettingsBackend from '../hooks/useSettingsBackend';

// Import ResumeUploader from external file
import ResumeUploader from './ResumeUploader';
import { updateMetadata } from 'firebase/storage';

// SaveButton Component
const SaveButton = ({ onClick, isSaving = false, text = "Save Changes" }) => {
  return (
    <div className="flex justify-end mt-6">
      <button 
        onClick={onClick}
        disabled={isSaving}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? 'Saving...' : text}
      </button>
    </div>
  );
};

const {saveUserDetails} = useSettingsBackend();

// Main Layout Component
const PageLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto px-4 py-8 md:px-8">
        {children}
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
      </div>
      <a href="/" className="flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
        <Home className="w-5 h-5 mr-2" />
        Home
      </a>
    </header>
  );
};

// Navigation Tabs Component
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'resume', label: 'Resume' },
    { id: 'schedule', label: 'Update schedule' },
    { id: 'questions', label: 'Questions' },
  ];

  return (
    <div className="mb-8 border-b border-gray-200">
      <nav className="flex flex-wrap -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`mr-4 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Section Component
const Section = ({ title, children }) => {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {children}
      </div>
    </section>
  );
};

// Form Field Component
const FormField = ({ label, children }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
};

// Input Component
const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black"
    />
  );
};

// Profile Section Component
const ProfileSection = () => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const { user , updateUser} = useUser();
  
  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.profilePictureUrl || null);
    }
  }, [user]);
  
  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };
  

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    const formData = new FormData();
    formData.append('Name', Name);
    formData.append('email', email);
    formData.append('randomInteger', user.randomInteger);
    formData.append('photo', photo);
    if (fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }

    const  newUser = await saveUserDetails(formData);
     updateUser(newUser);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 3000);
  };

  return (
    <Section title="Profile">
      <p className="text-sm text-gray-500 mb-6">Set your account details</p>
      
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <FormField label="Name">
            <Input 
              value={Name} 
              onChange={(e) => {setName(e.target.value); }} 
              placeholder="Enter your first name"
            />
          </FormField>
        </div>
      </div>
      
      <FormField label="Email">
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => {setEmail(e.target.value); }} 
          placeholder="Enter your email"
        />
      </FormField>
      
      <div className="flex items-center mt-8">
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            if (e.target.files[0] && e.target.files[0].size <= 1048576) { // 1MB limit
              handlePhotoChange(e);
            } else {
              alert('File size exceeds 1MB. Please upload a smaller file.');
            }
          }}
          accept="image/*"
          className="hidden"
        />
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-6 overflow-hidden">
          {photo ? (
            <img src={photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-gray-400" />
          )}
        </div>
        <button 
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
          onClick={() => fileInputRef.current.click()}
        >
          Edit photo
        </button>
      </div>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </Section>
  );
};

// Timezone Section Component
const TimezoneSection = () => {
  const [city, setCity] = useState('New Delhi');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [currentTime, setCurrentTime] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let formattedTime;
      
      if (timezone === 'America/New_York') { // Eastern Time
        formattedTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'America/New_York',
          dateStyle: 'full',
          timeStyle: 'medium'
        }).format(date);
      } else if (timezone === 'Europe/London') { // GMT
        formattedTime = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          dateStyle: 'full',
          timeStyle: 'medium'
        }).format(date);
      } else { // Default to IST
        formattedTime = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'full',
          timeStyle: 'medium'
        }).format(date);
      }
      
      setCurrentTime(formattedTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, [timezone]);

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
    
    // Update city based on timezone
    if (e.target.value === 'Asia/Kolkata') {
      setCity('New Delhi');
    } else if (e.target.value === 'America/New_York') {
      setCity('New York');
    } else if (e.target.value === 'Europe/London') {
      setCity('London');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      alert('Timezone preferences updated successfully!');
    }, 1000);
  };

  return (
    <Section title="Timezone & preferences">
      <p className="text-sm text-gray-500 mb-6">Let us know the time zone and format</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="City">
          <Input 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter your city"
          />
        </FormField>
        
        <FormField label="Timezone">
          <div className="relative">
            <select
              value={timezone}
              onChange={handleTimezoneChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black appearance-none"
            >
              <option value="Asia/Kolkata">UTC/GMT +5:30 hours (IST)</option>
              <option value="America/New_York">UTC/GMT -5:00 hours (ET)</option>
              <option value="Europe/London">UTC/GMT +0:00 hours (GMT)</option>
            </select>
            <ChevronRight className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </FormField>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 mr-2 text-gray-600" />
          <span className="font-medium">Current Date and Time:</span>
          <span className="ml-2 text-gray-700">{currentTime}</span>
        </div>
      </div>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </Section>
  );
};

// Performance Section Component
const PerformanceSection = () => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      alert('Performance settings updated successfully!');
    }, 1000);
  };

  return (
    <Section title="Motivation & Performance setup">
      <p className="text-sm text-gray-500 mb-6">Calibrate your desired activity levels</p>
      
      <div className="p-2 bg-gray-50 rounded-md text-sm text-gray-600 mb-6 flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        Learn more about work time classification
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Desired daily time utilization:</span>
            <span className="text-sm font-medium">7 hrs</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-black h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-xs text-gray-600">
            Find the perfect allocation that suits your workflow and maximizes your potential.
          </p>
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Desired daily core work range:</span>
            <span className="text-sm font-medium">3-6 hrs</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-black h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
          <p className="text-xs text-gray-600">
            Define the critical hours dedicated to your most important tasks, ensuring heightened focus and productivity during peak performance times.
          </p>
        </div>
      </div>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </Section>
  );
};

// Work Info Section Component
const WorkInfoSection = () => {
  const [jobFunction, setJobFunction] = useState('Design');
  const [jobTitle, setJobTitle] = useState('Team Lead designer');
  const [responsibilities, setResponsibilities] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      alert('Work information updated successfully!');
    }, 1000);
  };

  return (
    <Section title="Your work">
      <p className="text-sm text-gray-500 mb-6">Add info about your position</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Function">
          <Input 
            value={jobFunction} 
            onChange={(e) => setJobFunction(e.target.value)} 
            placeholder="Enter your function"
          />
        </FormField>
        
        <FormField label="Job Title">
          <Input 
            value={jobTitle} 
            onChange={(e) => setJobTitle(e.target.value)} 
            placeholder="Enter your job title"
          />
        </FormField>
      </div>
      
      <FormField label="Responsibilities">
        <textarea 
          className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-2 focus:ring-black focus:border-black" 
          placeholder="Describe your responsibilities"
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
        />
      </FormField>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </Section>
  );
};

// Enhanced Settings Link Component with optional badge/counter
const SettingsLink = ({ icon, title, badge, onClick }) => {
  return (
    <div 
      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-3 text-gray-700">{title}</span>
      </div>
      <div className="flex items-center">
        {badge && (
          <span className="bg-black text-white text-xs rounded-full px-2 py-1 mr-2">
            {badge}
          </span>
        )}
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

// Logout the user 
const logmeOut = () => {
  localStorage.removeItem('user'); 
  window.location.href = '/login'; 
};

// Enhanced More Options Component
const MoreOptionsSection = ({ setActiveSection }) => {
  const handleSupportLink = () => {
    window.open('mailto:support@moronss.com', '_blank');
  };

  return (
    <Section title="More Options">
      <div className="space-y-1">
        <SettingsLink 
          icon={<Calendar className="w-5 h-5 text-gray-500" />} 
          title="Schedule" 
          onClick={() => setActiveSection('schedule')}
        />
        <SettingsLink 
          icon={<FileText className="w-5 h-5 text-gray-500" />} 
          title="Templates" 
          badge="2" 
          onClick={() => setActiveSection('templates')}
        />
        <SettingsLink 
          icon={<Globe className="w-5 h-5 text-gray-500" />} 
          title="Language & Region" 
          onClick={() => setActiveSection('language')}
        />
        <SettingsLink 
          icon={<Briefcase className="w-5 h-5 text-gray-500" />} 
          title="Work Preferences" 
          onClick={() => setActiveSection('work')}
        />
        <SettingsLink 
          icon={<Shield className="w-5 h-5 text-gray-500" />} 
          title="Privacy & Security" 
          onClick={() => setActiveSection('privacy')}
        />
        <div 
          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer"
          onClick={handleSupportLink}
        >
          <div className="flex items-center">
            <HelpCircle className="w-5 h-5 text-gray-500" />
            <span className="ml-3 text-gray-700">Help & Support</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 text-gray-400 mr-1" />
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div 
          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer text-red-500"
          onClick={logmeOut}
        >
          <div className="flex items-center">
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Log Out</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Resume Section Component - Uses imported ResumeUploader
const ResumeSection = () => {
  return <ResumeUploader />;
};

// Language & Region Section Component
const LanguageSection = () => {
  const [language, setLanguage] = useState('English (US)');
  const [isSaving, setIsSaving] = useState(false);
  const languages = [
    'English (US)',
    'English (UK)',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Chinese (Simplified)',
    'Japanese'
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      alert('Language preferences updated successfully!');
    }, 1000);
  };
  
  return (
    <Section title="Language & Region">
      <p className="text-sm text-gray-500 mb-6">Set your preferred language and regional settings</p>
      
      <FormField label="Display Language">
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black appearance-none"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <ChevronRight className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </FormField>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-600">
          This setting changes the language used throughout the application interface.
          Your content and data will not be affected.
        </p>
      </div>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </Section>
  );
};

// Schedule Section Component
const ScheduleSection = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [workHours, setWorkHours] = useState({
    Monday: { start: '09:00', end: '17:00', working: true },
    Tuesday: { start: '09:00', end: '17:00', working: true },
    Wednesday: { start: '09:00', end: '17:00', working: true },
    Thursday: { start: '09:00', end: '17:00', working: true },
    Friday: { start: '09:00', end: '17:00', working: true },
    Saturday: { start: '10:00', end: '14:00', working: false },
    Sunday: { start: '10:00', end: '14:00', working: false }
  });
  const [isSaving, setIsSaving] = useState(false);
  
  const handleTimeChange = (day, field, value) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };
  
  const handleWorkingChange = (day) => {
    setWorkHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        working: !prev[day].working
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      alert('Schedule updated successfully!');
    }, 1000);
  };
  
  return (
    <Section title="Work Schedule">
      <p className="text-sm text-gray-500 mb-6">Set your regular working hours</p>
      
      <div className="space-y-4">
        {days.map(day => (
          <div key={day} className="flex items-center p-3 border border-gray-200 rounded-lg">
            <div className="w-24 md:w-32">
              <span className="font-medium">{day}</span>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row md:items-center">
              <div className="flex items-center mb-2 md:mb-0">
                <input
                  type="checkbox"
                  checked={workHours[day].working}
                  onChange={() => handleWorkingChange(day)}
                  className="mr-2 h-4 w-4"
                  id={`working-${day}`}
                />
                <label htmlFor={`working-${day}`} className="text-sm">Working day</label>
              </div>
              
              {workHours[day].working && (
                <div className="flex items-center ml-0 md:ml-6">
                  <input
                    type="time"
                    value={workHours[day].start}
                    onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                    className="p-1 border border-gray-300 rounded w-24"
                  />
                  <span className="mx-2">to</span>
                  <input
                    type="time"
                    value={workHours[day].end}
                    onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                    className="p-1 border border-gray-300 rounded w-24"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} text="Save Schedule" />
    </Section>
  );
};

// Templates Section Component
const TemplatesSection = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Daily Stand-up Report', description: 'Template for daily stand-up meetings', lastUsed: '2 days ago' },
    { id: 2, name: 'Weekly Progress Report', description: 'Template for weekly progress updates', lastUsed: '1 week ago' }
  ]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      alert('Templates updated successfully!');
    }, 1000);
  };
  
  return (
    <Section title="Templates">
      <p className="text-sm text-gray-500 mb-6">Manage your report and document templates</p>
      
      <div className="space-y-4">
        {templates.map(template => (
          <div key={template.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{template.name}</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">Edit</button>
            </div>
            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">Last used: {template.lastUsed}</span>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm">Use Template</button>
            </div>
          </div>
        ))}
      </div>
      
      <button className="mt-6 flex items-center text-blue-600 hover:text-blue-800">
        <span className="mr-1">+</span> Create New Template
      </button>
      
      <SaveButton onClick={handleSave} isSaving={isSaving} />
    </Section>
  );
};

// Main Settings component
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [activeSection, setActiveSection] = useState(null);
  const { user } = useUser();

  
  // Reset activeSection when tab changes
  useEffect(() => {
    setActiveSection(null);
  }, [activeTab]);

  const renderSectionContent = () => {
    if (activeSection === 'language') {
      return <LanguageSection />;
    } else if (activeSection === 'schedule') {
      return <ScheduleSection />;
    } else if (activeSection === 'templates') {
      return <TemplatesSection />;
    } else if (activeTab === 'account') {
      return (
        <>
        {
          user ? (
            <>
          <ProfileSection />
          <TimezoneSection />
          <PerformanceSection />
          <WorkInfoSection />
          <MoreOptionsSection setActiveSection={setActiveSection} />
            </>
          ) : 
          (
            <>
            <center>
            <p className="text-sm text-gray-500 mb-6">Please log in to access your account settings</p>
            <a href="/login">
            <button className="px-4 py-2 bg-amber-300 text-neutral-800 rounded-md hover:bg-amber-400 transition">
              Login
            </button>
            </a>
            </center>
            </>
          )
        }

        </>
      );
    } else if (activeTab === 'resume') {
      return <ResumeSection />;
    } else {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">This section is under development</h3>
          <p className="text-gray-500">
            The {activeTab} settings will be available soon. Please check back later.
          </p>
        </div>
      );
    }
  };

  return (
    <PageLayout>
      <Header title="Settings" />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeSection && (
        <div className="mb-6">
          <button 
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
            onClick={() => setActiveSection(null)}
          >
            <ChevronRight className="w-4 h-4 mr-1 transform rotate-180" />
            Back to {activeTab} settings
          </button>
        </div>
      )}
      
      {renderSectionContent()}
      
      <footer className="mt-8 text-center text-sm text-gray-400">
        The Moronss • Version 1.0.0 • Need help? <a href="mailto:support@moronss.com" className="text-blue-600 hover:text-blue-800">Contact Support</a>
      </footer>
    </PageLayout>
  );
}