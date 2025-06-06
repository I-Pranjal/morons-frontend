"use client"

import { Trash2 } from "lucide-react"

export default function AchievementSection({
  title,
  type,
  items,
  onAdd,
  onRemove,
  onUpdate,
  lastRef,
}) {
  const singularTitle = title.slice(0, -1) || "Item"

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>

      {items.map((item, index) => (
        <div key={`${type}-${index}`} className="flex items-center space-x-4">
          <textarea
            ref={index === items.length - 1 ? lastRef : null}
            value={item}
            onChange={(e) => onUpdate(type, index, e.target.value)}
            placeholder={`${singularTitle} description`}
            className="w-full border rounded px-3 py-2 min-h-[60px]"
          />

          <button
            onClick={() => onRemove(type, index)}
            aria-label={`Remove ${singularTitle}`}
            className="text-red-600 hover:text-red-700 border border-red-600 rounded px-2 py-1 text-sm"
            disabled={items.length <= 1}
            title={
              items.length <= 1
                ? `At least one ${singularTitle.toLowerCase()} is required`
                : `Remove ${singularTitle.toLowerCase()}`
            }
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        onClick={() => onAdd(type)}
        aria-label={`Add ${singularTitle}`}
        className="w-full bg-blue-600 text-white rounded px-4 py-2 flex items-center justify-center"
      >
        + Add {singularTitle}
      </button>
    </div>
  )
}
