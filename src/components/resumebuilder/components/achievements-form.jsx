import { useRef } from "react"
import AchievementSection from "./AchievementSection"
"use client"

export default function AchievementsForm({ honors = [], onHonorChange, certifications = {}, onCertificationChange }) {
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

// -----------------------------------------------------------------------------------------------------------------------

  const addCertification = () => {
    const updatedCertifications = [...certifications, ""]
    onCertificationChange({ certifications: updatedCertifications })

    setTimeout(() => {
      lastCertificationRef.current?.focus()
    }, 0)
  }

  const updatedCertifications = (index, value) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = value
    onCertificationChange({ certifications: updatedCertifications })
  }

  const removeCertifications = (index) => {
    const updatedCertifications = certifications.filter((_, i) => i !== index)
    onCertificationChange({ certifications : updatedCertifications })
  }

  return (
    <div className="space-y-8">

      <AchievementSection
        title="Honors"
        type="honors"
        items={honors}
        lastRef={lastHonorRef}
        onAdd={() => addHonor()}
        onRemove={(_, index) => removeHonor(index)}
        onUpdate={(_, index, value) => updateHonor(index, value)}
      />

      <AchievementSection
        title="Ceritfications"
        type="certifications"
        items={certifications}
        lastRef={lastCertificationRef}
        onAdd={() => addCertification()}
        onRemove={(_, index) => removeCertifications(index)}
        onUpdate={(_, index, value) => updatedCertifications(index, value)}
      />
    </div>
  )
}
