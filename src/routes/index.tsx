import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/re/SiteChrome";
import { Hero } from "@/components/re/Hero";
import { Services } from "@/components/re/Services";
import { Workflows } from "@/components/re/Workflows";
import { CaseStudy, ContactCta } from "@/components/re/CaseStudy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Real Estate Software Development | Eazisols" },
      { name: "description", content: "Eazisols builds custom real estate software: property marketplaces, real-time viewing booking, AI call agents, leasing, payments, and dashboards." },
      { property: "og:title", content: "Real Estate Software, From First Inquiry to Move-In | Eazisols" },
      { property: "og:description", content: "Custom software for brokerages, developers, property managers, and marketplace founders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Services />
        <Workflows />
        <CaseStudy />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  );
}
