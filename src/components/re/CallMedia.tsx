import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, CalendarCheck, Check, CheckCheck, Mail, MessageCircle, Phone, PhoneIncoming } from "lucide-react";
import { Frame } from "./ScrollDemo";

function Wave({ bars = 28 }: { bars?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex h-10 items-center justify-center gap-[3px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.span key={i} className="w-[3px] rounded-full bg-accent" style={{ height: 8 }}
          animate={reduce ? { height: 8 } : { height: [6, 10 + ((i * 7) % 26), 6] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: (i % 7) * 0.08, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

function useTimer() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(id);
  }, []);
  return `00:${String(s % 60).padStart(2, "0")}`;
}

export function IncomingCall() {
  const [picked, setPicked] = useState(false);
  const t = useTimer();
  useEffect(() => {
    const id = setTimeout(() => setPicked(true), 1600);
    return () => clearTimeout(id);
  }, []);
  return (
    <Frame label="ai-agent / live line">
      <div className="flex flex-col items-center gap-4 py-8">
        <span className={`relative grid h-16 w-16 place-items-center rounded-full ${picked ? "bg-success text-ink" : "bg-accent text-accent-foreground"}`}>
          {!picked && <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />}
          {picked ? <Phone className="h-7 w-7" /> : <PhoneIncoming className="h-7 w-7" />}
        </span>
        <p className="font-display text-xl">+1 (555) 014-2290</p>
        <motion.p key={String(picked)} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-xs text-ink-muted">
          {picked ? (<><Bot className="h-3.5 w-3.5 text-accent" />AI agent answered · {t}</>) : "Ringing · after hours · Rentals line"}
        </motion.p>
        {picked && <Wave />}
      </div>
    </Frame>
  );
}

const lines: [string, string][] = [
  ["ai", "Good evening, Harbour Realty. How can I help?"],
  ["c", "Is Harbour View 12B still available?"],
  ["ai", "Yes — 2 bed, $1,600 a month. When would you like to move in?"],
  ["c", "Early December. Budget up to $1,700."],
  ["ai", "Great fit. Can I book you a viewing this Saturday?"],
];

export function LiveConversation() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? lines.length : 1);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setN((v) => (v >= lines.length ? 1 : v + 1)), 1400);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <Frame label="ai-agent / live transcript">
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-success"><span className="h-2 w-2 animate-pulse rounded-full bg-success" />Live call</span>
        <div className="w-32"><Wave bars={16} /></div>
      </div>
      <div className="space-y-2.5 text-sm">
        {lines.slice(0, n).map(([w, m], i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${w === "c" ? "justify-end" : ""}`}>
            {w === "ai" && <Bot className="mt-1 h-4 w-4 shrink-0 text-accent" />}
            <p className={`max-w-[78%] rounded-xl px-3 py-2 ${w === "ai" ? "bg-ink-3" : "bg-accent text-accent-foreground"}`}>{m}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {["Budget ✓", "Move-in ✓", "Unit 12B ✓"].map((c, i) => (
          <motion.span key={c} className="rounded-md bg-ink-3 px-2.5 py-1" animate={{ opacity: n > i + 1 ? 1 : 0.3 }}>{c}</motion.span>
        ))}
      </div>
    </Frame>
  );
}

export function LiveBooking() {
  return (
    <Frame label="ai-agent / booking">
      <p className="eyebrow text-ink-muted">Agent calendar · Saturday</p>
      <div className="mt-3 space-y-2">
        {["09:00 — Busy", "10:00 — Busy", "11:00 — Open", "13:00 — Open"].map((r, i) => (
          <motion.div key={r} className="relative overflow-hidden rounded-lg bg-ink-3 px-4 py-3 text-sm text-ink-muted"
            initial={false}>
            {i === 2 && (
              <motion.div className="absolute inset-0 flex items-center gap-2 bg-accent px-4 text-accent-foreground"
                initial={{ x: "-100%" }} animate={{ x: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <CalendarCheck className="h-4 w-4" />11:00 — Viewing · Harbour View 12B · J. Morales
              </motion.div>
            )}
            {r}
          </motion.div>
        ))}
      </div>
      <motion.p className="mt-4 flex items-center gap-2 text-xs text-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
        <Check className="h-3.5 w-3.5" />Slot locked — no double booking. Sending confirmations…
      </motion.p>
    </Frame>
  );
}

export function Confirmations() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="overflow-hidden rounded-[1.75rem] border border-ink-border bg-ink-2 p-2 shadow-float">
        <div className="rounded-[1.4rem] bg-ink p-3">
          <div className="flex items-center gap-2 border-b border-ink-border pb-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-success text-ink"><MessageCircle className="h-4 w-4" /></span>
            <div><p className="text-xs font-semibold">Harbour Realty</p><p className="text-[10px] text-ink-muted">WhatsApp · business</p></div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }}
            className="mt-3 rounded-xl rounded-tl-sm bg-ink-3 p-3 text-xs leading-relaxed">
            Hi J., your viewing is confirmed ✅<br />📍 Harbour View, Apt 12B<br />🗓 Sat · 11:00 with Sara K.
            <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-ink-muted">21:50 <CheckCheck className="h-3 w-3 text-accent" /></span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-2 flex gap-2">
            {["Reschedule", "Get directions"].map((b) => <span key={b} className="flex-1 rounded-lg border border-ink-border py-1.5 text-center text-[10px] text-accent">{b}</span>)}
          </motion.div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-float">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-xs text-muted-foreground"><Mail className="h-4 w-4 text-accent" />Inbox · just now</div>
        <div className="space-y-2 p-4">
          <p className="text-[11px] text-muted-foreground">From: Harbour Realty</p>
          <p className="font-display text-base leading-tight">Your viewing is confirmed</p>
          <div className="rounded-lg bg-secondary p-3 text-xs">Harbour View, Apt 12B<br />Saturday · 11:00<br />Agent: Sara K.</div>
          <div className="flex gap-2 pt-1 text-[11px]">
            <span className="rounded-md bg-primary px-3 py-1.5 text-primary-foreground">Add to calendar</span>
            <span className="rounded-md border border-border px-3 py-1.5">Reschedule</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
