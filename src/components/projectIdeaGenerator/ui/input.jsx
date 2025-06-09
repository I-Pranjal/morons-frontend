import React from "react"
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`rounded-md px-3 py-2 border bg-[#1e1e1e] text-white border-[#333] focus:border-[#f0c14b] focus:ring-[#f0c14b] ${className}`}
      {...props}
    />
  )
}