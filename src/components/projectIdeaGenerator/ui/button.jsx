import React from "react"
export function Button({ children, className = "", variant = "default", ...props }) {
  let base =
    "inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  let variants = {
    default: "bg-[#f0c14b] text-black hover:bg-[#f8d878]",
    outline: "border border-[#333] bg-[#1e1e1e] text-white hover:bg-[#333]",
  }
  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  )
}