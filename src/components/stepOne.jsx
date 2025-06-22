import React from 'react';
import { toast } from 'react-toastify';
import { User, Phone, School, Calendar, ChevronRight } from 'lucide-react';
import axios from 'axios';

const StepOne = ({ onNext, formData, setFormData }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      await axios.post(`${BACKEND_URL}/api/forms/formone`, formData);
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
    },
    {
      name: 'graduationYear',
      type: 'number',
      label: 'Graduation Year',
      placeholder: 'Enter your graduation year',
      icon: Calendar
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">
          Personal Information
        </h1>
        <p className="text-gray-400">
          Please provide your basic details to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {inputFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.name} className="space-y-2">
              <label 
                className="block text-amber-300 font-medium text-base" 
                htmlFor={field.name}
              >
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <IconComponent className="w-5 h-5 text-amber-300" />
                </div>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="
                    w-full pl-12 pr-4 py-4 bg-black border border-gray-700 rounded-lg
                    focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                    transition-all duration-200 text-white placeholder-gray-400
                    text-base
                  "
                  placeholder={field.placeholder}
                  required
                />
              </div>
            </div>
          );
        })}

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="
              w-full bg-amber-300 text-black font-semibold py-4 px-6 rounded-lg
              flex items-center justify-center hover:bg-amber-400
              transition-all duration-200 shadow-lg hover:shadow-xl
              hover:shadow-amber-300/20 text-base
            "
          >
            Continue
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepOne;