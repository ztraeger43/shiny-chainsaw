import Link from "next/link";

const techPillars = [
  {
    number: "01",
    title: "All-Natural Antimicrobial Synergy",
    desc: "MattressFresh combines thyme extract, tea tree oil, and colloidal silver in precise ratios that create a synergistic antimicrobial effect far stronger than any individual ingredient. These compounds disrupt bacterial cell membranes and interfere with pathogen reproduction at the molecular level — without any synthetic biocides.",
    stat: "99.9%",
    statLabel: "Pathogen Elimination Rate",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#2ab8b8" strokeWidth="2" />
        <path d="M24 12 L32 18 L32 30 L24 36 L16 30 L16 18 Z" stroke="#2ab8b8" strokeWidth="1.5" fill="#2ab8b8" fillOpacity="0.1" />
        <path d="M20 24 L23 27 L29 21" stroke="#2ab8b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Dust Mite Disruption Technology",
    desc: "Our formula targets the exoskeletal proteins of dust mites and their fecal matter — the primary allergenic trigger in most mattresses. Eucalyptus oil compounds penetrate deep into mattress fibers, reaching the core layers where dust mites colonize, neutralizing them on contact and leaving a residual barrier that prevents re-infestation for up to 30 days.",
    stat: "30 Days",
    statLabel: "Residual Protection",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#2ab8b8" strokeWidth="2" />
        <circle cx="24" cy="24" r="8" stroke="#e53e3e" strokeWidth="1.5" />
        <line x1="18" y1="18" x2="30" y2="30" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="18" x2="18" y2="30" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Enzymatic Odor Neutralization",
    desc: "Unlike air fresheners that merely mask odors, MattressFresh uses a proprietary enzyme blend that chemically breaks down the volatile organic compounds (VOCs) responsible for odor. Proteins from sweat, bacteria metabolites, and ambient pollutants are catalytically degraded at the molecular level, permanently eliminating the source rather than covering it up.",
    stat: "Zero",
    statLabel: "Odors Masked (All Eliminated)",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#2ab8b8" strokeWidth="2" />
        <path d="M16 32 Q24 12 32 32" stroke="#2ab8b8" strokeWidth="1.5" fill="none" />
        <circle cx="18" cy="26" r="3" fill="#2ab8b8" opacity="0.5" />
        <circle cx="30" cy="22" r="2" fill="#2ab8b8" opacity="0.35" />
        <circle cx="24" cy="16" r="1.5" fill="#2ab8b8" opacity="0.25" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Foam-Safe Zero-VOC Architecture",
    desc: "Traditional cleaning products contain alcohols and solvents that degrade the cell structure of memory foam, shortening mattress life and releasing off-gassing compounds. MattressFresh's proprietary base is formulated at a pH range of 6.8–7.2 — chemically neutral — and uses water-based carrier molecules that evaporate completely without penetrating foam polymer chains.",
    stat: "0 VOC",
    statLabel: "Volatile Organic Compounds",
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#2ab8b8" strokeWidth="2" />
        <rect x="14" y="20" width="20" height="14" rx="3" stroke="#2ab8b8" strokeWidth="1.5" />
        <rect x="18" y="24" width="12" height="7" rx="1.5" fill="#2ab8b8" fillOpacity="0.25" />
        <path d="M19 20 L19 16 M29 20 L29 16" stroke="#2ab8b8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const certifications = [
  { label: "All-Natural Certified", desc: "100% plant-derived and mineral-based ingredients" },
  { label: "Zero VOC", desc: "No volatile organic compounds or off-gassing" },
  { label: "Foam-Safe Tested", desc: "Certified safe for memory foam, latex, and hybrid cores" },
  { label: "Child & Pet Safe", desc: "Non-toxic once dry — safe for your whole family" },
  { label: "Cruelty-Free", desc: "Never tested on animals" },
  { label: "Made in USA", desc: "Formulated and bottled in our certified facility" },
];

const faqs = [
  {
    q: "How often should I apply MattressFresh?",
    a: "We recommend applying every 2–4 weeks for residential use. Airbnb hosts and hotel operators typically apply between every guest stay for maximum hygiene.",
  },
  {
    q: "How long does it take to dry?",
    a: "MattressFresh dries fully in approximately 15–20 minutes. We recommend allowing 30 minutes before putting sheets back on for best results.",
  },
  {
    q: "Is it safe for children and pets?",
    a: "Yes. Once dry, all ingredients are completely non-toxic and safe. We use only food-grade essential oils and pharmaceutical-grade purified water.",
  },
  {
    q: "Will it damage my memory foam mattress?",
    a: "No — that's one of our core design principles. Our zero-VOC, pH-neutral formula is specifically engineered not to interact with foam polymer chains.",
  },
  {
    q: "Does it work on pillows and cushions too?",
    a: "Absolutely. MattressFresh works on any foam or fiber-filled item — pillows, cushions, pet beds, sofa cushions, and more.",
  },
];

export default function TechPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2044] to-[#0d3d4a] py-24 px-6 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">The Science</p>
          <h1 className="text-5xl font-bold mb-6">Technology Behind the Formula</h1>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            MattressFresh isn&apos;t just a spray — it&apos;s a precision-engineered biological cleaning system built on four pillars of natural chemistry. Here&apos;s how it works.
          </p>
        </div>
      </section>

      {/* Tech Pillars */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-24">
          {techPillars.map((t, i) => (
            <div
              key={t.number}
              className={`flex flex-col lg:flex-row gap-12 items-start ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="lg:w-1/3">
                <div className="sticky top-24">
                  <div className="inline-flex items-center gap-3 mb-4">
                    {t.icon}
                    <span className="text-6xl font-black text-[#2ab8b8]/20">{t.number}</span>
                  </div>
                  <div className="bg-[#f7f9fc] rounded-2xl p-6 border border-gray-100 mt-4">
                    <div className="text-4xl font-bold text-[#2ab8b8]">{t.stat}</div>
                    <div className="text-gray-500 text-sm mt-1">{t.statLabel}</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h2 className="text-3xl font-bold text-[#0f2044] mb-4">{t.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{t.desc}</p>

                {/* Visual bar */}
                <div className="mt-8 h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#2ab8b8] to-[#0f2044] w-full rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-[#f7f9fc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">3 Simple Steps to a Cleaner Mattress</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Spray", desc: "Hold 8–12 inches away and apply an even mist across the entire mattress surface. For deep sanitation, apply slightly more to high-contact areas." },
              { step: "2", title: "Wait 15 Min", desc: "Let MattressFresh work. The enzymatic formula breaks down odors and the antimicrobial agents neutralize pathogens. No wiping required." },
              { step: "3", title: "Sleep Better", desc: "Replace your sheets and sleep on a cleaner, fresher mattress. Repeat every 2–4 weeks or between guest stays." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 rounded-full bg-[#0f2044] text-white text-xl font-black flex items-center justify-center mx-auto mb-5">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-[#0f2044] mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 px-6 bg-[#0f2044] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">Certifications</p>
            <h2 className="text-4xl font-bold">Tested. Certified. Trusted.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((c) => (
              <div key={c.label} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#2ab8b8]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-[#2ab8b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white">{c.label}</h3>
                  <p className="text-white/60 text-sm mt-0.5">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-[#f7f9fc] rounded-2xl border border-gray-100 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#0f2044] select-none">
                  {f.q}
                  <svg className="w-5 h-5 text-[#2ab8b8] shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gradient-to-br from-[#0f2044] to-[#0d3d4a] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Ready to Experience the Science?</h2>
          <p className="text-white/70 mb-6">Shop MattressFresh and feel the difference a natural formula makes.</p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white font-bold rounded-full transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
