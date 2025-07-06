"use client"
import { useState, useRef, useEffect } from "react"
import { Plus, X, Code, Wrench, Monitor, Users } from "lucide-react"

// Mock SkillSection component since it's not provided
function SkillSection({ 
  title, 
  category, 
  placeholder, 
  value, 
  inputValue, 
  inputRef, 
  setInputValue, 
  onAdd, 
  onRemove,
  icon: Icon 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAdd()
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-black">{title}</h3>
            <p className="text-sm text-gray-500">Add your {title.toLowerCase()}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all duration-200 text-sm"
          />
          <button
            onClick={onAdd}
            disabled={!inputValue.trim()}
            className="px-4 py-2.5 bg-red-700 text-white rounded-lg hover:bg-red-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {value.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Current {title}:</h4>
            <div className="flex flex-wrap gap-2">
              {value.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => onRemove(skill)}
                    className="text-gray-400 hover:text-red-700 transition-colors duration-200"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SkillsForm({ data, onChange }) {
  const [newSkill, setNewSkill] = useState({
    Languages: "",
    Frameworks: "",
    Tools: "",
    Platforms: "",
    "Soft Skills": "",
  })
  
  const inputRefs = useRef({})
  const focusCategory = useRef(null)

  const addSkill = (category) => {
    const skill = newSkill[category].trim()
    if (skill && !data[category].includes(skill)) {
      const updated = [...data[category], skill]
      onChange({ type: category, value: updated })
      setNewSkill((prev) => ({ ...prev, [category]: "" }))
      focusCategory.current = category
    }
  }

  const removeSkill = (category, skillToRemove) => {
    const updated = data[category].filter((skill) => skill !== skillToRemove)
    onChange({ type: category, value: updated })
  }

  useEffect(() => {
    if (focusCategory.current) {
      requestAnimationFrame(() => {
        const ref = inputRefs.current[focusCategory.current]
        if (ref) ref.focus()
        focusCategory.current = null
      })
    }
  })

  const categories = [
    { title: "Languages", placeholder: "e.g., Java, Python, SQL", icon: Code },
    { title: "Frameworks", placeholder: "e.g., React, Flask", icon: Wrench },
    { title: "Tools", placeholder: "e.g., Git, Postman", icon: Wrench },
    { title: "Platforms", placeholder: "e.g., Linux, Windows", icon: Monitor },
    { title: "Soft Skills", placeholder: "e.g., Communication, Leadership", icon: Users },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Technical Skills</h1>
        <p className="text-gray-500">Add your professional skills and expertise across different categories</p>
      </div>
      
      <div className="space-y-6">
        {categories.map(({ title, placeholder, icon }) => (
          <SkillSection
            key={title}
            title={title}
            category={title}
            placeholder={placeholder}
            value={data[title]}
            inputValue={newSkill[title]}
            inputRef={(el) => (inputRefs.current[title] = el)}
            setInputValue={(val) =>
              setNewSkill((prev) => ({ ...prev, [title]: val }))
            }
            onAdd={() => addSkill(title)}
            onRemove={(skill) => removeSkill(title, skill)}
            icon={icon}
          />
        ))}
      </div>
    </div>
  )
}