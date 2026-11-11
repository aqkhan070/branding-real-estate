import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import heroImg from "@/assets/hero-architecture.jpg";
import interior from "@/assets/listing-interior.jpg";
import { CONTACT_URL } from "./links";
import { VirtualTourPanel } from "./VirtualTour";

const pins = [
  { x: "22%", y: "38%" },
  { x: "41%", y: "62%" },
  { x: "58%", y: "30%" },
  { x: "70%", y: "55%" },
  { x: "33%", y: "74%" },
];

function MapLayer() {
  return (
    <div className="absolute inset-0 grid-lines bg-ink-2">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <path d="M0 60 C 25 55, 40 70, 60 50 S 90 40, 100 45" className="fill-none stroke-ink-muted/40" strokeWidth="0.6" />
        <path d="M30 0 L 38 100" className="fill-none stroke-ink-muted/25" strokeWidth="0.4" />
        <path d="M0 25 L 100 35" className="fill-none stroke-ink-muted/25" strokeWidth="0.4" />
        <path d="M65 0 C 60 40, 75 70, 70 100" className="fill-none stroke-ink-muted/25" strokeWidth="0.4" />
      </svg>
      {pins.map((p, i) => (
        <span
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 font-mono text-[10px] ${
            i === 2 ? "bg-accent text-accent-foreground shadow-float" : "bg-ink-3 text-ink-foreground"
          }`}
          style={{ left: p.x, top: p.y }}
        >
          {["$1.2k", "$980", "$1.6k", "$2.1k", "$1.1k"][i]}
        </span>
      ))}
    </div>
  );
}

function ListingCard() {
  return (
    <div className="w-72 overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-float">
      <img src={interior} alt="" width={1280} height={896} className="h-36 w-full object-cover" />
      <div className="space-y-2 p-4">
        <p className="eyebrow text-muted-foreground">Sample listing</p>
        <p className="font-display text-lg leading-tight">Harbour View, Apt 12B</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" />Waterfront district</p>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><BedDouble className="h-3 w-3" />2</span>
          <span className="flex items-center gap-1"><Bath className="h-3 w-3" />2</span>
          <span className="flex items-center gap-1"><Ruler className="h-3 w-3" />94 m²</span>
        </div>
      </div>
    </div>
  );
}

function Confirmation() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-card-foreground shadow-float">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-success/15 text-success"><CalendarCheck className="h-5 w-5" /></span>
      <div>
        <p className="text-sm font-semibold">Viewing confirmed</p>
        <p className="text-xs text-muted-foreground">Thu · 10:30 · with agent Sara</p>
      </div>
    </div>
  );
}

function Copy() {
  return (
    <div className="relative z-10 flex w-full flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
      <div className="max-w-2xl">
        <p className="eyebrow mb-5 text-accent">Eazisols · Real Estate Technology</p>
        <h1 className="text-4xl font-light leading-[1.05] text-ink-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Real Estate Software, From First Inquiry to Move-In.
        </h1>
        <p className="mt-6 max-w-xl text-base text-ink-muted md:text-lg">
          We build property marketplaces, real-time viewing systems, AI call agents, payment workflows, and dashboards for real estate teams and their clients.
        </p>
        <p className="mt-3 text-sm text-ink-muted">For brokerages, developers, property managers, and marketplace founders.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={CONTACT_URL} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5">
            Discuss Your Project
          </a>
          <a href="#workflows" className="rounded-full border border-ink-border px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink-3">
            Explore Our Real Estate Work
          </a>
        </div>
      </div>
      <VirtualTourPanel className="w-full max-w-md shrink-0 lg:w-[340px] xl:w-[400px]" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const imgScale = useTransform(p, [0, 0.45], [1.15, 1]);
  const imgOpacity = useTransform(p, [0.25, 0.5], [1, 0]);
  const copyOpacity = useTransform(p, [0, 0.3], [1, 0]);
  const copyY = useTransform(p, [0, 0.3], [0, -60]);
  const mapOpacity = useTransform(p, [0.3, 0.5], [0, 1]);
  const cardY = useTransform(p, [0.5, 0.68], [80, 0]);
  const cardOpacity = useTransform(p, [0.5, 0.65], [0, 1]);
  const okY = useTransform(p, [0.72, 0.88], [30, 0]);
  const okOpacity = useTransform(p, [0.72, 0.85], [0, 1]);
  const capOpacity = useTransform(p, [0.4, 0.55], [0, 1]);

  if (reduce) {
    return (
      <section className="relative overflow-hidden bg-ink px-5 pb-20 pt-32 md:px-8">
        <img src={heroImg} alt="Modern residential tower at dusk" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-veil" />
        <div className="relative mx-auto max-w-7xl"><Copy /></div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[260vh] bg-ink" aria-label="Introduction">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity: mapOpacity }}>
          <MapLayer />
        </motion.div>
        <motion.img
          src={heroImg}
          alt="Modern residential tower at dusk"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ scale: imgScale, opacity: imgOpacity }}
        />
        <motion.div className="absolute inset-0 bg-veil" style={{ opacity: imgOpacity }} />

        <motion.div className="absolute inset-0 mx-auto flex max-w-7xl items-end px-5 pb-20 md:items-center md:px-8 md:pb-0" style={{ opacity: copyOpacity, y: copyY }}>
          <Copy />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <motion.div style={{ y: cardY, opacity: cardOpacity }}>
              <ListingCard />
            </motion.div>
            <motion.div className="absolute -bottom-8 left-1/2 w-max -translate-x-1/2 md:-right-40 md:left-auto md:translate-x-0" style={{ y: okY, opacity: okOpacity }}>
              <Confirmation />
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-7xl justify-between px-5 md:px-8" style={{ opacity: capOpacity }}>
          <p className="eyebrow text-ink-muted">Map search → listing → confirmed viewing</p>
          <a href={CONTACT_URL} className="pointer-events-auto eyebrow text-accent hover:underline">Discuss your project →</a>
        </motion.div>
      </div>
    </section>
  );
}
