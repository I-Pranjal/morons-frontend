import { useState, useEffect } from 'react';
import { Clock, Globe, ChevronRight } from 'lucide-react';

const TimezoneSelector = () => {
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Kolkata');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [city, setCity] = useState('New Delhi');
  
  // List of available timezones with their display names
  const timezones = [
    { value: 'Asia/Kolkata', label: 'UTC/GMT +5:30 hours (IST)', city: 'New Delhi' },
    { value: 'America/New_York', label: 'UTC/GMT -5:00 hours (ET)', city: 'New York' },
    { value: 'Europe/London', label: 'UTC/GMT +0:00 hours (GMT)', city: 'London' },
    { value: 'America/Los_Angeles', label: 'UTC/GMT -8:00 hours (PT)', city: 'Los Angeles' },
    { value: 'Asia/Tokyo', label: 'UTC/GMT +9:00 hours (JST)', city: 'Tokyo' },
    { value: 'Australia/Sydney', label: 'UTC/GMT +10:00 hours (AEST)', city: 'Sydney' },
  ];
  
  useEffect(() => {
    // Update the time every second
    const updateTime = () => {
      const date = new Date();
      
      try {
        // Format the date and time according to the selected timezone
        const timeFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: selectedTimezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
        
        const dateFormatter = new Intl.DateTimeFormat('en-US', {
          timeZone: selectedTimezone,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        setCurrentTime(timeFormatter.format(date));
        setCurrentDate(dateFormatter.format(date));
      } catch (error) {
        console.error("Error formatting time:", error);
        setCurrentTime("Time unavailable");
        setCurrentDate("Date unavailable");
      }
    };
    
    // Initial update
    updateTime();
    
    // Set up interval for updates
    const interval = setInterval(updateTime, 1000);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [selectedTimezone]);
  
  const handleTimezoneChange = (e) => {
    const timezone = e.target.value;
    setSelectedTimezone(timezone);
    
    // Update city based on selected timezone
    const selectedTz = timezones.find(tz => tz.value === timezone);
    if (selectedTz) {
      setCity(selectedTz.city);
    }
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <Globe className="w-5 h-5 mr-2 text-gray-700" />
        Timezone Settings
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Timezone
          </label>
          <div className="relative">
            <select
              value={selectedTimezone}
              onChange={handleTimezoneChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-black appearance-none"
            >
              {timezones.map(tz => (
                <option key={tz.value} value={tz.value}>
                  {tz.label} - {tz.city}
                </option>
              ))}
            </select>
            <ChevronRight className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          
          <p className="mt-2 text-sm text-gray-500">
            The selected timezone will be used throughout the application for scheduling, reporting, and notifications.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Location
            </label>
            <p className="text-lg font-medium">{city}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Date
            </label>
            <p className="text-lg font-medium">{currentDate}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Time
            </label>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-700" />
              <p className="text-2xl font-bold">{currentTime}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 text-blue-800 text-sm rounded-md flex items-start">
        <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p>
          Your meetings and deadlines will be displayed in your local timezone, but can be converted to other team members' timezones when shared.
        </p>
      </div>
    </div>
  );
};

export default TimezoneSelector;