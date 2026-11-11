import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

export type DemoStep = { caption: string; title: string; render: () => ReactNode };

function useWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export function Frame({ children, label, dir = "ltr" }: { children: ReactNode; label: string; dir?: "ltr" | "rtl" }) {
  return (
    <div dir={dir} className="overflow-hidden rounded-2xl border border-ink-border bg-ink-2 text-ink-foreground shadow-float">
      <div className="flex items-center gap-2 border-b border-ink-border px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-ink-3" />
        <span className="h-2 w-2 rounded-full bg-ink-3" />
        <span className="h-2 w-2 rounded-full bg-ink-3" />
        <span className="mx-auto font-mono text-[10px] text-ink-muted">{label}</span>
      </div>
      <div className="min-h-[340px] p-5">{children}</div>
    </div>
  );
}

export function ScrollDemo({
  id,
  index,
  title,
  intro,
  steps,
  toolbar,
}: {
  id: string;
  index: string;
  title: string;
  intro: string;
  steps: DemoStep[];
  toolbar?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useWide();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length))));
  });

  const header = (
    <div className="max-w-md">
      <p className="eyebrow text-accent">Workflow {index} · Illustrative demo</p>
      <h3 className="mt-3 text-3xl font-light leading-tight text-ink-foreground md:text-4xl">{title}</h3>
      <p className="mt-3 text-sm text-ink-muted">{intro}</p>
      {toolbar && <div className="mt-5">{toolbar}</div>}
    </div>
  );

  if (reduce || !wide) {
    return (
      <div id={id} ref={ref} className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        {header}
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.title} className="space-y-3">
              <p className="eyebrow text-ink-muted">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {s.title}
              </p>
              {s.render()}
              <p className="text-sm text-ink-muted">{s.caption}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div id={id} ref={ref} style={{ height: `${steps.length * 85}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_1.35fr] items-center gap-16 px-8">
          <div>
            {header}
            <ol className="mt-10 space-y-4" aria-label={`${title} steps`}>
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="relative mt-1 h-10 w-px bg-ink-border">
                    <motion.span
                      className="absolute inset-x-0 top-0 bg-accent"
                      animate={{ height: i < active ? "100%" : i === active ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  </span>
                  <div className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}>
                    <p className="eyebrow text-ink-muted"><span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {s.title}</p>
                    <p className="mt-1 text-sm text-ink-foreground">{s.caption}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, scale: 0.98, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {steps[active]?.render()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
