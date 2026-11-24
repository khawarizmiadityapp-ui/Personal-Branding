import type { Metadata } from "next";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} for web and mobile software development collaborations.`,
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-border-subtle bg-bg-primary py-16 md:py-24">
        <div className="editorial-container space-y-6">
          <div className="flex items-center gap-3">
            <span className="mono-label text-accent">CONTACT</span>
            <span className="h-px w-8 bg-border-subtle" aria-hidden="true" />
            <span className="mono-label text-text-secondary">COLLABORATION &amp; INQUIRIES</span>
          </div>
          <h1 className="display-hero max-w-4xl text-text-primary">
            {profile.contact.heading}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            {profile.contact.invitation}
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-16 md:py-24">
        <div className="editorial-container grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-border-subtle bg-bg-secondary p-8 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>Direct Email</span>
              </div>
              <p className="font-display text-2xl font-bold tracking-tight text-text-primary break-all md:text-3xl">
                {profile.contact.emailPlaceholder}
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                No backend or form endpoint is introduced in this initial version. Update
                your verified email address in{" "}
                <code className="font-mono text-xs text-text-primary">data/profile.ts</code>{" "}
                to enable direct mailto contact.
              </p>
            </div>

            <div className="border border-border-subtle bg-bg-secondary p-8 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-text-secondary">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                <span>Location &amp; Availability</span>
              </div>
              <p className="font-display text-xl font-semibold text-text-primary">
                {profile.location}
              </p>
              <p className="text-sm text-text-secondary">{profile.availability}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="border border-border-subtle bg-bg-secondary">
              <div className="border-b border-border-subtle px-6 py-4">
                <p className="mono-label text-accent">Social Profiles</p>
              </div>
              <div className="divide-y divide-border-subtle">
                {profile.contact.socials.map((social) => (
                  <div
                    key={social.label}
                    className="flex items-center justify-between gap-4 px-6 py-5"
                  >
                    <div>
                      <p className="font-display text-lg font-semibold uppercase text-text-primary">
                        {social.label}
                      </p>
                      <p className="mt-1 font-mono text-xs text-text-secondary">
                        {social.href ? social.handle : social.placeholder}
                      </p>
                    </div>
                    {social.href ? (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-10 items-center justify-center border border-border-subtle text-text-primary transition-colors hover:border-accent hover:text-accent"
                        aria-label={`Open ${social.label}`}
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="border border-border-subtle px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary">
                        Editable
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <LinkButton href="/work" variant="primary" size="md">
                <span>Explore Selected Works</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/about" variant="secondary" size="md">
                <span>About Me</span>
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
