import { useState } from "react";
import { Bot, Check, CreditCard, FileSignature, MapPin, Phone, PhoneIncoming, Receipt, Search, UserRound } from "lucide-react";
import interior from "@/assets/listing-interior.jpg";
import bedroom from "@/assets/listing-bedroom.jpg";
import kitchen from "@/assets/listing-kitchen.jpg";
import exterior from "@/assets/listing-exterior.jpg";
import { Gallery, MapResults } from "./DemoMedia";
import { Confirmations, IncomingCall, LiveBooking, LiveConversation } from "./CallMedia";
import { Frame, ScrollDemo, type DemoStep } from "./ScrollDemo";

type Lang = "en" | "ar";
const T = {
  en: { search: "Search area or address", results: "12 rentals in view", listing: "Harbour View, Apt 12B", beds: "2 bed · 2 bath · 94 m²", price: "$1,600 / month", pick: "Choose a viewing time", book: "Book viewing", ok: "Viewing confirmed", when: "Thursday 14 Nov · 10:30", agent: "Agent: Sara K.", add: "Added to your calendar", days: ["Tue", "Wed", "Thu", "Fri"] },
  ar: { search: "ابحث عن منطقة أو عنوان", results: "١٢ عقارًا للإيجار في الخريطة", listing: "إطلالة الميناء، شقة ١٢ب", beds: "غرفتان · حمّامان · ٩٤ م²", price: "١٬٦٠٠ $ / شهريًا", pick: "اختر موعد المعاينة", book: "احجز المعاينة", ok: "تم تأكيد المعاينة", when: "الخميس ١٤ نوفمبر · ١٠:٣٠", agent: "الوكيلة: سارة ك.", add: "أُضيفت إلى تقويمك", days: ["الثلاثاء", "الأربعاء", "الخميس", "الجمعة"] },
};

const Chip = ({ children, on }: { children: React.ReactNode; on?: boolean }) => (
  <span className={`rounded-md px-2.5 py-1.5 text-xs ${on ? "bg-accent text-accent-foreground" : "bg-ink-3 text-ink-foreground"}`}>{children}</span>
);

function discover(lang: Lang): DemoStep[] {
  const t = T[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";
  const font = lang === "ar" ? { fontFamily: "'Noto Sans Arabic', var(--font-sans)" } : undefined;
  return [
    {
      title: "Search the map", caption: "Visitors filter by area and price and see matching rentals pinned live.",
      render: () => (
        <Frame label="marketplace / map" dir={dir}>
          <div style={font}>
            <div className="flex items-center gap-2 rounded-lg bg-ink-3 px-3 py-2 text-xs text-ink-muted"><Search className="h-3.5 w-3.5" />{t.search}</div>
            <MapResults photos={[interior, exterior, kitchen]} price={t.price} />
            <p className="mt-3 text-xs text-ink-muted">{t.results}</p>
          </div>
        </Frame>
      ),
    },
    {
      title: "Open a listing", caption: "Photos, floor plan, and key details open in one tap.",
      render: () => (
        <Frame label="marketplace / listing" dir={dir}>
          <div style={font} className="grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <Gallery photos={[interior, kitchen, bedroom, exterior]} />
            <div className="space-y-2">
              <p className="eyebrow text-ink-muted">Sample listing</p>
              <p className="font-display text-xl leading-tight">{t.listing}</p>
              <p className="text-xs text-ink-muted">{t.beds}</p>
              <p className="text-lg text-accent">{t.price}</p>
              <svg viewBox="0 0 120 70" className="mt-2 w-full rounded-md bg-ink p-2" aria-label="Floor plan sketch">
                <g className="fill-none stroke-ink-muted" strokeWidth="1">
                  <rect x="2" y="2" width="116" height="66" /><path d="M60 2v40M2 42h80M82 42v26M60 28h-20" />
                </g>
                <text x="12" y="24" className="fill-ink-muted" fontSize="6">Living</text>
                <text x="70" y="24" className="fill-ink-muted" fontSize="6">Bed 1</text>
                <text x="12" y="58" className="fill-ink-muted" fontSize="6">Kitchen</text>
                <text x="88" y="58" className="fill-ink-muted" fontSize="6">Bed 2</text>
              </svg>
            </div>
          </div>
        </Frame>
      ),
    },
    {
      title: "Pick a time", caption: "Only real, open slots appear — no double bookings.",
      render: () => (
        <Frame label="marketplace / booking" dir={dir}>
          <div style={font}>
            <p className="text-sm">{t.pick}</p>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {t.days.map((d, i) => (
                <div key={d} className="space-y-2">
                  <p className="text-center text-[11px] text-ink-muted">{d}</p>
                  {["09:00", "10:30", "14:00"].map((h, j) => (
                    <div key={h} className={`rounded-md py-2 text-center font-mono text-[11px] ${i === 2 && j === 1 ? "bg-accent text-accent-foreground" : (i + j) % 3 === 0 ? "bg-ink text-ink-muted line-through" : "bg-ink-3"}`}>{h}</div>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-accent py-2.5 text-center text-sm font-semibold text-accent-foreground">{t.book}</div>
          </div>
        </Frame>
      ),
    },
    {
      title: "Confirmation", caption: "The visitor and agent both get the confirmed viewing and reminders.",
      render: () => (
        <Frame label="marketplace / confirmed" dir={dir}>
          <div style={font} className="flex h-full flex-col items-center justify-center gap-3 py-4 text-center">
            <img src={exterior} alt="Sample building exterior" loading="lazy" width={1024} height={768} className="h-28 w-full rounded-lg object-cover" />
            <span className="grid h-14 w-14 place-items-center rounded-full bg-success/20 text-success"><Check className="h-7 w-7" /></span>
            <p className="font-display text-2xl">{t.ok}</p>
            <p className="text-sm text-ink-muted">{t.when}</p>
            <p className="text-sm text-ink-muted">{t.agent}</p>
            <Chip>{t.add}</Chip>
          </div>
        </Frame>
      ),
    },
  ];
}

const call: DemoStep[] = [
  { title: "Incoming call", caption: "A prospect calls at 9:47 pm — the AI agent picks up instantly.", render: () => <IncomingCall /> },
  { title: "AI answers and qualifies", caption: "It answers questions live and checks budget, timing, and needs.", render: () => <LiveConversation /> },
  { title: "Viewing booked", caption: "It locks an open slot on the agent's calendar during the call.", render: () => <LiveBooking /> },
  { title: "WhatsApp and email confirmation", caption: "The caller instantly gets the confirmation on WhatsApp and by email.", render: () => <Confirmations /> },
  {
    title: "Lead in the CRM", caption: "Lead details and a call summary land in the agent dashboard.",
    render: () => (
      <Frame label="crm / leads">
        <div className="grid gap-4 sm:grid-cols-[1fr_1.3fr]">
          <div className="space-y-2">
            {["New", "Qualified", "Viewing"].map((c, i) => (
              <div key={c} className="rounded-lg bg-ink-3 p-3">
                <p className="eyebrow text-ink-muted">{c}</p>
                {i === 2 && <p className="mt-2 rounded-md bg-accent px-2 py-1 text-xs text-accent-foreground">J. Morales · 12B</p>}
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-ink-border p-4 text-sm">
            <p className="flex items-center gap-2 font-semibold"><UserRound className="h-4 w-4" />J. Morales</p>
            <p className="mt-3 eyebrow text-accent">AI call summary</p>
            <p className="mt-1 text-ink-muted">Interested in 12B. Budget $1,700. Move-in early Dec. Viewing Sat 11:00. Ask about pets.</p>
            <p className="mt-3 flex items-center gap-1 text-xs text-ink-muted"><Phone className="h-3 w-3" />2m 41s · Recording attached</p>
          </div>
        </div>
      </Frame>
    ),
  },
];

const lease: DemoStep[] = [
  {
    title: "Submit an application", caption: "The renter applies online with documents attached.",
    render: () => (
      <Frame label="leasing / apply">
        <div className="space-y-3">
          {["Full name", "Employer", "Monthly income", "ID document"].map((f, i) => (
            <div key={f}>
              <p className="text-[11px] text-ink-muted">{f}</p>
              <div className="mt-1 rounded-md bg-ink-3 px-3 py-2 text-sm">{["Lina Haddad", "Northwind Studio", "$5,200", "passport.pdf ✓"][i]}</div>
            </div>
          ))}
          <div className="rounded-md bg-accent py-2 text-center text-sm font-semibold text-accent-foreground">Submit application</div>
        </div>
      </Frame>
    ),
  },
  {
    title: "Sign the lease", caption: "Approved applicants e-sign the lease from any device.",
    render: () => (
      <Frame label="leasing / e-sign">
        <div className="space-y-3 rounded-lg bg-background p-5 text-foreground">
          <p className="flex items-center gap-2 font-display text-lg"><FileSignature className="h-5 w-5" />Residential Lease — Unit 12B</p>
          <div className="space-y-1.5">{[90, 80, 95, 60].map((w) => <div key={w} className="h-2 rounded bg-muted" style={{ width: `${w}%` }} />)}</div>
          <div className="mt-4 border-b border-foreground pb-1 font-display text-2xl italic">Lina Haddad</div>
          <p className="text-xs text-muted-foreground">Signed · 14 Nov 2026</p>
        </div>
      </Frame>
    ),
  },
  {
    title: "Pay the deposit", caption: "Deposit and first month's rent are paid in one checkout.",
    render: () => (
      <Frame label="payments / checkout">
        <div className="space-y-3">
          {[["Security deposit", "$1,600"], ["First month rent", "$1,600"]].map(([a, b]) => (
            <div key={a} className="flex justify-between border-b border-ink-border pb-2 text-sm"><span className="text-ink-muted">{a}</span><span>{b}</span></div>
          ))}
          <div className="flex justify-between text-lg"><span>Total</span><span className="text-accent">$3,200</span></div>
          <div className="flex items-center gap-2 rounded-md bg-ink-3 px-3 py-2.5 text-sm"><CreditCard className="h-4 w-4" />•••• 4242</div>
          <div className="rounded-md bg-accent py-2.5 text-center text-sm font-semibold text-accent-foreground">Pay $3,200</div>
        </div>
      </Frame>
    ),
  },
  {
    title: "Receipt and status", caption: "The tenant sees the receipt; the admin sees the payment marked paid.",
    render: () => (
      <div className="grid gap-4 sm:grid-cols-2">
        <Frame label="tenant portal">
          <p className="flex items-center gap-2 text-sm font-semibold"><Receipt className="h-4 w-4 text-accent" />Receipt #R-1048</p>
          <p className="mt-3 font-display text-3xl">$3,200</p>
          <p className="text-xs text-ink-muted">Deposit + rent · Paid 14 Nov</p>
        </Frame>
        <Frame label="admin / payments">
          <div className="space-y-2 text-xs">
            {[["Unit 12B", "Paid"], ["Unit 7A", "Due"], ["Unit 3C", "Paid"]].map(([u, s], i) => (
              <div key={u} className={`flex justify-between rounded-md px-3 py-2 ${i === 0 ? "bg-success/20" : "bg-ink-3"}`}>
                <span>{u}</span><span className={s === "Paid" ? "text-success" : "text-accent"}>{s}</span>
              </div>
            ))}
          </div>
        </Frame>
      </div>
    ),
  },
];

export function Workflows() {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = (
    <div role="group" aria-label="Demo language" className="inline-flex rounded-full border border-ink-border p-1">
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${lang === l ? "bg-accent text-accent-foreground" : "text-ink-muted hover:text-ink-foreground"}`}
        >
          {l === "en" ? "English" : "العربية"}
        </button>
      ))}
    </div>
  );

  return (
    <section id="workflows" className="scroll-mt-16 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
        <p className="eyebrow text-accent">Cinematic workflows</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-light leading-tight md:text-5xl">See how the pieces work together.</h2>
        <p className="mt-4 max-w-xl text-ink-muted">Three illustrative demos with sample data. Scroll through each to watch it play out.</p>
      </div>
      <ScrollDemo id="demo-discover" index="01" title="Discover and book" intro="Map search to confirmed viewing. Switch to Arabic to see the layout flip right to left." steps={discover(lang)} toolbar={toggle} />
      <ScrollDemo id="demo-call" index="02" title="AI call to CRM" intro="An AI agent picks up, books a viewing, confirms on WhatsApp and email, and logs the lead." steps={call} />
      <ScrollDemo id="demo-lease" index="03" title="Lease and manage" intro="Application, signature, and payment — tracked for tenant and admin." steps={lease} />
    </section>
  );
}
