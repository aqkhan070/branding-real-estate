import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart, MapPin } from "lucide-react";

export function Gallery({ photos }: { photos: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % photos.length), 2200);
    return () => clearInterval(id);
  }, [photos.length, reduce]);
  return (
    <div>
      <div className="relative h-48 overflow-hidden rounded-lg">
        <AnimatePresence initial={false}>
          <motion.img key={i} src={photos[i]} alt="Sample listing photo" width={1024} height={768} className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} />
        </AnimatePresence>
        <span className="absolute bottom-2 end-2 rounded-full bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-ink-foreground">{i + 1} / {photos.length}</span>
        <span className="absolute end-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-accent"><Heart className="h-3.5 w-3.5" /></span>
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {photos.map((p, k) => (
          <button key={p} type="button" onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`overflow-hidden rounded-md ring-2 transition ${k === i ? "ring-accent" : "ring-transparent opacity-60"}`}>
            <img src={p} alt="" loading="lazy" width={1024} height={768} className="h-10 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function MapResults({ photos, price }: { photos: string[]; price: string }) {
  const pins: [string, string][] = [["18%", "28%"], ["52%", "48%"], ["74%", "22%"], ["32%", "72%"], ["82%", "66%"]];
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-[1.5fr_1fr]">
      <div className="relative h-56 overflow-hidden rounded-lg grid-lines bg-ink">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path d="M0 62 C 25 55, 40 72, 60 50 S 90 40, 100 45" className="fill-none stroke-ink-muted/40" strokeWidth="0.8" />
          <path d="M34 0 L 40 100" className="fill-none stroke-ink-muted/25" strokeWidth="0.5" />
        </svg>
        {pins.map(([x, y], k) => (
          <motion.span key={k} className={`absolute rounded-full p-1.5 ${k === 1 ? "bg-accent text-accent-foreground" : "bg-ink-3 text-ink-foreground"}`} style={{ insetInlineStart: x, top: y }}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 * k, type: "spring" }}>
            <MapPin className="h-3 w-3" />
          </motion.span>
        ))}
        <motion.span className="absolute h-10 w-10 rounded-full border border-accent" style={{ insetInlineStart: "calc(52% - 13px)", top: "calc(48% - 13px)" }}
          animate={{ scale: [0.6, 1.6], opacity: [0.8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
      </div>
      <div className="space-y-2">
        {photos.map((p, k) => (
          <motion.div key={p} className={`flex gap-2 rounded-lg p-1.5 ${k === 0 ? "bg-ink-3 ring-1 ring-accent" : "bg-ink-3/60"}`}
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + k * 0.12 }}>
            <img src={p} alt="" loading="lazy" width={1024} height={768} className="h-12 w-16 rounded object-cover" />
            <div className="text-[11px]"><p className="text-accent">{price}</p><p className="text-ink-muted">2 · 2 · 94 m²</p></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
