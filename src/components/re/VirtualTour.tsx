import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { Move, Rotate3D } from "lucide-react";
import pano from "@/assets/tour-panorama.jpg";

const spots = [
  { label: "Living room", at: 0.12 },
  { label: "Terrace view", at: 0.38 },
  { label: "Dining", at: 0.5 },
  { label: "Kitchen", at: 0.72 },
  { label: "Hallway", at: 0.92 },
];

export function VirtualTourPanel({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const p = useMotionValue(0.3); // 0..1 horizontal position in the panorama
  const pos = useTransform(p, (v) => `${v * 100}% 50%`);
  const prog = useTransform(p, (v) => `${Math.min(100, v * 100)}%`);
  const [active, setActive] = useState(1);
  const drag = useRef<{ x: number; v: number } | null>(null);
  const idle = useRef(true);
  const inView = useRef(true);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        inView.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = () => {
      if (inView.current && idle.current && !drag.current) p.set((p.get() + 0.0006) % 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [p, reduce]);

  useEffect(
    () =>
      p.on("change", (v) => {
        let best = 0;
        spots.forEach((s, i) => {
          if (Math.abs(s.at - v) < Math.abs((spots[best]?.at ?? 0) - v)) best = i;
        });
        setActive(best);
      }),
    [p],
  );

  const go = (i: number) => {
    idle.current = false;
    animate(p, spots[i]?.at ?? 0, { duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] });
    setTimeout(() => (idle.current = true), 4000);
  };

  return (
    <div
      ref={root}
      className={`overflow-hidden rounded-xl border border-ink-border bg-ink shadow-float ${className}`}
    >
      <motion.div
        role="img"
        aria-label="360° virtual tour of a sample apartment. Drag or use arrow keys to look around."
        tabIndex={0}
        className="relative aspect-[16/9] w-full cursor-grab touch-none overflow-hidden bg-ink outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-accent"
        style={{
          backgroundImage: `url(${pano})`,
          backgroundSize: "auto 100%",
          backgroundPosition: pos,
          backgroundRepeat: "repeat-x",
        }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, v: p.get() };
          idle.current = false;
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          const w = e.currentTarget.clientWidth;
          p.set(Math.min(1, Math.max(0, drag.current.v - (e.clientX - drag.current.x) / (w * 2))));
        }}
        onPointerUp={() => {
          drag.current = null;
          setTimeout(() => (idle.current = true), 3000);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(Math.min(spots.length - 1, active + 1));
          if (e.key === "ArrowLeft") go(Math.max(0, active - 1));
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-ink/45" />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] text-ink-foreground backdrop-blur">
            <Rotate3D className="h-3 w-3 text-accent" />
            360° tour · Harbour View, Apt 12B
          </span>
          <span className="flex items-center gap-1 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] text-ink-muted backdrop-blur">
            <Move className="h-3 w-3" />
            Drag to look
          </span>
        </div>

        <motion.p
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-4 left-3 font-display text-xl leading-none text-ink-foreground md:text-2xl"
        >
          {spots[active]?.label}
        </motion.p>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink-border">
          <motion.div className="h-full bg-accent" style={{ width: prog }} />
        </div>
      </motion.div>

      <div className="flex gap-1.5 overflow-x-auto bg-ink-2 p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {spots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => go(i)}
            aria-pressed={i === active}
            className={`shrink-0 rounded-full px-2.5 py-1.5 text-[10px] whitespace-nowrap transition-colors sm:px-3 sm:text-[11px] ${
              i === active
                ? "bg-accent text-accent-foreground"
                : "bg-ink-3 text-ink-foreground hover:bg-ink-border"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
