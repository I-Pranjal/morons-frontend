// SavedProjects.jsx
import React, { useState } from 'react';
import { FolderOpen, Clock, Tag, ExternalLink, Trash2, Edit3, Plus } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'AI Code Review Assistant',
    description: 'Automated code analysis tool using machine learning to identify bugs and suggest improvements.',
    category: 'AI/ML',
    time: '2 days ago',
    status: 'In Progress',
    tags: ['Python', 'TensorFlow', 'GitHub API', 'Flask'],
    progress: 65,
    priority: 'high'
  },
  {
    id: 2,
    title: 'Sustainable Living Tracker',
    description: 'Mobile app for tracking environmental impact and promoting eco-friendly habits.',
    category: 'Mobile',
    time: '1 week ago',
    status: 'Completed',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Charts.js'],
    progress: 100,
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting platform using blockchain technology.',
    category: 'Web3',
    time: '3 days ago',
    status: 'Planning',
    tags: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    progress: 25,
    priority: 'high'
  },
];

function SavedProjects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status.toLowerCase() === filter;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'planning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    return priority === 'high' ? 'bg-red-500' : 'bg-yellow-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">My Saved Projects</h2>
          <p className="text-lg text-gray-600">Track and manage your project ideas and implementations</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          >
            <option value="all">All Projects</option>
            <option value="planning">Planning</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-red-600/25">
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="text-2xl font-bold text-gray-900 mb-1">3</div>
          <div className="text-gray-600">Total Projects</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="text-2xl font-bold text-blue-600 mb-1">1</div>
          <div className="text-gray-600">In Progress</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="text-2xl font-bold text-green-600 mb-1">1</div>
          <div className="text-gray-600">Completed</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="text-2xl font-bold text-yellow-600 mb-1">63%</div>
          <div className="text-gray-600">Avg Progress</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-gray-100 transition-colors">
                    <FolderOpen className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(project.priority)}`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-600">Progress</span>
                  <span className="text-xs font-semibold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{project.time}</span>
                  <span>•</span>
                  <Tag className="h-3 w-3" />
                  <span>{project.category}</span>
                </div>
                <button className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  View Details
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-6">No projects match the selected filter. Try a different filter or create a new project.</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-colors">
            <Plus className="h-5 w-5" />
            Create New Project
          </button>
        </div>
      )}
    </div>
  );
}

export default SavedProjects;