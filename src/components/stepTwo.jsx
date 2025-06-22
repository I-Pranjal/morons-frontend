import React from 'react';
import { toast } from 'react-toastify';
import { Upload, File, Target, Globe, ChevronLeft } from 'lucide-react';
import useSubmitFormTwo from '../hooks/useSubmitFormTwo';
import useChatSession from '../hooks/useChatSession';
import axios from 'axios';

const StepTwo = ({ onBack, onNext, formData, setFormData }) => {
  const { uploadResume } = useSubmitFormTwo();
  const { sendResumeMessage } = useChatSession();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file });
      toast.success('Resume uploaded successfully!');
    }
  };

  const validateForm = () => {
    const { resume, whatsNotInResume, whatDoYouWantToBe, approachTowardsIt } = formData;

    if (!resume) {
      toast.error('Please upload your resume');
      return false;
    }
    if (!whatsNotInResume?.trim()) {
      toast.error('Please fill in what\'s not in your resume');
      return false;
    }
    if (!whatDoYouWantToBe?.trim()) {
      toast.error('Please describe your career goal');
      return false;
    }
    if (!approachTowardsIt?.trim()) {
      toast.error('Please describe your approach');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onNext();

    try {
      // Upload resume and get URL
      const uploadedURL = await uploadResume(formData.resume);
      
      // Analyze resume
      const fileFormData = new FormData();
      fileFormData.append('file', formData.resume);
      
      const response = await fetch('https://full-fledged-mvp-v1-2.onrender.com/analyze/file', {
        method: 'POST',
        body: fileFormData
      });
      
      const result = await response.json();
      const analysisMessage = {
        person: 'assistant',
        content: result?.analysis || "The file was processed but no text was returned",
      };
      
      await sendResumeMessage(analysisMessage);

      // Submit form data
      if (uploadedURL) {
        const submissionData = {
          ...formData,
          resumeURL: uploadedURL
        };
        delete submissionData.resume;

        const submitResponse = await axios.post(`${BACKEND_URL}/api/forms/formtwo`, submissionData);
        
        if (submitResponse.status !== 200) {
          toast.error('Failed to submit form data');
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error('Failed to process your submission. Please try again.');
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-8 pt-14 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">
          Career Information
        </h1>
        <p className="text-gray-400">
          Tell us about your career aspirations and upload your resume
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="block text-amber-300 font-medium text-base">
            Upload Resume
          </label>
          <div className="flex">
            <div className="
              flex-1 px-4 py-4 bg-black border border-gray-700 border-r-0 rounded-l-lg
              text-gray-400 flex items-center
            ">
              <File className="w-5 h-5 mr-3 text-amber-300 flex-shrink-0" />
              <span className="truncate">
                {formData.resume?.name || "No file selected"}
              </span>
            </div>
            <label 
              htmlFor="resumeInput" 
              className="
                bg-amber-300 text-black px-6 py-4 rounded-r-lg cursor-pointer
                flex items-center hover:bg-amber-400 transition-colors font-medium
              "
            >
              <Upload className="w-5 h-5 mr-2" />
              Browse
            </label>
            <input
              type="file"
              id="resumeInput"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>

        {/* Additional Information */}
        <div className="space-y-2">
          <label 
            className="block text-amber-300 font-medium text-base" 
            htmlFor="whatsNotInResume"
          >
            What's not in your resume?
          </label>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <File className="w-5 h-5 text-amber-300" />
            </div>
            <textarea
              id="whatsNotInResume"
              name="whatsNotInResume"
              value={formData.whatsNotInResume || ''}
              onChange={handleInputChange}
              rows={4}
              className="
                w-full pl-12 pr-4 py-4 bg-black border border-gray-700 rounded-lg
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                transition-all duration-200 text-white placeholder-gray-400 resize-none
                text-base
              "
              placeholder="Share any additional skills, experiences, or achievements not mentioned in your resume"
              required
            />
          </div>
        </div>

        {/* Career Goal */}
        <div className="space-y-2">
          <label 
            className="block text-amber-300 font-medium text-base" 
            htmlFor="whatDoYouWantToBe"
          >
            What do you want to be?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Target className="w-5 h-5 text-amber-300" />
            </div>
            <input
              type="text"
              id="whatDoYouWantToBe"
              name="whatDoYouWantToBe"
              value={formData.whatDoYouWantToBe || ''}
              onChange={handleInputChange}
              className="
                w-full pl-12 pr-4 py-4 bg-black border border-gray-700 rounded-lg
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                transition-all duration-200 text-white placeholder-gray-400
                text-base
              "
              placeholder="Describe your dream career or role"
              required
            />
          </div>
        </div>

        {/* Approach */}
        <div className="space-y-2">
          <label 
            className="block text-amber-300 font-medium text-base" 
            htmlFor="approachTowardsIt"
          >
            Your approach towards achieving it
          </label>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <Globe className="w-5 h-5 text-amber-300" />
            </div>
            <textarea
              id="approachTowardsIt"
              name="approachTowardsIt"
              value={formData.approachTowardsIt || ''}
              onChange={handleInputChange}
              rows={4}
              className="
                w-full pl-12 pr-4 py-4 bg-black border border-gray-700 rounded-lg
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300
                transition-all duration-200 text-white placeholder-gray-400 resize-none
                text-base
              "
              placeholder="Describe your strategy, plans, or steps to achieve your career goals"
              required
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="
              text-amber-300 hover:text-amber-400 font-medium flex items-center
              transition-colors duration-200 order-2 sm:order-1 text-base
            "
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            Go back
          </button>
          
          <button
            type="submit"
            className="
              w-full sm:w-auto bg-amber-300 text-black font-semibold py-4 px-8 rounded-lg
              hover:bg-amber-400 transition-all duration-200 shadow-lg hover:shadow-xl
              hover:shadow-amber-300/20 order-1 sm:order-2 text-base
            "
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;