"use client"
import { useRef } from "react"
import { Plus, X, Award, FileText, Edit3 } from "lucide-react"

function AchievementSection({ 
  title, 
  type, 
  items, 
  lastRef, 
  onAdd, 
  onRemove, 
  onUpdate,
  icon: Icon 
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black">{title}</h3>
              <p className="text-sm text-gray-500">Add your {title.toLowerCase()}</p>
            </div>
          </div>
          {/* Desktop button - hidden on mobile */}
          <button
            onClick={onAdd}
            className="hidden md:flex px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 items-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add {title.slice(0, -1)}
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
            >
              <div className="flex-shrink-0">
                <Edit3 className="w-4 h-4 text-gray-400" />
              </div>
              <input
                ref={index === items.length - 1 ? lastRef : null}
                type="text"
                value={item}
                onChange={(e) => onUpdate(type, index, e.target.value)}
                placeholder={`Enter ${title.slice(0, -1).toLowerCase()}...`}
                className="flex-1 bg-transparent border-none outline-none text-black placeholder-gray-400 text-sm"
              />
              <button
                onClick={() => onRemove(type, index)}
                className="opacity-0 group-hover:opacity-100 md:opacity-100 text-gray-400 hover:text-red-600 transition-all duration-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          {items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No {title.toLowerCase()} added yet</p>
              <p className="text-xs text-gray-400 mt-1">Click "Add {title.slice(0, -1)}" to get started</p>
            </div>
          )}
        </div>

        {/* Mobile button - shown only on mobile, placed below the form */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
          <button
            onClick={onAdd}
            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add {title.slice(0, -1)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AchievementsForm({ 
  honors = [], 
  onHonorChange, 
  certifications = [], 
  onCertificationChange 
}) {
  const lastHonorRef = useRef(null)
  const lastCertificationRef = useRef(null)

  const addHonor = () => {
    const updatedHonors = [...honors, ""]
    onHonorChange({ honors: updatedHonors })
    setTimeout(() => {
      lastHonorRef.current?.focus()
    }, 0)
  }

  const updateHonor = (index, value) => {
    const updatedHonors = [...honors]
    updatedHonors[index] = value
    onHonorChange({ honors: updatedHonors })
  }

  const removeHonor = (index) => {
    const updatedHonors = honors.filter((_, i) => i !== index)
    onHonorChange({ honors: updatedHonors })
  }

  const addCertification = () => {
    const updatedCertifications = [...certifications, ""]
    onCertificationChange({ certifications: updatedCertifications })
    setTimeout(() => {
      lastCertificationRef.current?.focus()
    }, 0)
  }

  const updateCertification = (index, value) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = value
    onCertificationChange({ certifications: updatedCertifications })
  }

  const removeCertification = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    onCertificationChange({ certifications: updatedCertifications })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Achievements & Recognition</h1>
        <p className="text-gray-500">Showcase your honors, awards, and professional certifications</p>
      </div>

      <div className="space-y-8">
        <AchievementSection
          title="Honors"
          type="honors"
          items={honors}
          lastRef={lastHonorRef}
          onAdd={addHonor}
          onRemove={(_, index) => removeHonor(index)}
          onUpdate={(_, index, value) => updateHonor(index, value)}
          icon={Award}
        />
        
        <AchievementSection
          title="Certifications"
          type="certifications"
          items={certifications}
          lastRef={lastCertificationRef}
          onAdd={addCertification}
          onRemove={(_, index) => removeCertification(index)}
          onUpdate={(_, index, value) => updateCertification(index, value)}
          icon={FileText}
        />
      </div>
    </div>
  )
}