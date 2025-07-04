import { Plus, X } from "lucide-react"

export default function SkillSection({
  title,
  category,
  placeholder,
  value,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
  inputRef,
}) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onAdd()
    }
  }

  return (
    <div className="border rounded-md p-4">
      <div className="pb-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="border rounded-md p-2 flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
        />
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md flex items-center gap-1"
          >
            {skill}
            <button
              onClick={() => onRemove(skill)}
              className="ml-1 hover:text-red-600"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
