import React from "react"

export function Badge({ className = "", children, ...props }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 font-semibold text-xs border ${className}`} {...props}>
      {children}
    </span>
  )
}