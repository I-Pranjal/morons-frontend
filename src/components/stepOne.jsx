import React, { useState, useRef, useEffect } from 'react';
import { User, Phone, School, Calendar, ChevronRight } from 'lucide-react';

const StepOne = ({ onNext, formData, setFormData }) => {
  const [showYearPicker, setShowYearPicker] = useState(false);
  const scrollRef = useRef(null);
  const BACKEND_URL = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:3000';


  const years = Array.from({ length: 200 }, (_, i) => 2030 - i);
  const currentYear = new Date().getFullYear();

  // Set default year to current year 
  useEffect(() => {
    if (!formData.graduationYear) {
      setFormData({ ...formData, graduationYear: currentYear.toString() });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleYearSelect = (year) => {
    setFormData({ ...formData, graduationYear: year.toString() });
    setShowYearPicker(false);
  };

  const scrollToYear = (year) => {
    if (scrollRef.current) {
      const yearIndex = years.indexOf(year);
      const itemHeight = 50;
      const containerHeight = 200;
      const scrollTop = yearIndex * itemHeight - containerHeight / 2 + itemHeight / 2;
      scrollRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (showYearPicker) {
      const yearToScroll = formData.graduationYear ? parseInt(formData.graduationYear) : currentYear;
      if (years.includes(yearToScroll)) {
        setTimeout(() => scrollToYear(yearToScroll), 100);
      }
    }
  }, [showYearPicker]);

  const toast = {
    error: (message) => {
      alert(message); // Simple fallback for demo
    }
  };

  const validateForm = () => {
    const { name, mobileNo, collegeName, graduationYear } = formData;
    
    if (!name?.trim()) {
      toast.error('Please enter your full name');
      return false;
    }
    if (!mobileNo?.trim()) {
      toast.error('Please enter your mobile number');
      return false;
    }
    if (!collegeName?.trim()) {
      toast.error('Please enter your college name');
      return false;
    }
    if (!graduationYear?.trim()) {
      toast.error('Please enter your graduation year');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // Simulate API call
      console.log('Submitting form:', formData);
      onNext();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  const inputFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      icon: User
    },
    {
      name: 'mobileNo',
      type: 'tel',
      label: 'Mobile Number',
      placeholder: 'Enter your mobile number',
      icon: Phone
    },
    {
      name: 'collegeName',
      type: 'text',
      label: 'College Name',
      placeholder: 'Enter your college name',
      icon: School
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl relative">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-300 rounded-2xl mb-4">
          <User className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-2xl font-semibold text-black mb-2">
          Personal Information
        </h1>
        <p className="text-gray-600">
          Please provide your basic details to continue
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {inputFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.name} className="space-y-2">
              <label 
                className="block text-black font-medium text-sm" 
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IconComponent className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="
                    w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl
                    focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none
                    transition-all duration-200 text-black placeholder-gray-500
                  "
                  placeholder={field.placeholder}
                  required
                />
              </div>
            </div>
          );
        })}

        {/* Graduation Year with Scroll Picker */}
        <div className="space-y-2">
          <label className="block text-black font-medium text-sm">
            Graduation Year
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={() => setShowYearPicker(!showYearPicker)}
              className="
                w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none
                transition-all duration-200 text-black text-left
                hover:bg-gray-100
              "
            >
              {formData.graduationYear || currentYear}
            </button>
          </div>

          {/* Apple-like Year Picker */}
          {showYearPicker && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-3xl">
              <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full mx-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-black">Select Year</h3>
                </div>
                
                <div className="relative">
                  {/* Selection indicator */}
                  <div className="absolute top-1/2 left-0 right-0 h-12 bg-amber-300 bg-opacity-20 border-t-2 border-b-2 border-amber-300 rounded-xl transform -translate-y-1/2 pointer-events-none z-10"></div>
                  
                  {/* Scroll container */}
                  <div 
                    ref={scrollRef}
                    className="h-48 overflow-y-scroll scrollbar-hide"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitScrollbar: { display: 'none' }
                    }}
                  >
                    <div className="py-24">
                      {years.map((year) => (
                        <div
                          key={year}
                          onClick={() => handleYearSelect(year)}
                          className={`
                            h-12 flex items-center justify-center cursor-pointer
                            transition-all duration-200 text-lg font-medium
                            ${(formData.graduationYear === year.toString() || (!formData.graduationYear && year === currentYear))
                              ? 'text-black scale-110' 
                              : 'text-gray-400 hover:text-gray-600'
                            }
                          `}
                        >
                          {year}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowYearPicker(false)}
                    className="
                      flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-2xl
                      hover:bg-gray-200 transition-all duration-200
                    "
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowYearPicker(false)}
                    className="
                      flex-1 py-3 px-4 bg-amber-300 text-black font-medium rounded-2xl
                      hover:bg-amber-400 transition-all duration-200
                    "
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            onClick={handleSubmit}
            className="
              w-full bg-black text-white font-semibold py-4 px-6 rounded-2xl
              flex items-center justify-center hover:bg-gray-800
              transition-all duration-200 active:scale-[0.98]
            "
          >
            Continue
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StepOne;