import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-amber-500 text-white hover:bg-amber-600",
        outline: "border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        ghost: "text-blue-600 hover:bg-blue-50",
        link: "text-blue-600 underline-offset-4 hover:underline",
        accent: "bg-purple-600 text-white hover:bg-purple-700",
        success: "bg-green-600 text-white hover:bg-green-700",
        voice: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        full: "rounded-full",
        lg: "rounded-lg",
        md: "rounded-md",
        sm: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "lg",
    },
  }
)

const Button = React.forwardRef(({ 
  className, 
  variant, 
  size, 
  fullWidth, 
  rounded, 
  asChild = false, 
  ...props 
}, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, fullWidth, rounded }), className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
