"use client"

export default function PersonalInfoForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name *
          </label>
          <input
            id="fullName"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
       
      </div>

      <div className="space-y-2">
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn
        </label>
        <input
          id="linkedin"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={data.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/johndoe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="github" className="block text-sm font-medium text-gray-700">
          GitHub
        </label>
        <input
          id="github"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={data.github}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/johndoe"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          id="website"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={data.website}
          onChange={(e) => handleChange("website", e.target.value)}
          placeholder="https://johndoe.com"
        />
      </div>
    </div>
  )
}
