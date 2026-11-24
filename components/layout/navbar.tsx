"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  routeMatch: string;
}

const navLinks: NavItem[] = [
  { label: "Home", href: "/", routeMatch: "/" },
  { label: "About", href: "/about", routeMatch: "/about" },
  { label: "Selected Works", href: "/work", routeMatch: "/work" },
  { label: "Expertise", href: "/#expertise", routeMatch: "/#expertise" },
  { label: "Journey", href: "/#journey", routeMatch: "/#journey" },
  { label: "Contact", href: "/contact", routeMatch: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const isActive = (item: NavItem) => {
    if (item.routeMatch === "/") return pathname === "/";
    if (item.routeMatch.startsWith("/#")) return false;
    return pathname === item.routeMatch || pathname.startsWith(`${item.routeMatch}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled || isMenuOpen
          ? "border-b border-border-subtle bg-bg-primary/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="editorial-container flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-center gap-3 focus-visible:outline-accent"
          aria-label="Khawarizmi Aditya Pratama Putra — Home"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-border-subtle bg-bg-secondary font-mono text-xs font-semibold tracking-wider text-accent transition-colors group-hover:border-accent">
            KA
          </span>
          <div className="hidden sm:flex flex-col">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-text-primary">
              Khawarizmi Aditya
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
              Software Developer
            </span>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => {
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative py-1 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200",
                  active
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute inset-x-0 -bottom-1 h-px bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-border-subtle px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            <span>Start a Conversation</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex h-10 w-10 items-center justify-center border border-border-subtle bg-bg-secondary text-text-primary transition-colors hover:border-accent hover:text-accent lg:hidden"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-t border-border-subtle bg-bg-primary transition-all duration-300 lg:hidden",
          isMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <nav aria-label="Mobile navigation" className="editorial-container flex flex-col py-6">
          {navLinks.map((item, idx) => {
            const active = isActive(item);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-border-subtle/70 py-4 transition-colors",
                  active ? "text-accent" : "text-text-primary hover:text-accent"
                )}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-text-secondary">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-2xl font-semibold uppercase tracking-tight">
                    {item.label}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            );
          })}
          <div className="pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            Khawarizmi Aditya Pratama Putra · Web &amp; Mobile Developer
          </div>
        </nav>
      </div>
    </header>
  );
}
