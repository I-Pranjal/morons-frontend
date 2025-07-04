"use client"
import { useState } from "react"
import { Plus, Trash2, ExternalLink, FolderOpen } from "lucide-react"

export default function ProjectsForm({ data, onChange }) {
  const addProject = () => {
    const newProject = {
      name: "",
      link: "",
      linkText: "",
      description: "",
    }
    onChange([...data, newProject])
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...data]
    updatedProjects[index][field] = value
    onChange(updatedProjects)
  }

  const removeProject = (index) => {
    const updatedProjects = data.filter((_, i) => i !== index)
    onChange(updatedProjects)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <FolderOpen className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        </div>
        <p className="text-gray-600">Showcase your work and achievements</p>
      </div>

      <div className="space-y-6">
        {data.map((project, index) => (
          <div key={index} className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-300">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {project.name || "New Project"}
                  </h3>
                </div>
                <button
                  onClick={() => removeProject(index)}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 group-hover:scale-110"
                  title="Remove project"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="My Awesome Project"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Link Text <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={project.linkText}
                    onChange={(e) => updateProject(index, "linkText", e.target.value)}
                    placeholder="myproject.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Project URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={project.link}
                    onChange={(e) => updateProject(index, "link", e.target.value)}
                    placeholder="https://myproject.com"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                  <ExternalLink className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Describe the project, technologies used, your role, and key achievements..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {project.description.length}/500 characters
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center pt-4">
          <button
            onClick={addProject}
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-black font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-indigo-800"
          >
            <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-200 text-black">
              <Plus className="h-5 w-5" />
            </div>
            Add New Project
          </button>
        </div>
      </div>

      {data.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-600 mb-6">Start building your portfolio by adding your first project</p>
          <button
            onClick={addProject}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="h-5 w-5" />
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  )
}