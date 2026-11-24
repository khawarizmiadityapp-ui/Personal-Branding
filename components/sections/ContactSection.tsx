import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

interface ContactSectionProps {
  showContactPageLink?: boolean;
}

export function ContactSection({ showContactPageLink = true }: ContactSectionProps) {
  return (
    <section id="contact" className="bg-bg-primary py-24 md:py-32">
      <div className="editorial-container">
        <Reveal className="border border-border-subtle bg-bg-secondary p-8 md:p-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="mono-label text-accent">08</span>
                <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
                <span className="mono-label text-text-secondary">Contact</span>
              </div>

              <h2 className="display-section text-text-primary">
                {profile.contact.heading}
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-text-secondary">
                {profile.contact.invitation}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {showContactPageLink && (
                  <LinkButton href="/contact" variant="primary" size="lg">
                    <span>Contact Page</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </LinkButton>
                )}
                <LinkButton href="/work" variant="secondary" size="lg">
                  <span>Browse Archive</span>
                </LinkButton>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="border border-border-subtle bg-bg-primary p-5">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Direct Email</span>
                </div>
                <p className="mt-2 font-mono text-sm text-text-primary break-all">
                  {profile.contact.emailPlaceholder}
                </p>
              </div>

              <div className="divide-y divide-border-subtle border border-border-subtle bg-bg-primary">
                {profile.contact.socials.map((social) => (
                  <div
                    key={social.label}
                    className="flex items-center justify-between gap-4 px-5 py-4"
                  >
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.14em] text-text-primary">
                        {social.label}
                      </p>
                      <p className="mt-0.5 text-xs text-text-secondary">
                        {social.href ? social.handle : social.placeholder}
                      </p>
                    </div>
                    {social.href ? (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-accent hover:text-accent"
                        aria-label={`Open ${social.label}`}
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-secondary">
                        Placeholder
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
