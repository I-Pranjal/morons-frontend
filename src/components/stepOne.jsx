// Step One Component
import React from 'react';
import { toast } from 'react-toastify';
import { User, Mic, Phone, School, Ticket, ChevronRight } from 'lucide-react';
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
      console.log('Submitting form data:', formData);
      // Mock submission and get response
      const response = await axios.post(`${BACKEND_URL}/api/forms/formone`, 
        formData,
      );
      console.log('Form submitted successfully:', response.data);
      onNext();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 w-full mx-auto"
    >
      <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-900 mb-6 text-center">
        Authentication - Step 1
      </h1>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="name">Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your full name"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="mobileNo">Mobile number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="text"
              id="mobileNo"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your mobile number"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* College Name */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="collegeName">College name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <School className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your college name"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Graduation Year */}
        <div>
          <label className="block font-medium mb-2 text-gray-500" htmlFor="graduationYear">Graduation year</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Ticket className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
            <input
              type="number"
              id="graduationYear"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full pl-12 pr-12 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
              placeholder="Enter your graduation year"
            />
            <div className="absolute inset-y-0 right-3 flex items-center">
              <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="bg-yellow-400 text-white font-bold py-3 px-8 sm:px-12 rounded-lg flex items-center hover:bg-yellow-500 transition-colors shadow-md"
          >
            Next <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default StepOne;