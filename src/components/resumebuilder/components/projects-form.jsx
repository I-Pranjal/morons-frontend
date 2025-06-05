"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"

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
    <div className="space-y-4">
      {data.map((project, index) => (
        <div key={index} className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold">Project</h3>
            <button
              onClick={() => removeProject(index)}
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
                onChange={(e) => updateProject(index, "name", e.target.value)}
                placeholder="My Awesome Project"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Project Link *</label>
              <input
                value={project.link}
                onChange={(e) => updateProject(index, "link", e.target.value)}
                placeholder="https://myproject.com"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Link Text *</label>
              <input
                value={project.linkText}
                onChange={(e) => updateProject(index, "linkText", e.target.value)}
                placeholder="myproject.com"
                className="w-full border rounded p-2"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Description *</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, "description", e.target.value)}
                placeholder="Describe the project and your role..."
                className="w-full border rounded p-2 min-h-[80px]"
              />
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
