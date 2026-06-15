"use client";

import { useState } from "react";
import Link from "next/link";

const products = [
  {
    id: "8oz",
    size: "8 oz",
    subtitle: "Commercial Grade",
    price: "$12.99",
    tag: "Commercial",
    tagColor: "bg-blue-100 text-blue-700",
    scents: ["Unscented", "Lavender", "Eucalyptus"],
    desc: "Built for hospitality professionals who need reliable, cost-effective mattress maintenance at scale. The 8 oz Commercial size delivers the same powerful all-natural formula in a compact, easy-to-stock format.",
    features: [
      "Ideal for hotel and motel operations",
      "Compact size fits standard supply carts",
      "Economical bulk pricing available",
      "Professional-grade concentration",
    ],
    gradient: "from-[#1a3260] to-[#0f2044]",
  },
  {
    id: "16oz",
    size: "16 oz",
    subtitle: "Consumer / Airbnb",
    price: "$19.99",
    tag: "Most Popular",
    tagColor: "bg-[#2ab8b8]/20 text-[#2ab8b8]",
    scents: ["Lavender", "Ocean Breeze", "Eucalyptus", "Unscented"],
    desc: "The sweet spot between value and volume. Perfect for homeowners who want fresh, clean beds every week and for Airbnb hosts who need to impress every guest with a pristine sleeping environment.",
    features: [
      "Up to 30 full mattress treatments",
      "4 signature scent options",
      "Fast-drying formula — ready in 15 min",
      "Child and pet safe ingredients",
    ],
    gradient: "from-[#0d3d4a] to-[#1a3260]",
    featured: true,
  },
  {
    id: "32oz",
    size: "32 oz",
    subtitle: "Pro Size",
    price: "$29.99",
    tag: "Best Value",
    tagColor: "bg-green-100 text-green-700",
    scents: ["Lavender", "Ocean Breeze", "Eucalyptus", "Unscented", "Fresh Linen"],
    desc: "Maximum coverage for maximum value. The 32 oz Pro Size is the choice of property managers, large families, and anyone serious about long-term mattress health. One bottle, months of protection.",
    features: [
      "Up to 60 full mattress treatments",
      "5 signature scent options",
      "Refillable with MattressFresh concentrate",
      "Includes measuring guide label",
    ],
    gradient: "from-[#0f2044] to-[#0d3d4a]",
  },
];

const ingredients = [
  { name: "Thyme Extract", benefit: "Natural antimicrobial that kills bacteria and dust mites" },
  { name: "Lavender Oil", benefit: "Aromatherapeutic relaxant that promotes deep sleep" },
  { name: "Eucalyptus Oil", benefit: "Powerful natural deodorizer and respiratory support" },
  { name: "Colloidal Silver", benefit: "Long-lasting antibacterial protection between sprays" },
  { name: "Citric Acid", benefit: "Natural pH balancer and mild disinfectant" },
  { name: "Purified Water", benefit: "Ultra-pure carrier that leaves no residue" },
];

export default function ProductsPage() {
  const [selectedScents, setSelectedScents] = useState<Record<string, string>>({
    "8oz": "Unscented",
    "16oz": "Lavender",
    "32oz": "Lavender",
  });
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const handleAddToCart = (id: string) => {
    setAddedToCart(id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2044] to-[#0d3d4a] py-20 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">The Collection</p>
          <h1 className="text-5xl font-bold mb-4">MattressFresh Products</h1>
          <p className="text-white/70 text-xl">
            Three sizes. One powerful formula. A sleep environment you&apos;ll love waking up in.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-6 bg-[#f7f9fc]">
        <div className="max-w-6xl mx-auto space-y-16">
          {products.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              className={`flex flex-col lg:flex-row gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""} bg-white rounded-3xl shadow-lg overflow-hidden ${p.featured ? "ring-2 ring-[#2ab8b8]" : ""}`}
            >
              {/* Visual */}
              <div className={`w-full lg:w-2/5 bg-gradient-to-br ${p.gradient} flex items-center justify-center py-16 px-12 min-h-[340px]`}>
                <div className="text-center">
                  {/* Bottle SVG */}
                  <div className="relative inline-flex flex-col items-center">
                    <div className="relative">
                      <div
                        className="bg-gradient-to-b from-[#d0d8e4] to-[#a8b4c4] rounded-t-lg rounded-b-xl shadow-2xl border border-white/20"
                        style={{ width: p.id === "8oz" ? "80px" : p.id === "16oz" ? "96px" : "112px", height: p.id === "8oz" ? "140px" : p.id === "16oz" ? "170px" : "200px" }}
                      >
                        <div className="absolute inset-2 bottom-10 bg-gradient-to-b from-white/30 to-transparent rounded-md" />
                        <div className="absolute bottom-1 left-1 right-1 h-10 bg-[#1a3260]/90 rounded-b-lg flex flex-col items-center justify-center">
                          <span className="text-white text-[7px] font-black text-center leading-tight">MATTRESSFRESH</span>
                          <span className="text-[#2ab8b8] text-[6px]">CORE VITALIZER</span>
                        </div>
                      </div>
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-10 bg-[#c8cfd8] rounded-t-full" />
                      <div className="absolute -top-9 left-1/2 -translate-x-1/2 rotate-45 w-6 h-6 bg-[#d0d8e4] origin-bottom-left" />
                    </div>
                  </div>
                  <div className="text-white mt-6">
                    <div className="text-4xl font-bold">{p.size}</div>
                    <div className="text-[#2ab8b8] text-sm mt-1">{p.subtitle}</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.tagColor}`}>{p.tag}</span>
                </div>
                <h2 className="text-3xl font-bold text-[#0f2044] mb-2">{p.size} — {p.subtitle}</h2>
                <div className="text-3xl font-bold text-[#2ab8b8] mb-4">{p.price}</div>
                <p className="text-gray-600 leading-relaxed mb-6">{p.desc}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-[#2ab8b8] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Scent selector */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-[#0f2044] mb-2">Choose Scent</p>
                  <div className="flex flex-wrap gap-2">
                    {p.scents.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedScents((prev) => ({ ...prev, [p.id]: s }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          selectedScents[p.id] === s
                            ? "bg-[#0f2044] border-[#0f2044] text-white"
                            : "bg-white border-gray-200 text-gray-600 hover:border-[#2ab8b8]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(p.id)}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-white transition-all ${
                    addedToCart === p.id
                      ? "bg-green-500"
                      : "bg-[#2ab8b8] hover:bg-[#4dd4d4] shadow-lg shadow-[#2ab8b8]/20"
                  }`}
                >
                  {addedToCart === p.id ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">Transparency</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">What&apos;s Inside</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto">
              Every ingredient is carefully selected from natural sources. No synthetic chemicals. No hidden fillers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredients.map((ing) => (
              <div key={ing.name} className="bg-[#f7f9fc] rounded-2xl p-6 border border-gray-100">
                <div className="w-8 h-8 bg-[#2ab8b8]/20 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-[#2ab8b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0f2044] mb-1">{ing.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0f2044] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-white/70 mb-6">Our team is happy to help you find the right size and scent for your needs.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white font-bold rounded-full transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
