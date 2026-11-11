import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition } from "framer-motion";
import { Bot, CalendarCheck, Check, CreditCard, FileSignature, Globe, LayoutDashboard, MapPin, PhoneIncoming } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  { t: "Property websites and marketplaces", d: "Listing sites that help buyers and renters find the right property faster.", c: ["Agency and developer websites", "Sales and rental listings", "Map search", "Advanced filters", "Saved searches", "Favorites", "Floor plans", "Photo galleries", "Virtual tours"] },
  { t: "Real-time booking", d: "Viewings booked against live availability, without the back-and-forth.", c: ["Live property and agent availability", "Calendar sync", "Instant or approval-based bookings", "Double-booking prevention", "In-person and virtual viewings", "Rescheduling", "Cancellations", "Reminders"] },
  { t: "AI call agents and messaging", d: "Every inquiry answered and qualified, even after hours.", c: ["After-hours call answering", "Property FAQs", "Lead qualification", "Viewing bookings", "Human handoff", "Call summaries in the CRM", "SMS, WhatsApp, or email follow-ups"] },
  { t: "CRM and brokerage operations", d: "One place to route leads, track deals, and see how each branch performs.", c: ["Lead capture and assignment", "Deal pipelines", "Follow-up tasks", "Agent activity", "Document tracking", "Commissions", "Branch reporting"] },
  { t: "Applications, leasing, and property management", d: "From application to renewal, with paperwork and maintenance handled online.", c: ["Online applications", "Screening integrations", "E-signatures", "Move-in checklists", "Unit and lease tracking", "Renewals", "Maintenance requests", "Vendor work orders", "Inspections"] },
  { t: "Payments and accounting integrations", d: "Collect rent and fees online and keep the books reconciled.", c: ["Rent, deposits, application fees", "Eligible reservation payments", "One-time and recurring payments", "Invoices and receipts", "Refunds", "Reconciliation", "Marketplace payouts where supported"] },
  { t: "Packages and monetization", d: "Revenue features we build into your platform for landlords and agencies.", c: ["Free trials", "Monthly and annual plans", "Tiered access", "Listing quotas", "Featured listings", "Paid add-ons", "Upgrades and renewals"] },
  { t: "Admin and client dashboards", d: "Each role sees the tools it needs — nothing more.", c: ["Admins: listing moderation, audit logs", "Agents & brokers: calendars, pipelines", "Owners & landlords: occupancy, statements", "Buyers & tenants: bookings, documents, payments, maintenance", "Vendors: work orders"] },
  { t: "Multilingual platforms and integrations", d: "Serve clients in their language and connect the tools you already use.", c: ["English, French, Arabic", "Arabic RTL layouts", "Translated listings and notifications", "Localized currency, date, number formats", "Map, CRM, calendar, telephony", "Accounting and payment integrations", "MLS or listing feeds where authorized"] },
];


const loop = (d = 0) => ({ duration: 2.4, repeat: Infinity, repeatDelay: 0.6, delay: d, ease: "easeInOut" as const });

function Visual({ i, still }: { i: number; still: boolean }) {
  const a = (anim: TargetAndTransition, d = 0) => (still ? {} : { animate: anim, transition: loop(d) });
  const card = "rounded-lg bg-ink-3 px-3 py-2 text-xs text-ink-foreground";
  switch (i) {
    case 0:
      return (
        <div className="relative h-full grid-lines rounded-lg bg-ink">
          {[["18%", "30%"], ["50%", "55%"], ["72%", "28%"], ["35%", "75%"]].map(([x, y], k) => (
            <motion.span key={k} className={`absolute rounded-full p-1.5 ${k === 1 ? "bg-accent text-accent-foreground" : "bg-ink-3 text-ink-foreground"}`} style={{ left: x, top: y }} {...a({ y: [0, -8, 0] }, k * 0.3)}>
              <MapPin className="h-3.5 w-3.5" />
            </motion.span>
          ))}
          <motion.div className="absolute bottom-4 left-4 right-4 rounded-lg bg-card p-3 text-xs text-card-foreground" {...a({ opacity: [0, 1, 1, 0], y: [12, 0, 0, 12] })}>Harbour View · $1,600/mo</motion.div>
        </div>
      );
    case 1:
      return (
        <div className="grid h-full grid-cols-4 content-center gap-2">
          {Array.from({ length: 12 }).map((_, k) => (
            <motion.div key={k} className={`rounded-md py-3 text-center font-mono text-[10px] ${k === 6 ? "bg-accent text-accent-foreground" : k % 3 === 0 ? "bg-ink text-ink-muted line-through" : "bg-ink-3 text-ink-foreground"}`} {...(k === 6 ? a({ scale: [1, 1.12, 1] }) : {})}>
              {["09:00", "10:30", "14:00"][k % 3]}
            </motion.div>
          ))}
          <motion.p className="col-span-4 mt-2 flex items-center gap-2 text-xs text-success" {...a({ opacity: [0, 1, 1, 0] }, 0.5)}><CalendarCheck className="h-4 w-4" />Booked — no conflicts</motion.p>
        </div>
      );
    case 2:
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          <div className="flex items-center gap-2 text-xs text-ink-muted"><PhoneIncoming className="h-4 w-4 text-accent" />Incoming · 21:47</div>
          {["Is 12B still available?", "Yes — want to book a viewing?", "Saturday works."].map((m, k) => (
            <motion.p key={m} className={`max-w-[80%] rounded-xl px-3 py-2 text-xs ${k === 1 ? "flex items-center gap-1 self-start bg-ink-3 text-ink-foreground" : "self-end bg-accent text-accent-foreground"}`} {...a({ opacity: [0, 1, 1, 0], x: [k === 1 ? -10 : 10, 0, 0, 0] }, k * 0.5)}>
              {k === 1 && <Bot className="h-3 w-3" />}{m}
            </motion.p>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="grid h-full grid-cols-3 gap-2">
          {["New", "Qualified", "Won"].map((c) => (
            <div key={c} className="rounded-lg bg-ink p-2"><p className="eyebrow text-ink-muted">{c}</p></div>
          ))}
          <motion.div className={`${card} col-start-1 row-start-1 mt-8 h-fit bg-accent text-accent-foreground`} {...a({ x: ["0%", "108%", "216%"] })}>Lead · J. Morales</motion.div>
        </div>
      );
    case 4:
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          {["Application", "Screening", "E-signature", "Move-in checklist"].map((s, k) => (
            <motion.div key={s} className={`${card} flex items-center justify-between`} {...a({ opacity: [0.35, 1, 1, 0.35] }, k * 0.4)}>
              {s}<Check className="h-3.5 w-3.5 text-success" />
            </motion.div>
          ))}
          <FileSignature className="h-5 w-5 self-end text-accent" />
        </div>
      );
    case 5:
      return (
        <div className="flex h-full flex-col justify-center gap-3">
          <div className={`${card} flex items-center gap-2`}><CreditCard className="h-4 w-4" />•••• 4242</div>
          <div className="h-2 overflow-hidden rounded-full bg-ink"><motion.div className="h-full bg-accent" style={{ width: still ? "100%" : undefined }} {...a({ width: ["0%", "100%", "100%"] })} /></div>
          <motion.p className="text-xs text-success" {...a({ opacity: [0, 0, 1] })}>Paid · Receipt #R-1048 · Reconciled</motion.p>
        </div>
      );
    case 6:
      return (
        <div className="grid h-full grid-cols-3 items-end gap-2">
          {[["Starter", 45], ["Pro", 75], ["Agency", 100]].map(([n, h], k) => (
            <motion.div key={n as string} className={`flex flex-col justify-end rounded-lg p-2 text-xs ${k === 1 ? "bg-accent text-accent-foreground" : "bg-ink-3 text-ink-foreground"}`} style={{ height: `${h}%` }} {...a({ scaleY: [0.85, 1, 0.85] }, k * 0.3)}>
              {n as string}
            </motion.div>
          ))}
        </div>
      );
    case 7:
      return (
        <div className="flex h-full flex-col justify-center gap-2">
          {["Admin", "Agent", "Owner", "Tenant", "Vendor"].map((r, k) => (
            <motion.div key={r} className={`${card} flex items-center gap-2`} {...a({ x: [0, 8, 0], opacity: [0.5, 1, 0.5] }, k * 0.35)}>
              <LayoutDashboard className="h-3.5 w-3.5 text-accent" />{r} view
            </motion.div>
          ))}
        </div>
      );
    default:
      return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Globe className="h-8 w-8 text-accent" />
          <div className="relative h-8 w-56 overflow-hidden text-center font-display text-lg text-ink-foreground">
            {["Book a viewing", "Réserver une visite", "احجز معاينة"].map((w, k) => (
              <motion.p key={w} className="absolute inset-0" initial={{ opacity: k === 0 ? 1 : 0 }} {...a({ opacity: k === 0 ? [1, 0, 0, 1] : k === 1 ? [0, 1, 0, 0] : [0, 0, 1, 0] })}>{w}</motion.p>
            ))}
          </div>
          <p className="font-mono text-[10px] text-ink-muted">EN · FR · AR (RTL)</p>
        </div>
      );
  }
}

export function Services() {
  const [open, setOpen] = useState("");
  const [seen, setSeen] = useState(0);
  const reduce = !!useReducedMotion();
  const idx = open ? services.findIndex((s) => s.t === open) : seen;
  const cur = services[idx] ?? services[0];

  return (
    <section id="services" className="scroll-mt-16 bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="eyebrow text-muted-foreground">What we build</p>
          <h2 className="mt-4 text-4xl font-light leading-tight md:text-5xl">Nine service groups, one connected platform.</h2>
          <p className="mt-5 max-w-md text-muted-foreground">Pick one piece or the whole journey. Open any group to see its main capabilities.</p>
          <div className="mt-8 hidden overflow-hidden rounded-2xl border border-ink-border bg-ink-2 shadow-float lg:block" aria-hidden>
            <div className="flex items-center justify-between border-b border-ink-border px-4 py-2.5">
              <span className="font-mono text-[10px] text-ink-muted">illustrative preview</span>
              <span className="font-mono text-[10px] text-accent">{String(idx + 1).padStart(2, "0")} / 09</span>
            </div>
            <div className="relative h-64 p-5">
              <AnimatePresence mode="wait">
                <motion.div key={idx} className="relative h-full" initial={{ opacity: 0, y: 16, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -16, filter: "blur(6px)" }} transition={{ duration: 0.4 }}>
                  <Visual i={idx} still={reduce} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="border-t border-ink-border px-4 py-3 text-sm text-ink-foreground">{cur?.t}</div>
          </div>
        </div>
        <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="border-t border-border">
          {services.map((s, i) => (
            <motion.div
              key={s.t}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              onViewportEnter={() => setSeen(i)}
              onMouseEnter={() => setSeen(i)}
            >
              <AccordionItem value={s.t} className={`relative border-border transition-colors ${idx === i ? "bg-card" : ""}`}>
                <motion.span className="absolute left-0 top-0 h-full w-0.5 origin-top bg-accent" animate={{ scaleY: idx === i ? 1 : 0 }} transition={{ duration: 0.4 }} />
                <AccordionTrigger className="gap-6 px-4 py-5 text-left hover:no-underline">
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block font-display text-xl font-normal md:text-2xl">{s.t}</span>
                      <span className="mt-1 block text-sm font-normal text-muted-foreground">{s.d}</span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-wrap gap-2 pb-2 pl-14 pr-4">
                    {s.c.map((c, k) => (
                      <motion.li key={c} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.04 }} className="rounded-full border border-border bg-background px-3 py-1 text-xs">{c}</motion.li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
