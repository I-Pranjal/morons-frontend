import React from "react"

export function Progress({ value = 0, className = "", style = {}, ...props }) {
  return (
    <div className={`w-full rounded-full bg-gray-700 ${className}`} style={{ height: "0.5rem", ...style }}>
      <div
        className="rounded-full transition-all duration-300"
        style={{
          width: `${value}%`,
          background: style["--progress-background"] || "#fbbf24",
          height: "100%",
        }}
      />
    </div>
  )
}