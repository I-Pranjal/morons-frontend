import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
 {
variants: {
variant: {
default:
"bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600/20",
destructive:
"bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40",
outline:
"border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:text-black text-gray-700 dark:bg-gray-50 dark:border-gray-300 dark:hover:bg-gray-100 dark:text-gray-700",
secondary:
"bg-gray-100 text-gray-700 shadow-sm hover:bg-gray-200 dark:bg-gray-100 dark:text-gray-700 dark:hover:bg-gray-200",
ghost:
"hover:bg-gray-100 hover:text-black text-gray-700 dark:hover:bg-gray-100 dark:text-gray-700",
link: "text-red-600 underline-offset-4 hover:underline hover:text-red-700",
 },
size: {
default: "h-9 px-4 py-2 has-[>svg]:px-3",
sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
icon: "size-9",
 },
 },
defaultVariants: {
variant: "default",
size: "default",
 },
 }
)

function Button({
className,
variant,
size,
asChild = false,
...props
}) {
const Comp = asChild ? Slot : "button"
return (
 (<Comp
data-slot="button"
className={cn(buttonVariants({ variant, size, className }))}
{...props} />)
 );
}

export { Button, buttonVariants }