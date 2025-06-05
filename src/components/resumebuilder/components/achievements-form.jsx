"use client"

import { Plus, Trash2 } from "lucide-react"

export default function AchievementsForm({ honors, certifications, onChange }) {
  const addAchievement = (type) => {
    const newAchievement = ""
    onChange({
      honors: type === "honors" ? [...honors, newAchievement] : honors,
      certifications: type === "certifications" ? [...certifications, newAchievement] : certifications,
    })
  }

  const updateAchievement = (type, index, value) => {
    if (type === "honors") {
      const updatedHonors = [...honors]
      updatedHonors[index] = value
      onChange({ honors: updatedHonors, certifications })
    } else {
      const updatedCertifications = [...certifications]
      updatedCertifications[index] = value
      onChange({ honors, certifications: updatedCertifications })
    }
  }

  const removeAchievement = (type, index) => {
    if (type === "honors") {
      onChange({
        honors: honors.filter((_, i) => i !== index),
        certifications,
      })
    } else {
      onChange({
        honors,
        certifications: certifications.filter((_, i) => i !== index),
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Honors Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Honors</h2>
        {honors.map((honor, index) => (
          <div key={index} className="flex items-center space-x-4">
            <textarea
              value={honor}
              onChange={(e) => updateAchievement("honors", index, e.target.value)}
              placeholder="Honor description"
              className="w-full border rounded px-3 py-2 min-h-[60px]"
            />
            <button
              onClick={() => removeAchievement("honors", index)}
              className="text-red-600 hover:text-red-700 border border-red-600 rounded px-2 py-1 text-sm"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => addAchievement("honors")}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Honor
        </button>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Certifications</h2>
        {certifications.map((certification, index) => (
          <div key={index} className="flex items-center space-x-4">
            <textarea
              value={certification}
              onChange={(e) => updateAchievement("certifications", index, e.target.value)}
              placeholder="Certification description"
              className="w-full border rounded px-3 py-2 min-h-[60px]"
            />
            <button
              onClick={() => removeAchievement("certifications", index)}
              className="text-red-600 hover:text-red-700 border border-red-600 rounded px-2 py-1 text-sm"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => addAchievement("certifications")}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>
    </div>
  )
}
