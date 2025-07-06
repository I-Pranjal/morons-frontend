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
    <div className="border rounded-md p-4 bg-white">
      <div className="pb-4">
        <h2 className="text-lg font-bold text-black">{title}</h2>
      </div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          className="border border-gray-300 rounded-md p-2 flex-1 bg-f9f9f9 text-black"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
        />
        <button
          onClick={onAdd}
          className="bg-b61615 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((skill, index) => (
          <span
            key={index}
            className="bg-f9f9f9 text-gray-800 px-2 py-1 rounded-md flex items-center gap-1 border border-gray-200"
          >
            {skill}
            <button
              onClick={() => onRemove(skill)}
              className="ml-1 text-gray-500 hover:text-b61615"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}