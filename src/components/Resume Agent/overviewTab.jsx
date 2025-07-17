import { Calendar, Eye } from 'lucide-react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/Context/Usercontext';

const badgeStyles = {
  Active: 'bg-red-600 text-white',
  Archived: 'bg-gray-900 text-white',
  'ATS Optimized': 'bg-white text-gray-900',
  'General SDE': 'bg-white text-gray-900',
};

export default function OverviewTab() {
  const [resumes, setResumes] = useState([]);
  const { userInfo } = useUserContext();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(`https://genios-backend.onrender.com/resume/updated/${userInfo?.id}`);
        if (response.status === 200) {
          setResumes(response.data);
          console.log("Resumes fetched successfully:", response.data);
        } else {
          console.error("Failed to fetch resumes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    if (userInfo?.id) {
      fetchResumes();
    }
  }, [userInfo]);

  return (
    <div className="bg-gray-200 p-6 rounded-xl shadow mt-4">
      <div className="mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          📝 Recent Resume Versions
        </h2>
        <p className="text-gray-500 text-sm">
          Your latest resume versions across all categories
        </p>
      </div>

      <div className="space-y-3">
        {resumes && resumes.length > 0 ? (
          resumes.map((resume, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg flex justify-between items-start hover:shadow-sm transition"
            >
              <div>
                <h3 className="text-md font-medium text-gray-900 mb-1">
                  Resume {index + 1}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {resume.tags?.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        badgeStyles[tag] || 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />{" "}
                    {new Date(resume.date_generated).toLocaleDateString()}
                  </span>
                </div>
              </div>
                <a
                  href={resume.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 text-sm mt-2 underline"
                  >
              <div className="flex gap-3 mt-1">
                <Eye className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />
              </div>
                  </a>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-sm">No resumes found yet.</p>
        )}
      </div>
    </div>
  );
}
