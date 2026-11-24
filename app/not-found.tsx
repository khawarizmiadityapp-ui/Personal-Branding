import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-bg-primary pt-24 pb-16">
      <div className="editorial-container max-w-2xl space-y-6 text-center">
        <p className="mono-label text-accent">ERROR 404 // ROUTE NOT FOUND</p>
        <h1 className="display-section text-text-primary">PAGE UNAVAILABLE.</h1>
        <p className="text-base leading-relaxed text-text-secondary">
          The page or project record you requested does not exist in this portfolio.
        </p>
        <div className="pt-2">
          <LinkButton href="/" variant="primary" size="md">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
