"use client"

import { useState } from "react"
import { Plus, Trash2, X } from "lucide-react"

export default function ProjectsForm({ data, onChange }) {
  const [newTech, setNewTech] = useState({})

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      startDate: "",
      endDate: "",
    }
    onChange([...data, newProject])
  }

  const updateProject = (id, field, value) => {
    onChange(data.map((project) => (project.id === id ? { ...project, [field]: value } : project)))
  }

  const removeProject = (id) => {
    onChange(data.filter((project) => project.id !== id))
  }

  const addTechnology = (projectId) => {
    const tech = newTech[projectId]?.trim()
    const project = data.find((p) => p.id === projectId)

    if (tech && project && !project.technologies.includes(tech)) {
      updateProject(projectId, "technologies", [...project.technologies, tech])
      setNewTech({ ...newTech, [projectId]: "" })
    }
  }

  const removeTechnology = (projectId, techToRemove) => {
    const project = data.find((p) => p.id === projectId)
    if (project) {
      updateProject(
        projectId,
        "technologies",
        project.technologies.filter((tech) => tech !== techToRemove),
      )
    }
  }

  const handleTechKeyPress = (e, projectId) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTechnology(projectId)
    }
  }

  return (
    <div className="space-y-4">
      {data.map((project) => (
        <div key={project.id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold">Project</h3>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-700 p-1 rounded"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium">Project Name *</label>
              <input
                value={project.name}
                onChange={(e) => updateProject(project.id, "name", e.target.value)}
                placeholder="My Awesome Project"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Description *</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, "description", e.target.value)}
                placeholder="Describe what the project does and your role..."
                className="w-full border rounded p-2 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Technologies Used</label>
              <div className="flex gap-2">
                <input
                  value={newTech[project.id] || ""}
                  onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                  onKeyPress={(e) => handleTechKeyPress(e, project.id)}
                  placeholder="e.g., React, Node.js, MongoDB"
                  className="flex-1 border rounded p-2"
                />
                <button
                  onClick={() => addTechnology(project.id)}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-200 text-gray-800 px-2 py-1 rounded"
                  >
                    {tech}
                    <button
                      onClick={() => removeTechnology(project.id, tech)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-medium">Project Link</label>
                <input
                  value={project.link || ""}
                  onChange={(e) => updateProject(project.id, "link", e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium">GitHub Repository</label>
                <input
                  value={project.github || ""}
                  onChange={(e) => updateProject(project.id, "github", e.target.value)}
                  placeholder="https://github.com/user/repo"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-medium">Start Date</label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium">End Date</label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addProject}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </div>
  )
}
