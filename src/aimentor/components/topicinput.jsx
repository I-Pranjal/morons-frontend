import { Plus, X } from "lucide-react"
import { useState } from "react"

export default function TopicInput({
    title,
    category,
    placeholder,
    value,
    inputValue,
    setInputValue,
    onAdd,
    onRemove,
    inputRef,
    options, // Pass the list of available options as a prop
}) {
    const [filteredOptions, setFilteredOptions] = useState([])

    const handleInputChange = (e) => {
        const input = e.target.value
        setInputValue(input)

        // Filter options based on input
        const filtered = options.filter((option) =>
            option.toLowerCase().includes(input.toLowerCase())
        )
        setFilteredOptions(filtered)
    }

    const handleOptionSelect = async(option) => {
        value.push(option) // Add selected option to the value array
        setInputValue("") // Clear input field
        setFilteredOptions([]) // Hide dropdown after selection
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            if (options.includes(inputValue)) {
                onAdd(inputValue)
                setFilteredOptions([])
            }
        }
    }

    return (
        <div className="border rounded-md p-4 bg-neutral-800">
            <div className="pb-4">
                <h2 className="text-lg font-bold text-gray-200">{title}</h2>
            </div>
            <div className="relative">
                <input
                    ref={inputRef}
                    className="border rounded-md p-2 flex-1 text-gray-200 bg-gray-700 focus:ring-2 focus:ring-blue-500 w-full"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder={placeholder}
                />
                {filteredOptions.length > 0 && (
                    <ul className="absolute z-10 bg-gray-700 border border-gray-600 rounded-md mt-1 w-full max-h-40 overflow-y-auto">
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-600 cursor-pointer text-gray-200"
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* This section shows what are the topics that user has selected */}
            <div className="flex flex-wrap gap-2 mt-2">
                {value.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-amber-400 text-black px-2 py-1 rounded-md flex items-center gap-1"
                    >
                        {skill}
                        <button
                            onClick={() => onRemove(skill)}
                            className="ml-1 hover:text-red-500"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}
