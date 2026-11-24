import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const footerRoutes = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Selected Works", href: "/work" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Journey", href: "/#journey" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary">
      <div className="editorial-container py-14 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center border border-border-subtle bg-bg-secondary font-mono text-xs font-semibold text-accent">
                KA
              </span>
              <span className="font-display text-base font-semibold uppercase tracking-[0.06em] text-text-primary">
                {profile.name}
              </span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-secondary">
              {profile.role}. Focused on engineering clean, expressive web and mobile
              applications with deliberate visual craft.
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="mono-label mb-4 text-text-secondary">Navigation</p>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6">
              {footerRoutes.map((route) => (
                <li key={route.label}>
                  <Link
                    href={route.href}
                    className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-accent"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="mono-label mb-4 text-text-secondary">Connect</p>
            <ul className="space-y-2.5">
              {profile.contact.socials.map((social) => (
                <li key={social.label}>
                  {social.href ? (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-text-primary transition-colors hover:text-accent"
                    >
                      <span>{social.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary">
                      {social.label} — {social.placeholder}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-subtle pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            &copy; 2026 {profile.name}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary">
            Built with Next.js · TypeScript · Tailwind CSS · GSAP · Canvas 2D
          </p>
        </div>
      </div>
    </footer>
  );
}
