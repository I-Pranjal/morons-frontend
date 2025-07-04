import { useState } from 'react';

export function Collapsible({ open, onOpenChange, children }) {
  return <div>{children}</div>;
}

export function CollapsibleTrigger({ asChild, children }) {
  // Just render children, asChild is not handled in this simple stub
  return children;
}

export function CollapsibleContent({ children }) {
  return <div>{children}</div>;
}
