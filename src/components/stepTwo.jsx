import React from 'react';
import { toast } from 'react-toastify';
import { Upload, File, Target, Globe, ChevronLeft, FileText } from 'lucide-react';
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
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-300 rounded-2xl mb-4">
          <Target className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-2xl font-semibold text-black mb-2">
          Career Information
        </h1>
        <p className="text-gray-600">
          Tell us about your career aspirations and upload your resume
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="block text-black font-medium text-sm">
            Upload Resume
          </label>
          <div className="flex rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
            <div className="flex-1 px-4 py-4 text-gray-600 flex items-center min-w-0">
              <FileText className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0" />
              <span className="truncate text-sm">
                {formData.resume?.name || "No file selected"}
              </span>
            </div>
            <label 
              htmlFor="resumeInput" 
              className="
                bg-amber-300 text-black px-6 py-4 cursor-pointer
                flex items-center hover:bg-amber-400 transition-colors font-medium
                active:scale-95 
              "
            >
              <Upload className="w-4 h-4 mr-2" />
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
          <p className="text-gray-500 text-xs mt-2">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>

        {/* Additional Information */}
        <div className="space-y-2">
          <label 
            className="block text-black font-medium text-sm" 
            htmlFor="whatsNotInResume"
          >
            What's not in your resume?
          </label>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <File className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
              id="whatsNotInResume"
              name="whatsNotInResume"
              value={formData.whatsNotInResume || ''}
              onChange={handleInputChange}
              rows={4}
              className="
                w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none
                transition-all duration-200 text-black placeholder-gray-500 resize-none
              "
              placeholder="Share any additional skills, experiences, or achievements not mentioned in your resume"
              required
            />
          </div>
        </div>

        {/* Career Goal */}
        <div className="space-y-2">
          <label 
            className="block text-black font-medium text-sm" 
            htmlFor="whatDoYouWantToBe"
          >
            What do you want to be?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Target className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="whatDoYouWantToBe"
              name="whatDoYouWantToBe"
              value={formData.whatDoYouWantToBe || ''}
              onChange={handleInputChange}
              className="
                w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none
                transition-all duration-200 text-black placeholder-gray-500
              "
              placeholder="Describe your dream career or role"
              required
            />
          </div>
        </div>

        {/* Approach */}
        <div className="space-y-2">
          <label 
            className="block text-black font-medium text-sm" 
            htmlFor="approachTowardsIt"
          >
            Your approach towards achieving it
          </label>
          <div className="relative">
            <div className="absolute top-4 left-4 pointer-events-none">
              <Globe className="w-5 h-5 text-gray-400" />
            </div>
            <textarea
              id="approachTowardsIt"
              name="approachTowardsIt"
              value={formData.approachTowardsIt || ''}
              onChange={handleInputChange}
              rows={4}
              className="
                w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl
                focus:ring-2 focus:ring-amber-300 focus:border-amber-300 focus:outline-none
                transition-all duration-200 text-black placeholder-gray-500 resize-none
              "
              placeholder="Describe your strategy, plans, or steps to achieve your career goals"
              required
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="
              text-gray-600 hover:text-black font-medium flex items-center
              transition-colors duration-200 order-2 sm:order-1
              hover:bg-gray-100 px-4 py-2 rounded-xl
            "
          >
            <ChevronLeft className="mr-2 w-5 h-5" />
            Go back
          </button>
          
          <button
            type="submit"
            className="
              w-full sm:w-auto bg-black text-white font-semibold py-4 px-8 rounded-2xl
              hover:bg-gray-800 transition-all duration-200 active:scale-[0.98]
              order-1 sm:order-2
            "
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;