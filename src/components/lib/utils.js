import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  // Spread each input into clsx, then merge any conflicting Tailwind classes
  return twMerge(clsx(...inputs));
}
