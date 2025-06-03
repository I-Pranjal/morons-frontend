"use client"

import { Plus, Trash2 } from "lucide-react"
import PropTypes from "prop-types"

export default function EducationForm({ data = [], onChange = () => {} }) {
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      honors: "",
    }
    onChange([...data, newEducation])
  }

  const updateEducation = (id, field, value) => {
    onChange(data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const removeEducation = (id) => {
    onChange(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-4">
      {data.map((education) => (
        <div key={education.id} className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold">Education</h3>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-700 p-1 border rounded"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Institution *</label>
                <input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="University Name"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Degree *</label>
                <input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Field of Study</label>
                <input
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  placeholder="Computer Science"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Location</label>
                <input
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                  placeholder="City, State"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Start Date</label>
                <input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">End Date</label>
                <input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">GPA (Optional)</label>
                <input
                  value={education.gpa || ""}
                  onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                  placeholder="3.8/4.0"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Honors (Optional)</label>
                <input
                  value={education.honors || ""}
                  onChange={(e) => updateEducation(education.id, "honors", e.target.value)}
                  placeholder="Magna Cum Laude"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Education
      </button>
    </div>
  )
}

EducationForm.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      institution: PropTypes.string,
      degree: PropTypes.string,
      field: PropTypes.string,
      location: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      gpa: PropTypes.string,
      honors: PropTypes.string,
    })
  ),
  onChange: PropTypes.func,
}
