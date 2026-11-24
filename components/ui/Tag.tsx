import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export function Tag({ children, accent = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em]",
        accent
          ? "border-accent/60 bg-accent/10 text-accent"
          : "border-border-subtle bg-bg-secondary text-text-secondary",
        className
      )}
    >
      {children}
    </span>
  );
}
