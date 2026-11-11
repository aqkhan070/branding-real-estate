import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import pClient from "@/assets/primeliste/primeliste-client-section-image.avif";
import pChallenge from "@/assets/primeliste/primeliste-challenge-section-image-.avif";
import pHighlight1 from "@/assets/primeliste/primeliste-highlight-image-1.avif";
import pHighlight2 from "@/assets/primeliste/primeliste-highlight-image-2.avif";
import pHighlight3 from "@/assets/primeliste/primeliste-highlight-image-3.avif";
import sBanner from "@/assets/sukna/Banner.png";
import sProperties from "@/assets/sukna/Properties.png";
import sHome from "@/assets/sukna/Home.png";
import { CONTACT_URL, PRIMELISTE_CASE_URL, PRIMELISTE_LIVE_URL } from "./links";

const SUKNA_URL = "https://sukna.eazisols.com";

const primeGroups: { title: string; items: string[] }[] = [
  { title: "Marketplace", items: ["Public Property Marketplace", "Property Search and Filtering", "Detailed Property Listings", "Favourite Properties", "Inquiry Management", "Responsive User Experience"] },
  { title: "Landlords & tenants", items: ["Landlord Portal", "Property Management", "Tenant and Customer Accounts", "Rental Applications", "Rental Vouchers", "Landlord Verification"] },
  { title: "Monetization & payments", items: ["Subscription Packages", "Package Purchase and Renewal", "Payment and Receipt Management", "Property Sponsorship", "Keyword Sponsorship"] },
  { title: "Administration", items: ["Administrative Dashboard", "User Analytics", "Transaction Analytics", "User Management", "Roles and Permissions", "Package Administration", "Real Estate Administration", "Location Management", "Blog and Content Management", "Reports", "Contact Management", "Website Settings", "Multilingual and Regional Support"] },
];

type Slide = { src: string; label: string };

function Showcase({ slides, framed }: { slides: Slide[]; framed?: string }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % slides.length), 4200);
    return () => clearInterval(id);
  }, [slides.length, reduce]);
  const cur = slides[i] ?? slides[0];
  const view = (
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      <AnimatePresence initial={false}>
        <motion.img
          key={cur?.src}
          src={cur?.src}
          alt={cur?.label}
          className={`absolute inset-0 h-full w-full ${framed ? "object-cover object-top" : "object-cover"}`}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: reduce ? 1 : 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </AnimatePresence>
    </div>
  );
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-float">
        {framed && (
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="h-2 w-2 rounded-full bg-muted" /><span className="h-2 w-2 rounded-full bg-muted" /><span className="h-2 w-2 rounded-full bg-muted" />
            <span className="mx-auto font-mono text-[10px] text-muted-foreground">{framed}</span>
          </div>
        )}
        {view}
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Screenshots">
        {slides.map((s, k) => (
          <button key={s.src} type="button" role="tab" aria-selected={k === i} onClick={() => setI(k)}
            className={`relative overflow-hidden rounded-full border px-3 py-1 text-xs transition-colors ${k === i ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Feature({ t, d }: { t: string; d: number }) {
  return (
    <motion.li initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: d }}
      className="flex items-start gap-2 text-sm">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />{t}
    </motion.li>
  );
}

export function CaseStudy() {
  return (
    <section id="case-study" className="scroll-mt-16 bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="eyebrow text-muted-foreground">Live products · Built by Eazisols</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-light leading-tight md:text-5xl">Real platforms, running today.</h2>

        {/* PrimeListe */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-start">
          <Showcase slides={[
            { src: pClient, label: "Overview" },
            { src: pChallenge, label: "The challenge" },
            { src: pHighlight1, label: "Highlight 1" },
            { src: pHighlight2, label: "Highlight 2" },
            { src: pHighlight3, label: "Highlight 3" },
          ]} />
          <div>
            <p className="eyebrow text-accent">Case study 01</p>
            <h3 className="mt-2 text-3xl font-light md:text-4xl">PrimeListe</h3>
            <p className="mt-2 text-muted-foreground">A rental marketplace in Cameroon. Renters find properties and contact landlords; landlords publish listings and choose packages.</p>
            <div className="mt-6 space-y-5">
              {primeGroups.map((g) => (
                <div key={g.title}>
                  <p className="eyebrow mb-2 text-muted-foreground">{g.title}</p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {g.items.map((t, k) => <Feature key={t} t={t} d={k * 0.03} />)}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PRIMELISTE_CASE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Read the case study <ArrowUpRight className="h-4 w-4" /></a>
              <a href={PRIMELISTE_LIVE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold">Visit primeliste.com <ArrowUpRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        {/* Sukna */}
        <div className="mt-24 grid gap-12 border-t border-border pt-16 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <div className="lg:order-1">
            <p className="eyebrow text-accent">Case study 02</p>
            <h3 className="mt-2 text-3xl font-light md:text-4xl">Sukna (Arheboo)</h3>
            <p className="mt-2 text-muted-foreground">A bilingual real estate portal for Saudi Arabia, with properties for sale and rent, map search, agents, and new projects — in English and Arabic.</p>
            <ul className="mt-6 grid gap-1.5 sm:grid-cols-2">
              {["Buy and rent listings", "Map-based location search", "Find an agent", "New projects and commercial", "Property detail with map", "Wishlist / favourites", "Add property and packages", "English and Arabic (RTL)", "Multi-currency (SAR, USD…)", "News and buyer / renter guides"].map((t, k) => <Feature key={t} t={t} d={k * 0.03} />)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SUKNA_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Visit the platform <ArrowUpRight className="h-4 w-4" /></a>
              <a href={CONTACT_URL} className="inline-flex items-center gap-1 rounded-full border border-foreground/20 px-5 py-2.5 text-sm font-semibold">Build something similar</a>
            </div>
          </div>
          <div className="lg:order-2">
            <Showcase framed="sukna.eazisols.com" slides={[
              { src: sBanner, label: "Map search" },
              { src: sProperties, label: "Listings & filters" },
              { src: sHome, label: "Handpicked properties" },
            ]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-16 bg-ink py-24 text-ink-foreground md:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="eyebrow text-accent">Consultation</p>
        <h2 className="mt-4 text-4xl font-light leading-tight md:text-6xl">Tell us what your clients should be able to do.</h2>
        <p className="mx-auto mt-5 max-w-xl text-ink-muted">Brokerage, developer, property manager, or marketplace founder — we'll map the right software with you.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={CONTACT_URL} className="rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5">Discuss Your Project</a>
          <a href="#case-study" className="rounded-full border border-ink-border px-7 py-3.5 text-sm font-semibold hover:bg-ink-3">Explore Our Real Estate Work</a>
        </div>
      </div>
    </section>
  );
}
