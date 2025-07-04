"use client"

import { Plus, Trash2, Building, MapPin, Calendar, FileText } from "lucide-react"

export default function ExperienceForm({ experience = [], onChange }) {
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
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Professional Experience</h2>
        <p className="text-base text-slate-600 font-medium">Add your work experience details</p>
      </div>

      {experience.map((exp, expIndex) => (
        <div key={exp.id} className="bg-white border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {exp.company || `Experience ${expIndex + 1}`}
                </h3>
                <p className="text-sm text-slate-600 font-medium">{exp.title || "Position Title"}</p>
              </div>
            </div>
            <button
              onClick={() => removeExperience(exp.id)}
              className="flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
              title="Remove Experience"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-800">
                  <Building className="h-4 w-4 mr-2 text-slate-500" />
                  Company Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                  placeholder="e.g., Google, Microsoft"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-800">
                  <FileText className="h-4 w-4 mr-2 text-slate-500" />
                  Job Title <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-800">
                  <MapPin className="h-4 w-4 mr-2 text-slate-500" />
                  Location
                </label>
                <input
                  value={exp.location}
                  onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
                  placeholder="e.g., New York, NY"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-slate-800">
                  <Calendar className="h-4 w-4 mr-2 text-slate-500" />
                  Employment Period
                </label>
                <input
                  value={exp.duration}
                  onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                  placeholder="e.g., Jan 2022 - Present"
                  className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-semibold text-slate-800">
                Key Responsibilities & Achievements
              </label>
              <div className="space-y-3">
                {exp.details.map((detail, index) => (
                  <div key={index} className="group relative">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 mt-2 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 relative">
                        <textarea
                          value={detail}
                          onChange={(e) => updateDetail(exp.id, index, e.target.value)}
                          placeholder="Describe your key responsibilities and achievements with measurable impact"
                          className="w-full px-3 py-2 text-sm border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 placeholder:text-slate-400 resize-none font-medium"
                          rows="3"
                        />
                        {exp.details.length > 1 && (
                          <button
                            onClick={() => removeDetail(exp.id, index)}
                            className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                            title="Remove detail"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => addDetail(exp.id)}
                className="w-full py-3 px-4 border-2 border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-all duration-200 group font-semibold text-sm"
              >
                <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                Add Another Achievement
              </button>
            </div>
          </div>
        </div>
      ))}

      <button 
        onClick={addExperience} 
        className="w-full py-4 px-6 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-black font-bold text-base rounded-xl flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group"
      >
        <Plus className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
        Add New Work Experience
      </button>
    </div>
  )
}