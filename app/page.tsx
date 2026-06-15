"use client";

import { useState } from "react";
import Link from "next/link";

const benefits = [
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#2ab8b8" strokeWidth="2" />
        <path d="M20 10 L28 16 L28 26 L20 30 L12 26 L12 16 Z" stroke="#2ab8b8" strokeWidth="1.5" fill="#2ab8b8/10" />
        <path d="M15 20 L18 23 L25 16" stroke="#2ab8b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Sanitizes & Protects",
    desc: "All-natural formula eliminates 99.9% of harmful bacteria and germs without harsh chemicals.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#2ab8b8" strokeWidth="2" />
        <circle cx="20" cy="20" r="8" stroke="#e53e3e" strokeWidth="1.5" />
        <line x1="14" y1="14" x2="26" y2="26" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 20 Q20 16 23 20 Q20 24 17 20Z" stroke="#2ab8b8" strokeWidth="1" fill="none" />
      </svg>
    ),
    title: "Eliminates Dust Mites & Pests",
    desc: "Naturally targets and neutralizes dust mites, bed bugs, and other microscopic pests.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#2ab8b8" strokeWidth="2" />
        <path d="M14 28 Q20 10 26 28" stroke="#2ab8b8" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="22" r="2" fill="#2ab8b8" opacity="0.6" />
        <circle cx="24" cy="18" r="1.5" fill="#2ab8b8" opacity="0.4" />
        <circle cx="20" cy="14" r="1" fill="#2ab8b8" opacity="0.3" />
      </svg>
    ),
    title: "Removes Odors & Adds Fragrance",
    desc: "Eliminates deep-set odors and replaces them with a clean, calming natural scent.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
        <circle cx="20" cy="20" r="19" stroke="#2ab8b8" strokeWidth="2" />
        <rect x="12" y="16" width="16" height="12" rx="2" stroke="#2ab8b8" strokeWidth="1.5" />
        <rect x="15" y="19" width="10" height="6" rx="1" fill="#2ab8b8" opacity="0.3" />
        <path d="M16 16 L16 13 M24 16 L24 13" stroke="#2ab8b8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Foam-Safe Architecture",
    desc: "Zero VOC formula is completely safe for all memory foam, latex, and hybrid mattresses.",
  },
];

const stats = [
  { value: "99.9%", label: "Bacteria Eliminated" },
  { value: "Zero", label: "VOC Chemicals" },
  { value: "100%", label: "All-Natural Ingredients" },
  { value: "3", label: "Size Options" },
];

const testimonials = [
  {
    quote: "Finally a product that actually works! My allergies have been so much better since using MattressFresh every two weeks.",
    name: "Sarah M.",
    role: "Verified Buyer",
  },
  {
    quote: "As an Airbnb host, this is my secret weapon. Guests always comment on how fresh and clean the beds feel.",
    name: "James K.",
    role: "Airbnb Superhost",
  },
  {
    quote: "The commercial size is perfect for our hotel chain. The natural scent is subtle and guests love it.",
    name: "Patricia L.",
    role: "Hotel Operations Manager",
  },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0f2044] via-[#1a3260] to-[#0d3d4a] min-h-[90vh] flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#2ab8b8] blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#2ab8b8] blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left: copy */}
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-[#2ab8b8]/20 border border-[#2ab8b8]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2ab8b8] animate-pulse" />
              <span className="text-[#2ab8b8] text-sm font-medium">All-Natural Formula</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Revitalize Your Mattress.
              <br />
              <span className="text-[#2ab8b8]">Rest Your Soul.</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-lg">
              MattressFresh is the all-natural core vitalizer designed for every sleep environment —
              from your home to hotels to Airbnbs. Clean deeper. Sleep better.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white font-bold rounded-full transition-all shadow-lg shadow-[#2ab8b8]/30 hover:shadow-[#2ab8b8]/50 hover:-translate-y-0.5"
              >
                Shop the Collection
              </Link>
              <Link
                href="/tech"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all hover:-translate-y-0.5"
              >
                See the Science
              </Link>
            </div>
            <div className="mt-10 flex gap-8">
              {stats.slice(0, 2).map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-[#2ab8b8]">{s.value}</div>
                  <div className="text-white/50 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: product visual */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative w-full max-w-sm">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#2ab8b8]/20 blur-3xl rounded-full scale-75" />

              {/* Bottles visual */}
              <div className="relative flex items-end justify-center gap-6">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-32 bg-gradient-to-b from-[#d0d8e4] to-[#a8b4c4] rounded-t-lg rounded-b-xl shadow-2xl border border-white/20">
                      <div className="absolute top-2 left-2 right-2 bottom-8 bg-gradient-to-b from-white/30 to-transparent rounded-md" />
                      <div className="absolute bottom-2 left-1 right-1 h-8 bg-[#1a3260]/80 rounded-b-lg flex items-center justify-center">
                        <span className="text-white text-[6px] font-bold text-center leading-tight">MATTRESSFRESH</span>
                      </div>
                    </div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-3 h-8 bg-[#c8cfd8] rounded-t-full" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 rotate-45 w-5 h-5 bg-[#d0d8e4] origin-bottom-left" />
                  </div>
                  <span className="text-white/60 text-xs">8 oz</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-20 h-44 bg-gradient-to-b from-[#d0d8e4] to-[#a8b4c4] rounded-t-lg rounded-b-xl shadow-2xl border border-white/20">
                      <div className="absolute top-2 left-2 right-2 bottom-10 bg-gradient-to-b from-white/30 to-transparent rounded-md" />
                      <div className="absolute bottom-2 left-1 right-1 h-10 bg-[#1a3260]/80 rounded-b-lg flex items-center justify-center">
                        <span className="text-white text-[7px] font-bold text-center leading-tight">MATTRESSFRESH</span>
                      </div>
                    </div>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#c8cfd8] rounded-t-full" />
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 rotate-45 w-6 h-6 bg-[#d0d8e4] origin-bottom-left" />
                  </div>
                  <span className="text-white/80 text-xs font-semibold">16 oz</span>
                </div>

                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <div className="w-24 h-52 bg-gradient-to-b from-[#d0d8e4] to-[#a8b4c4] rounded-t-lg rounded-b-xl shadow-2xl border border-white/20">
                      <div className="absolute top-2 left-2 right-2 bottom-12 bg-gradient-to-b from-white/30 to-transparent rounded-md" />
                      <div className="absolute bottom-2 left-1 right-1 h-12 bg-[#1a3260]/80 rounded-b-lg flex items-center justify-center">
                        <span className="text-white text-[8px] font-bold text-center leading-tight">MATTRESSFRESH</span>
                      </div>
                    </div>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#c8cfd8] rounded-t-full" />
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 rotate-45 w-6 h-6 bg-[#d0d8e4] origin-bottom-left" />
                  </div>
                  <span className="text-white/60 text-xs">32 oz</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40 Q360 80 720 40 Q1080 0 1440 40 L1440 80 L0 80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">Why MattressFresh</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">Four Reasons to Switch</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              One spray. Four powerful benefits. Engineered with nature&apos;s most effective ingredients.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group bg-[#f7f9fc] hover:bg-[#0f2044] rounded-2xl p-7 transition-all duration-300 border border-gray-100 hover:border-[#2ab8b8]/30 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="mb-5">{b.icon}</div>
                <h3 className="font-bold text-[#0f2044] group-hover:text-white text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-[#0f2044]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-[#2ab8b8] mb-1">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Teaser */}
      <section className="py-24 px-6 bg-[#f7f9fc]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">The Collection</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">A Size for Every Need</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { size: "8 oz", tag: "Commercial", color: "from-[#0f2044] to-[#1a3260]", desc: "Perfect for hotels, hospitality, and large-scale cleaning operations.", price: "$12.99" },
              { size: "16 oz", tag: "Consumer / Airbnb", color: "from-[#1a3260] to-[#0d3d4a]", desc: "Ideal for home use and short-term rental hosts who want the best for their guests.", price: "$19.99", featured: true },
              { size: "32 oz", tag: "Pro Size", color: "from-[#0d3d4a] to-[#0f2044]", desc: "Maximum value for power users, property managers, and frequent refreshers.", price: "$29.99" },
            ].map((p) => (
              <div
                key={p.size}
                className={`relative rounded-2xl overflow-hidden shadow-lg ${p.featured ? "ring-2 ring-[#2ab8b8] shadow-[#2ab8b8]/20 shadow-2xl" : ""}`}
              >
                {p.featured && (
                  <div className="absolute top-4 right-4 bg-[#2ab8b8] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                    Most Popular
                  </div>
                )}
                <div className={`bg-gradient-to-br ${p.color} p-10 flex items-center justify-center h-48`}>
                  <div className="text-center text-white">
                    <div className="text-5xl font-bold">{p.size}</div>
                    <div className="text-[#2ab8b8] text-sm mt-1 font-medium">{p.tag}</div>
                  </div>
                </div>
                <div className="bg-white p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#0f2044]">{p.price}</span>
                    <Link
                      href={`/products#${p.size.replace(" ", "").toLowerCase()}`}
                      className="px-4 py-2 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white text-sm font-semibold rounded-full transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0f2044] hover:bg-[#1a3260] text-white font-bold rounded-full transition-colors"
            >
              Shop All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">What Our Customers Say</h2>
          </div>

          <div className="relative bg-[#f7f9fc] rounded-3xl p-10 shadow-sm border border-gray-100">
            <div className="text-[#2ab8b8] text-6xl font-serif leading-none mb-4">&ldquo;</div>
            <p className="text-[#0f2044] text-xl leading-relaxed mb-8 min-h-[80px]">
              {testimonials[activeTestimonial].quote}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-[#0f2044]">{testimonials[activeTestimonial].name}</div>
                <div className="text-gray-400 text-sm">{testimonials[activeTestimonial].role}</div>
              </div>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      i === activeTestimonial ? "bg-[#2ab8b8]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0f2044] to-[#0d3d4a]">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Revitalize Your Sleep?</h2>
          <p className="text-white/70 text-lg mb-8">
            Join thousands of households, hotels, and Airbnb hosts who trust MattressFresh for a cleaner, healthier sleep environment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/products"
              className="px-8 py-4 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white font-bold rounded-full transition-all shadow-lg shadow-[#2ab8b8]/30 hover:-translate-y-0.5"
            >
              Shop the MattressFresh Collection
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/20 transition-all hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
