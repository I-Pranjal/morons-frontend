import React from 'react';
import { toast } from 'react-toastify';
import { Upload, File, TicketCheck, LucideGlobe2, ChevronLeft } from 'lucide-react';
import useSubmitFormTwo from '../hooks/useSubmitFormTwo'; // Adjust the path if needed
import axios from 'axios';
import useChatSession from '../hooks/useChatSession';

const StepTwo = ({ onBack, onNext, formData, setFormData }) => {
  const { uploadResume } = useSubmitFormTwo();
  const {sendResumeMessage} = useChatSession();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { sendMessage } = useChatSession();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resume: file
      });
      toast.success('Resume uploaded successfully!');
    }
  };

  const validateForm = () => {
    const { resume, whatsNotInResume, whatDoYouWantToBe, approachTowardsIt } = formData;

    if (!resume) {
      toast.error('Resume file is required.');
      return false;
    }
    if (!whatsNotInResume.trim()) {
      toast.error("What's not in resume is required.");
      return false;
    }
    if (!whatDoYouWantToBe.trim()) {
      toast.error('Career goal is required.');
      return false;
    }
    if (!approachTowardsIt.trim()) {
      toast.error('Approach is required.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
              onNext();

    try {
      const uploadedURL = await uploadResume(formData.resume);
          const fileFormData = new FormData();
    fileFormData.append('file', formData.resume);
              const review = await fetch('https://full-fledged-mvp-v1-2.onrender.com/analyze/file', {
            method: 'POST',
            body: fileFormData
          });
        const result = await review.json();
        const newUserMessage = {
            person: 'assistant',
            content: result?.analysis || "The file was processed but no text was returned",
          };
          await sendResumeMessage(newUserMessage);

      if (uploadedURL) {
        const updatedFormData = {
          ...formData,
          resumeURL: uploadedURL // Replace file with URL
        };

        delete updatedFormData.resume; // Remove the file before sending

        const response = await axios.post(`${BACKEND_URL}/api/forms/formtwo`, updatedFormData);

        if (response.status === 200) {
          toast.success('Form submitted successfully!');
        } else {
          toast.error('Failed to submit form.');
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Failed to upload resume.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-5 sm:p-6 w-full mx-auto"
    >
      <div className="text-center mb-5">
        <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Career Information
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Tell us about your career aspirations and upload your resume
        </p>
      </div>

      <div className="space-y-4">
        {/* Resume Upload */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm">
            Upload Resume
          </label>
          <div className="flex w-full">
            <div className="flex-1 px-3 py-2.5 bg-black border border-gray-700 border-r-0 rounded-l-lg text-gray-400 truncate flex items-center text-sm">
              <File className="w-4 h-4 mr-2 text-amber-300 flex-shrink-0" />
              <span className="truncate">{formData.resume?.name || "No file selected"}</span>
            </div>
            <label htmlFor="resumeInput" className="bg-amber-300 text-black px-4 py-2.5 rounded-r-lg cursor-pointer flex items-center hover:bg-amber-400 transition-colors font-medium text-sm">
              <Upload className="w-4 h-4 mr-1.5" />
              Browse
            </label>
            <input
              type="file"
              id="resumeInput"
              name="resumeInput"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>

        {/* What's not in resume */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="whatsNotInResume">
            What's not in your resume?
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 pointer-events-none">
              <File className="w-4 h-4 text-amber-300" />
            </div>
            <textarea
              id="whatsNotInResume"
              name="whatsNotInResume"
              value={formData.whatsNotInResume || ''}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 resize-none text-sm"
              placeholder="Share any additional skills, experiences, or achievements not mentioned in your resume"
            />
          </div>
        </div>

        {/* Career Goal */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="whatDoYouWantToBe">
            What do you want to be?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TicketCheck className="w-4 h-4 text-amber-300" />
            </div>
            <input
              type="text"
              id="whatDoYouWantToBe"
              name="whatDoYouWantToBe"
              value={formData.whatDoYouWantToBe || ''}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 text-sm"
              placeholder="Describe your dream career or role"
            />
          </div>
        </div>

        {/* Approach */}
        <div>
          <label className="block text-amber-300 font-medium mb-1.5 text-sm" htmlFor="approachTowardsIt">
            Your approach towards achieving it
          </label>
          <div className="relative">
            <div className="absolute top-2.5 left-3 pointer-events-none">
              <LucideGlobe2 className="w-4 h-4 text-amber-300" />
            </div>
            <textarea
              id="approachTowardsIt"
              name="approachTowardsIt"
              value={formData.approachTowardsIt || ''}
              onChange={handleChange}
              rows={3}
              className="w-full pl-10 pr-3 py-2.5 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all text-white placeholder-gray-500 resize-none text-sm"
              placeholder="Describe your strategy, plans, or steps to achieve your career goals"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onBack}
            className="text-amber-300 hover:text-amber-400 font-medium flex items-center transition-colors order-2 sm:order-1 text-sm"
          >
            <ChevronLeft className="mr-1.5 w-4 h-4" />
            Go back
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-amber-300 text-black font-bold py-2.5 px-6 rounded-lg hover:bg-amber-400 transition-all duration-200 shadow-lg hover:shadow-amber-300/25 order-1 sm:order-2 text-sm"
          >
            Complete Registration
          </button>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;