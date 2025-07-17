import React, { useState } from 'react';
import { Target, Zap, FileText, TrendingUp } from 'lucide-react';
import { useUserContext } from '@/Context/Usercontext';
import axios from 'axios';

export default function JDMatchTab() {
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { userInfo } = useUserContext();
  const [updatedResume, setUpdatedResume] = useState("");

  const handleRunWorkflow = () => {
    if (!jobDescription.trim()) return;
    setIsProcessing(true);
    // Simulate API call
    // console.log("Running JD Match workflow for user:", userInfo?.id);
    try {
      axios.post('https://genios-agentic-server.onrender.com/matchwithjd', {
        user_id: userInfo?.id,
        jd: jobDescription.trim(),
      })
      .then(response => {
        // console.log("JD Match response:", response.data);
        setUpdatedResume(response.data.pdf_url);
      })
      .catch(error => {
        console.error("Error during JD Match workflow:", error);
      }
      );
    } catch (error) {
      console.error("Error in handleRunWorkflow:", error);
    } finally {
      setIsProcessing(false);
    }

    setTimeout(() => setIsProcessing(false), 3000);
  };



  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-100 p-3 rounded-xl">
            <Target className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Match with Job Description</h2>
            <p className="text-gray-600 text-lg">Paste a JD and let Mr. Elite optimize your resume accordingly.</p>
          </div>
        </div>

        {/* Job Description Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none text-gray-700 placeholder:text-gray-400"
              rows="8"
            />
            <div className="text-xs text-gray-500 mt-2 text-right">
              {jobDescription.length}/5000 characters
            </div>
          </div>

          {/* Run Workflow Button */}
          <button
            onClick={handleRunWorkflow}
            disabled={!jobDescription.trim() || isProcessing}
            className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              jobDescription.trim() && !isProcessing
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25 hover:shadow-xl'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Processing JD Match...
              </>
            ) : (
              <>
                <Zap className="h-6 w-6" />
                Ask Mr. Elite to Match
              </>
            )}
          </button>
        </div>
      </div>

      {/* Updated Resume Section */}
      {updatedResume && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Updated Resume</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Your resume has been optimized based on the job description provided.
          </p>
          <a
            href={updatedResume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Download Updated Resume
          </a>
        </div>
      )}
 

      {/* Features Info */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-500 p-2 rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h3 className="font-bold text-gray-900">How JD Matching Works</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5">1</div>
            <p>AI analyzes job requirements and key skills</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5">2</div>
            <p>Optimizes your resume content and keywords</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5">3</div>
            <p>Provides match score and improvement suggestions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
