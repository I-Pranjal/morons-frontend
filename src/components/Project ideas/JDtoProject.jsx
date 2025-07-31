import React, { useState } from 'react';
import { Target, BarChart3, Upload, FileText, Sparkles, CheckCircle, XCircle } from 'lucide-react';

function JDtoProject() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) return;
    setIsAnalyzing(true);
    setSuggestions([]);
    setError(null);

    try {
      const payload = {
        job_description: jobDescription,
        skill_level: 'Intermediate',
        tech_preferences: [] // Optional enhancement
      };

      const res = await fetch('https://genios-agentic-server.onrender.com/project/job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Generated Ideas:', data);
        setSuggestions(data || []);
      } else {
        throw new Error(data?.message || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sampleJD = `Software Engineer Intern - Backend Development
Required Skills: Python, Django, PostgreSQL, REST APIs, Git
Experience with cloud platforms (AWS/GCP), Docker, microservices architecture
Strong problem-solving skills and experience with agile development`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-xl">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">JD-Aligned Project Suggestions</h2>
            <p className="text-lg text-gray-600">Get project ideas that perfectly match job requirements</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-gray-600 h-5 w-5" />
              <h3 className="text-xl font-semibold text-gray-900">Job Description Input</h3>
            </div>

            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Paste Job Description / Internship Details
            </label>
            <div className="relative">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows="8"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm text-gray-700 placeholder:text-gray-400 resize-none"
                placeholder="Paste the full job description here..."
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {jobDescription.length}/5000
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  jobDescription.trim() && !isAnalyzing
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/25'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing JD...
                  </>
                ) : (
                  <>
                    <BarChart3 className="h-5 w-5" />
                    Analyze & Suggest Projects
                  </>
                )}
              </button>

              <button className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center gap-2 font-medium">
                <Upload className="h-5 w-5" />
                Upload PDF
              </button>
            </div>

            <button
              onClick={() => setJobDescription(sampleJD)}
              className="w-full py-3 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Try with Sample Job Description
            </button>

            {/* Output Section */}
            {error && (
              <div className="mt-6 text-sm text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> {error}
              </div>
            )}

            {suggestions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Project Suggestions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {suggestions.map((proj, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition">
                      <h4 className="font-semibold text-gray-800 mb-2">{proj.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{proj.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech_stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-blue-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-gray-900">How It Works</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              {[
                'Paste the job description or upload a PDF',
                'AI analyzes required skills and technologies',
                'Get personalized project recommendations'
              ].map((step, idx) => (
                <div className="flex items-start gap-3" key={idx}>
                  <div className="bg-blue-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Popular Job Roles</h3>
            <div className="space-y-2">
              {['Frontend Developer', 'Backend Engineer', 'Full Stack Developer', 'Data Scientist', 'DevOps Engineer'].map((role, idx) => (
                <button
                  key={idx}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JDtoProject;
