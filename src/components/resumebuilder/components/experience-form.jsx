"use client"

import { Plus, Trash2 } from "lucide-react"

export default function ExperienceForm({ experience, onChange }) {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      location: "",
      title: "",
      duration: "",
      details: [""],
    }
    onChange([...experience, newExperience])
  }

  const updateExperience = (id, field, value) => {
    onChange(experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id) => {
    onChange(experience.filter((exp) => exp.id !== id))
  }

  const addDetail = (id) => {
    const exp = experience.find((exp) => exp.id === id)
    if (exp) {
      updateExperience(id, "details", [...exp.details, ""])
    }
  }

  const updateDetail = (id, index, value) => {
    const exp = experience.find((exp) => exp.id === id)
    if (exp) {
      const newDetails = [...exp.details]
      newDetails[index] = value
      updateExperience(id, "details", newDetails)
    }
  }

  const removeDetail = (id, index) => {
    const exp = experience.find((exp) => exp.id === id)
    if (exp && exp.details.length > 1) {
      const newDetails = exp.details.filter((_, i) => i !== index)
      updateExperience(id, "details", newDetails)
    }
  }

  return (
    <div className="space-y-4">
      {experience.map((exp) => (
        <div key={exp.id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold">Experience</h3>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Company *</label>
                <input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="Company Name"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Title *</label>
                <input
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                  placeholder="Job Title"
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Location</label>
                <input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="City, State"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Duration</label>
                <input
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                  placeholder="e.g., Mar 2023 -- Apr 2023"
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Details</label>
              {exp.details.map((detail, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    value={detail}
                    onChange={(e) => updateDetail(exp.id, index, e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="border rounded p-2 w-full min-h-[60px]"
                  />
                  {exp.details.length > 1 && (
                    <button
                      onClick={() => removeDetail(exp.id, index)}
                      className="text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addDetail(exp.id)}
                className="border rounded p-2 w-full flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Detail
              </button>
            </div>
          </div>
        </div>
      ))}

      <button onClick={addExperience} className="border rounded p-2 w-full flex items-center justify-center">
        <Plus className="h-4 w-4 mr-2" />
        Add Experience
      </button>
    </div>
  )
}
