"use client"

import { Plus, Trash2 } from "lucide-react"

export default function ExperienceForm({ data, onChange }) {
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [""],
    }
    onChange([...data, newExperience])
  }

  const updateExperience = (id, field, value) => {
    onChange(data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const removeExperience = (id) => {
    onChange(data.filter((exp) => exp.id !== id))
  }

  const addDescriptionPoint = (id) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) {
      updateExperience(id, "description", [...experience.description, ""])
    }
  }

  const updateDescriptionPoint = (id, index, value) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience) {
      const newDescription = [...experience.description]
      newDescription[index] = value
      updateExperience(id, "description", newDescription)
    }
  }

  const removeDescriptionPoint = (id, index) => {
    const experience = data.find((exp) => exp.id === id)
    if (experience && experience.description.length > 1) {
      const newDescription = experience.description.filter((_, i) => i !== index)
      updateExperience(id, "description", newDescription)
    }
  }

  return (
    <div className="space-y-4">
      {data.map((experience) => (
        <div key={experience.id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold">Experience</h3>
            <button
              onClick={() => removeExperience(experience.id)}
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
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  placeholder="Company Name"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Position *</label>
                <input
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, "position", e.target.value)}
                  placeholder="Job Title"
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Location</label>
                <input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                  placeholder="City, State"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="flex items-center space-x-2 pt-8">
                <input
                  type="checkbox"
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onChange={(e) => updateExperience(experience.id, "current", e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor={`current-${experience.id}`} className="text-sm">
                  Currently working here
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">End Date</label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  disabled={experience.current}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Job Description</label>
              {experience.description.map((desc, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    value={desc}
                    onChange={(e) => updateDescriptionPoint(experience.id, index, e.target.value)}
                    placeholder="Describe your responsibilities and achievements..."
                    className="border rounded p-2 w-full min-h-[60px]"
                  />
                  {experience.description.length > 1 && (
                    <button
                      onClick={() => removeDescriptionPoint(experience.id, index)}
                      className="text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addDescriptionPoint(experience.id)}
                className="border rounded p-2 w-full flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Description Point
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
