import { useState } from 'react';
import { Upload, Mic, ChevronRight,User, Phone, School, Ticket, File, TicketCheck, LucideGlobe2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Authentication() {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    collegeName: '',
    graduationYear: '',
    resume: null,
    notInResume: '',
    careerGoal: '',
    approach: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      toast.success('Resume uploaded successfully!');
    }
  };
  
  const handleNext = () => {
    if (!formData.name || !formData.mobileNumber || !formData.collegeName || !formData.graduationYear) {
      toast.error('Please fill in all fields');
      return;
    }
    setCurrentStep(2);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.resume || !formData.notInResume || !formData.careerGoal || !formData.approach) {
      toast.error('Please complete all fields');
      return;
    }
    console.log('Form submitted:', formData);
    toast.success('Form submitted successfully!');
    // Handle form submission logic here
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6">
        {/* First Step */}
        <div className={`w-full md:w-1/2 bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 transition-all duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-70'}`}>
          <h1 className="text-3xl font-extrabold text-[#1B1B1B] mb-8">Authentication</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="name">Name</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-6 text-black'/>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
             
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="mobileNumber">Mobile number</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Phone className='size-6 text-black'/>
                </div>
                <input
                  type="number"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Enter your mobile number"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="collegeName">College name</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <School className='size-6 text-black'/>
                </div>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Enter your college name"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="graduationYear">Graduation year</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Ticket className='size-6 text-black'/>
                </div>
                <input
                  type="date"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Enter your graduation year"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#FFCB47] hover:bg-[#e6b73e] text-[#1B1B1B] font-extrabold py-3 px-12 rounded-lg transition-all duration-200 flex items-center justify-center group"
              >
                Next
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Second Step */}
        <div className={`w-full md:w-1/2 bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8 transition-all duration-300 ${currentStep === 2 ? 'opacity-100' : 'opacity-70'}`}>
          <h1 className="text-3xl font-extrabold text-[#1B1B1B] mb-8">Authentication</h1>
          
          <div className="space-y-6">
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="resume">Upload your resume</label>
              <div className="relative">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <div className="flex w-full">
                  <span className="w-full p-3 border-2 border-r-0 border-gray-300 rounded-l-lg bg-white text-black truncate">
                    {formData.resume ? formData.resume.name : "No file selected"}
                  </span>
                  <label htmlFor="resume" className="flex items-center justify-center bg-[#FFCB47] hover:bg-[#e6b73e] text-[#1B1B1B] font-bold p-3 rounded-r-lg cursor-pointer transition-all duration-200">
                    <Upload className="w-5 h-5" />
                    <span className="ml-2">Upload</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="notInResume">What's not in resume</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <File className='size-6 text-black'/>
                </div>
                <input
                  type="text"
                  id="notInResume"
                  name="notInResume"
                  value={formData.notInResume}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Tell us something not mentioned in your resume"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="careerGoal">What do you actually want to be?</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <TicketCheck className='size-6 text-black'/>
                </div>
                <input
                  type="text"
                  id="careerGoal"
                  name="careerGoal"
                  value={formData.careerGoal}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Describe your career goals"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-[#1B1B1B] font-medium mb-2" htmlFor="approach">What approach are you taking toward it?</label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <LucideGlobe2 className='size-6 text-black'/>
                </div>
                <input
                  type="text"
                  id="approach"
                  name="approach"
                  value={formData.approach}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-[#FFCB47] focus:outline-none focus:ring-1 focus:ring-[#FFCB47]"
                  placeholder="Describe your approach"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <Mic className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#FFCB47] hover:bg-[#e6b73e] text-[#1B1B1B] font-extrabold py-3 px-12 rounded-lg transition-all duration-200 border-2 border-transparent hover:border-[#CB0000] focus:outline-none focus:ring-2 focus:ring-[#CB0000]"
              >
                Submit
              </button>
            </div>
            
            {currentStep === 2 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-[#CB0000] hover:text-black font-medium"
                >
                  Go back
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}