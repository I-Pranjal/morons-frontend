// Step One Component
import React from 'react';
import { toast } from 'react-toastify';
import { User, Phone, School, Ticket, ChevronRight } from 'lucide-react';
import axios from 'axios';

const StepOne = ({ onNext, formData, setFormData }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobileNo, collegeName, graduationYear, randomInteger } = formData;

    if (!name || !mobileNo || !collegeName || !graduationYear || !randomInteger) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // Mock submission and get response
      const response = await axios.post(`${BACKEND_URL}/api/forms/formone`, 
        formData,
      );
      onNext();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-5 sm:p-6 w-full mx-auto"
    >
      <div className="text-center mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Personal Information
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Please provide your basic details to continue
        </p>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-4 h-4 text-amber-300" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 text-sm"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="mobileNo">
            Mobile Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="w-4 h-4 text-amber-300" />
            </div>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 text-sm"
              placeholder="Enter your mobile number"
            />
          </div>
        </div>

        {/* College Name */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="collegeName">
            College Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <School className="w-4 h-4 text-amber-300" />
            </div>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 text-sm"
              placeholder="Enter your college name"
            />
          </div>
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="graduationYear">
            Graduation Year
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Ticket className="w-4 h-4 text-amber-300" />
            </div>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 text-sm"
              placeholder="Enter your graduation year"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full bg-amber-300 text-black font-bold py-2.5 px-5 rounded-lg flex items-center justify-center hover:bg-amber-400 transition-all duration-200 shadow-lg hover:shadow-amber-300/25 text-sm"
          >
            Continue
            <ChevronRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepOne;