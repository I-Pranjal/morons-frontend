// SavedProjects.jsx
import React from 'react';

const projects = [
  {
    title: 'AI Code Review Assistant',
    description: 'Automated code analysis tool using machine learning.',
    category: 'AI/ML',
    time: '2 days ago',
    status: 'In Progress',
    tags: ['Python', 'TensorFlow', 'GitHub API'],
  },
  {
    title: 'Sustainable Living Tracker',
    description: 'Mobile app for tracking environmental impact.',
    category: 'Mobile',
    time: '1 week ago',
    status: 'Completed',
    tags: ['React Native', 'Node.js', 'MongoDB'],
  },
];

function SavedProjects() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-1">My Saved Projects</h2>
      <p className="text-sm text-gray-600 mb-6">Projects you've saved and are working on</p>

      <div className="flex flex-col gap-4">
        {projects.map((project, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-md font-semibold text-gray-900">{project.title}</h3>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  project.status === 'In Progress'
                    ? 'bg-gray-900 text-white'
                    : 'bg-red-700 text-white'
                }`}
              >
                {project.status}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">{project.description}</p>

            <p className="text-xs text-gray-500 mb-3">
              {project.category} • {project.time}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-sm px-2.5 py-0.5 border border-gray-300 rounded-full text-gray-800 bg-white shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedProjects;