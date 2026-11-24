import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "split";
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "split",
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "border-b border-border-subtle pb-8 md:pb-10",
        align === "split"
          ? "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end"
          : "flex flex-col gap-5",
        className
      )}
    >
      <div className={cn(align === "split" ? "lg:col-span-7" : "max-w-3xl")}>
        <div className="mb-4 flex items-center gap-3">
          <span className="mono-label text-accent">{index}</span>
          <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
          <span className="mono-label text-text-secondary">{eyebrow}</span>
        </div>
        <h2 className="display-section text-text-primary">{title}</h2>
      </div>

      {(description || action) && (
        <div
          className={cn(
            "flex flex-col gap-5",
            align === "split" ? "lg:col-span-5 lg:items-end lg:text-right" : "max-w-2xl"
          )}
        >
          {description && (
            <p className="text-sm leading-relaxed text-text-secondary md:text-base">
              {description}
            </p>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
