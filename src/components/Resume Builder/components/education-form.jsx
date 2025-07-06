"use client"

import { Plus, Trash2, GraduationCap } from "lucide-react"
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
    <div className="space-y-6">
      {data.map((education, index) => (
        <div key={education.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <GraduationCap className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-black">Education {index + 1}</h3>
                <p className="text-sm text-gray-500">Academic qualification details</p>
              </div>
            </div>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
              title="Remove education entry"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Institution and Degree Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">
                  Institution <span className="text-red-600">*</span>
                </label>
                <input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  placeholder="e.g., Harvard University"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">
                  Degree <span className="text-red-600">*</span>
                </label>
                <input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  placeholder="e.g., Bachelor of Science"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Field and Location Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Field of Study</label>
                <input
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, "field", e.target.value)}
                  placeholder="e.g., Computer Science"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Location</label>
                <input
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                  placeholder="e.g., Cambridge, MA"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* Date Range Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Start Date</label>
                <input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, "startDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">End Date</label>
                <input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, "endDate", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
            </div>

            {/* GPA and Honors Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">GPA</label>
                <input
                  value={education.gpa || ""}
                  onChange={(e) => updateEducation(education.id, "gpa", e.target.value)}
                  placeholder="e.g., 3.8/4.0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-black">Honors & Awards</label>
                <input
                  value={education.honors || ""}
                  onChange={(e) => updateEducation(education.id, "honors", e.target.value)}
                  placeholder="e.g., Magna Cum Laude"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Education Button */}
      <div className="flex justify-center">
        <button
          onClick={addEducation}
          className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
          style={{ backgroundColor: '#b61615' }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12 rounded-xl border-2 border-dashed border-gray-300" style={{ backgroundColor: '#f9f9f9' }}>
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-black mb-2">No education entries yet</h3>
          <p className="text-gray-500 mb-6">Add your educational background to get started</p>
          <button
            onClick={addEducation}
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
            style={{ backgroundColor: '#b61615' }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Education
          </button>
        </div>
      )}
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