import React, { useState } from "react"

export function Accordion({ children, type, collapsible, className = "" }) {
  return <div className={className}>{children}</div>
}

export function AccordionItem({ value, children, className = "" }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b ${className}`}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open, setOpen })
      )}
    </div>
  )
}

export function AccordionTrigger({ children, open, setOpen, className = "" }) {
  return (
    <button
      type="button"
      className={`w-full flex items-center justify-between py-4 font-medium transition-colors ${className}`}
      onClick={() => setOpen(!open)}
    >
      {children}
      <span className={`ml-2 transition-transform ${open ? "rotate-90" : ""}`}>▶</span>
    </button>
  )
}

export function AccordionContent({ children, open, className = "" }) {
  return open ? <div className={`overflow-hidden transition-all ${className}`}>{children}</div> : null
}