import React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "../lib/utils";

const Separator = React.forwardRef(
  ({ decorative = true, orientation = "horizontal", className, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // 横向或纵向尺寸
        orientation === "vertical" ? "h-auto w-px" : "h-px w-full",
        // 这里的 bg-separator 可以在你的 tailwind config 里指定颜色
        "bg-separator",
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
