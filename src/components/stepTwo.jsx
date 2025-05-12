import React from 'react';
import { toast } from 'react-toastify';
import { Upload, File, TicketCheck, LucideGlobe2, ChevronLeft, Mic } from 'lucide-react';
import useSubmitFormTwo from '../hooks/useSubmitFormTwo'; // Adjust the path if needed
import axios from 'axios';
import useChatSession from '../hooks/useChatSession';

const StepTwo = ({ onBack, onNext, formData, setFormData }) => {
  const { uploadResume } = useSubmitFormTwo();
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
          await sendMessage(newUserMessage);

      if (uploadedURL) {
        const updatedFormData = {
          ...formData,
          resumeURL: uploadedURL // Replace file with URL
        };


        delete updatedFormData.resume; // Remove the file before sending

        const response = await axios.post(`${BACKEND_URL}/api/forms/formtwo`, updatedFormData);

        if (response.status === 200) {
          toast.success('Form submitted successfully!');
          onNext();
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
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8 w-full mx-auto"
    >
      <h1 className="text-2xl sm:text-3xl font-extrabold text-yellow-400 mb-6 text-center">
        Authentication - Step 2
      </h1>

      <div className="space-y-6">
        {/* Resume Upload */}
        <div>
          <label className="block font-medium mb-2 text-gray-500">Upload your resume</label>
          <div className="flex w-full">
            <span className="w-full p-3 border-2 border-r-0 border-gray-300 rounded-l-lg bg-white text-gray-500 truncate">
              {formData.resume?.name || "No file selected"}
            </span>
            <label htmlFor="resumeInput" className="bg-yellow-400 text-white p-3 rounded-r-lg cursor-pointer flex items-center hover:bg-yellow-500 transition-colors">
              <Upload className="w-5 h-5" /><span className="ml-2">Upload</span>
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
        </div>

        {/* Text Inputs */}
        {[
          { id: 'whatsNotInResume', icon: <File />, placeholder: "What's not in resume?" },
          { id: 'whatDoYouWantToBe', icon: <TicketCheck />, placeholder: 'What do you want to be?' },
          { id: 'approachTowardsIt', icon: <LucideGlobe2 />, placeholder: 'Describe your approach' }
        ].map(({ id, icon, placeholder }) => (
          <div key={id}>
            <label className="block font-medium mb-2 text-gray-500" htmlFor={id}>{placeholder}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="text-yellow-500">{icon}</div>
              </div>
              <input
                type="text"
                id={id}
                name={id}
                value={formData[id] || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-10 p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                placeholder={placeholder}
              />
              <div className="absolute inset-y-0 right-3 flex items-center">
                <button type="button" className="text-yellow-500 hover:text-yellow-500 transition-colors">
                  <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <button
            type="button"
            onClick={onBack}
            className="text-yellow-400 hover:text-red-500 font-medium flex items-center transition-colors"
          >
            <ChevronLeft className="mr-2 w-5 h-5" /> Go back
          </button>
          <button
            type="submit"
            className="bg-yellow-400 text-white font-bold py-3 px-8 sm:px-12 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default StepTwo;
