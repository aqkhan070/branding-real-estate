import { CONTACT_URL } from "./links";

const BRAND_NAME = "Real Estate";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#workflows", label: "Workflows" },
  { href: "#case-study", label: "Case study" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-border bg-ink/70 text-ink-foreground backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="https://eazisols.com" className="font-display text-xl tracking-tight">
          {BRAND_NAME}<span className="text-accent">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-ink-muted transition-colors hover:text-ink-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={CONTACT_URL}
          className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
        >
          Discuss Your Project
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink-border bg-ink text-ink-muted">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-8">
        <p className="font-display text-lg text-ink-foreground">
          {BRAND_NAME}<span className="text-accent">.</span>
        </p>
        <div className="flex gap-6">
          <a href="https://eazisols.com" className="hover:text-ink-foreground">eazisols.com</a>
          <a href={CONTACT_URL} className="hover:text-ink-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}
