"use client"

import { useState, useRef, useEffect } from "react"
import SkillSection from "./skillsection"

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
    { title: "Languages", placeholder: "e.g., Java, Python, SQL" },
    { title: "Frameworks", placeholder: "e.g., React, Flask" },
    { title: "Tools", placeholder: "e.g., Git, Postman" },
    { title: "Platforms", placeholder: "e.g., Linux, Windows" },
    { title: "Soft Skills", placeholder: "e.g., Communication, Leadership" },
  ]

  return (
    <div className="space-y-4">
      {categories.map(({ title, placeholder }) => (
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
        />
      ))}
    </div>
  )
}
