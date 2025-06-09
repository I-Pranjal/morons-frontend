import React from "react"
export function Badge({ children, className = "", variant = "default", ...props }) {
  let base = "inline-flex items-center rounded-full px-3 py-1 font-semibold text-xs border"
  let variants = {
    default: "bg-[#f0c14b] text-black border-[#f0c14b]",
    outline: "bg-[#121212] text-[#f0c14b] border-[#f0c14b]/30",
  }
  return (
    <span className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </span>
  )
}