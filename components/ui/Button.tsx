import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-ink border border-accent hover:bg-[#e4ff7a] active:scale-[0.99]",
  secondary:
    "bg-transparent text-text-primary border border-border-subtle hover:border-text-primary hover:bg-surface/60",
  ghost:
    "bg-transparent text-text-secondary border border-transparent hover:text-text-primary hover:border-border-subtle",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs tracking-[0.12em]",
  md: "px-5 py-3 text-xs tracking-[0.14em]",
  lg: "px-7 py-3.5 text-xs tracking-[0.16em]",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2.5 font-mono uppercase font-medium transition-colors duration-200 cursor-pointer select-none disabled:opacity-40 disabled:pointer-events-none";

interface LinkButtonProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  external?: boolean;
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
  ...props
}: LinkButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function ActionButton({
  variant = "secondary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
