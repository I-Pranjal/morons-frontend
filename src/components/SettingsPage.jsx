import { useState } from 'react';
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
  HelpCircle
} from 'lucide-react';

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
    <header className="mb-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
    </header>
  );
};

// Navigation Tabs Component
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'sharing', label: 'Sharing' },
    { id: 'schedule', label: 'Update schedule' },
    { id: 'billing', label: 'Billing' },
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
  const [firstName, setFirstName] = useState('Bartosz');
  const [lastName, setLastName] = useState('Mcdaniel');
  const [email, setEmail] = useState('bartmcdaniel@niceguys.com');

  return (
    <Section title="Profile">
      <p className="text-sm text-gray-500 mb-6">Set your account details</p>
      
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <FormField label="Name">
            <Input 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              placeholder="Enter your first name"
            />
          </FormField>
        </div>
        
        <div className="md:w-1/2">
          <FormField label="Surname">
            <Input 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              placeholder="Enter your last name"
            />
          </FormField>
        </div>
      </div>
      
      <FormField label="Email">
        <Input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
        />
      </FormField>
      
      <div className="flex items-center mt-8">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-6">
          <User className="w-10 h-10 text-gray-400" />
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition">
          Edit photo
        </button>
      </div>
    </Section>
  );
};

// Timezone Section Component
const TimezoneSection = () => {
  const [city, setCity] = useState('New York');
  const [timezone, setTimezone] = useState('UTC/GMT -4 hours');
  const [dateFormat, setDateFormat] = useState('dd/mm/yyyy 00:00');

  return (
    <Section title="Timezone & preferences">
      <p className="text-sm text-gray-500 mb-6">Let us know the time zone and format</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="City">
          <Input 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 
            placeholder="Enter your city"
          />
        </FormField>
        
        <FormField label="Timezone">
          <div className="relative">
            <Input 
              value={timezone} 
              onChange={(e) => setTimezone(e.target.value)} 
              placeholder="Select timezone"
            />
            <ChevronRight className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
          </div>
        </FormField>
        
        <FormField label="Date & Time format">
          <div className="relative">
            <Input 
              value={dateFormat} 
              onChange={(e) => setDateFormat(e.target.value)} 
              placeholder="Select format"
            />
            <ChevronRight className="absolute right-2 top-3 w-4 h-4 text-gray-400" />
          </div>
        </FormField>
      </div>
    </Section>
  );
};

// Performance Section Component
const PerformanceSection = () => {
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
    </Section>
  );
};

// Work Info Section Component
const WorkInfoSection = () => {
  const [jobFunction, setJobFunction] = useState('Design');
  const [jobTitle, setJobTitle] = useState('Team Lead designer');

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
        />
      </FormField>
    </Section>
  );
};

// Settings Link Component
const SettingsLink = ({ icon, title }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer">
      <div className="flex items-center">
        {icon}
        <span className="ml-3 text-gray-700">{title}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
  );
};

// More Options Component
const MoreOptionsSection = () => {
  return (
    <Section title="More Options">
      <div className="space-y-1">
        <SettingsLink icon={<Calendar className="w-5 h-5 text-gray-500" />} title="Schedule" />
        <SettingsLink icon={<FileText className="w-5 h-5 text-gray-500" />} title="Templates" />
        <SettingsLink icon={<Briefcase className="w-5 h-5 text-gray-500" />} title="Work Preferences" />
        <SettingsLink icon={<Shield className="w-5 h-5 text-gray-500" />} title="Privacy & Security" />
        <SettingsLink icon={<HelpCircle className="w-5 h-5 text-gray-500" />} title="Help & Support" />
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer text-red-500">
          <div className="flex items-center">
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Log Out</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Main Settings component
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <PageLayout>
      <Header title="Settings" />
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'account' && (
        <>
          <ProfileSection />
          <TimezoneSection />
          <PerformanceSection />
          <WorkInfoSection />
          <MoreOptionsSection />
        </>
      )}
      
      {activeTab !== 'account' && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">This section is under development</h3>
          <p className="text-gray-500">
            The {activeTab} settings will be available soon. Please check back later.
          </p>
        </div>
      )}
      
      <footer className="mt-8 text-center text-sm text-gray-400">
        PeakPlanner • Version 1.0.0
      </footer>
    </PageLayout>
  );
}