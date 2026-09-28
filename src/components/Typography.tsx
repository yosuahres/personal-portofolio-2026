import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export const PageTitle = forwardRef<
  HTMLHeadingElement,
  { children: React.ReactNode; className?: string }
>(({ children, className }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn("text-2xl leading-[1.2] font-bold -tracking-[0.4px] md:text-[28px]", className)}
    >
      {children}
    </h1>
  );
});

PageTitle.displayName = "PageTitle";
