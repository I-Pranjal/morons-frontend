"use client"

import { Plus, Trash2 } from "lucide-react"

export default function AchievementsForm({ data, onChange }) {
  const addAchievement = () => {
    const newAchievement = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      date: "",
      description: "",
    }
    onChange([...data, newAchievement])
  }

  const updateAchievement = (id, field, value) => {
    onChange(data.map((achievement) => (achievement.id === id ? { ...achievement, [field]: value } : achievement)))
  }

  const removeAchievement = (id) => {
    onChange(data.filter((achievement) => achievement.id !== id))
  }

  return (
    <div className="space-y-4">
      {data.map((achievement) => (
        <div key={achievement.id} className="border rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <h3 className="text-lg font-semibold">Achievement / Award</h3>
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="text-red-600 hover:text-red-700 border border-red-600 rounded px-2 py-1 text-sm"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium">Title *</label>
              <input
                value={achievement.title}
                onChange={(e) => updateAchievement(achievement.id, "title", e.target.value)}
                placeholder="Award Name or Achievement Title"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-medium">Organization</label>
                <input
                  value={achievement.organization}
                  onChange={(e) => updateAchievement(achievement.id, "organization", e.target.value)}
                  placeholder="Issuing Organization"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="space-y-2">
                <label className="block font-medium">Date</label>
                <input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, "date", e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Description</label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, "description", e.target.value)}
                placeholder="Brief description of the achievement..."
                className="w-full border rounded px-3 py-2 min-h-[60px]"
              />
            </div>
          </div>
        </div>
      ))}

      <button onClick={addAchievement} className="w-full bg-blue-600 text-white rounded px-4 py-2 flex items-center justify-center">
        <Plus className="h-4 w-4 mr-2" />
        Add Achievement
      </button>
    </div>
  )
}
