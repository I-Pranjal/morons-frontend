import React, { useState, useRef, useEffect } from "react"

export function Select({ value, onValueChange, children }) {
  // Just render children, pass value and onValueChange down
  return React.Children.map(children, child =>
    React.cloneElement(child, { value, onValueChange })
  )
}

export function SelectTrigger({ children, className = "", value, onClick, ...props }) {
  return (
    <button
      type="button"
      className={`w-full flex items-center justify-between rounded-md px-3 py-2 border ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder, value, options }) {
  const selected = options?.find(opt => opt.value === value)
  return <span className={selected ? "text-white" : "text-gray-400"}>{selected ? selected.label : placeholder}</span>
}

export function SelectContent({ children, open, setOpen, ...props }) {
  if (!open) return null
  return (
    <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-[#1e1e1e] border-[#333] border">
      {children}
    </div>
  )
}

export function SelectItem({ value: itemValue, children, onValueChange, setOpen, ...props }) {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-[#333] text-white"
      onClick={() => {
        onValueChange(itemValue)
        setOpen(false)
      }}
      {...props}
    >
      {children}
    </div>
  )
}

// Usage in your component:
