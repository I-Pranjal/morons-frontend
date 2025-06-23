"use client"
import { User, Mail, Phone, Linkedin, Github, Globe } from "lucide-react"
import { useCallback, memo } from "react"

// Move InputField OUTSIDE of PersonalInfoForm to prevent recreation
const InputField = memo(({ 
  id, 
  label, 
  type = "text", 
  placeholder, 
  required = false, 
  icon: Icon,
  value,
  onChange
}) => {
  const handleInputChange = useCallback((e) => {
    onChange(id, e.target.value)
  }, [id, onChange])

  return (
    <div className="space-y-1">
      <label 
        htmlFor={id} 
        className="text-sm font-medium text-gray-700 flex items-center gap-1.5"
      >
        {Icon && <Icon className="w-3.5 h-3.5 text-gray-500" />}
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-md 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
                   transition-colors text-sm text-gray-900 placeholder-gray-400
                   hover:border-gray-400"
        value={value || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  )
})

InputField.displayName = 'InputField'

export default function PersonalInfoForm({ data = {}, onChange }) {
  const handleChange = useCallback((field, value) => {
    onChange({
      ...data,
      [field]: value,
    })
  }, [data, onChange])

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          Personal Information
        </h2>
        <p className="text-sm text-gray-600 mt-1">Contact details and professional links</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="fullName"
            label="Full Name"
            placeholder="John Doe"
            required={true}
            icon={User}
            value={data.fullName}
            onChange={handleChange}
          />
          <InputField
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            required={true}
            icon={Mail}
            value={data.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="phone"
            label="Phone Number"
            placeholder="+91 1234567890"
            icon={Phone}
            value={data.phone}
            onChange={handleChange}
          />
        </div>

        {/* Professional Links */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-gray-500" />
            Professional Links
          </h3>
          
          <div className="space-y-4">
            <InputField
              id="linkedin"
              label="LinkedIn"
              placeholder="https://linkedin.com/in/johndoe"
              icon={Linkedin}
              value={data.linkedin}
              onChange={handleChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="github"
                label="GitHub"
                placeholder="https://github.com/johndoe"
                icon={Github}
                value={data.github}
                onChange={handleChange}
              />
              
              <InputField
                id="website"
                label="Website"
                placeholder="https://johndoe.com"
                icon={Globe}
                value={data.website}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 text-center">
          Fields marked with <span className="text-red-500">*</span> are required
        </p>
      </div>
    </div>
  )
}