"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

export default function SkillsForm({ data, onChange }) {
  const [newSkill, setNewSkill] = useState({
    Languages: "",
    Frameworks: "",
    Tools: "",
    Platforms: "",
    "Soft Skills": "",
  })

  const addSkill = (category) => {
    const skill = newSkill[category].trim()
    if (skill && !data[category].includes(skill)) {
      onChange({
        ...data,
        [category]: [...data[category], skill],
      })
      setNewSkill({ ...newSkill, [category]: "" })
    }
  }

  const removeSkill = (category, skillToRemove) => {
    onChange({
      ...data,
      [category]: data[category].filter((skill) => skill !== skillToRemove),
    })
  }

  const handleKeyPress = (e, category) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(category)
    }
  }

  const SkillSection = ({ title, category, placeholder }) => (
    <div className="border rounded-md p-4">
      <div className="pb-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            className="border rounded-md p-2 flex-1"
            value={newSkill[category]}
            onChange={(e) => setNewSkill({ ...newSkill, [category]: e.target.value })}
            onKeyPress={(e) => handleKeyPress(e, category)}
            placeholder={placeholder}
          />
          <button
            onClick={() => addSkill(category)}
            className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data[category].map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center gap-1"
            >
              {skill}
              <button
                onClick={() => removeSkill(category, skill)}
                className="ml-1 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <SkillSection title="Languages" category="Languages" placeholder="e.g., Java, Python, SQL" />
      <SkillSection title="Frameworks" category="Frameworks" placeholder="e.g., Flask, NodeJs" />
      <SkillSection title="Tools" category="Tools" placeholder="e.g., GIT, MongoDB, MySQL" />
      <SkillSection title="Platforms" category="Platforms" placeholder="e.g., Linux, Windows, Web" />
      <SkillSection title="Soft Skills" category="Soft Skills" placeholder="e.g., Leadership, Time Management" />
    </div>
  )
}
