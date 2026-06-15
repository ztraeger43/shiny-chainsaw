"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
};

const inquiryTypes = [
  "General Question",
  "Order Support",
  "Wholesale / Bulk Inquiry",
  "Hotel & Hospitality",
  "Airbnb / Short-Term Rental",
  "Press & Media",
  "Other",
];

const contactInfo = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#2ab8b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "hello@mattressfresh.com",
    href: "mailto:hello@mattressfresh.com",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#2ab8b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "1-800-MATTRESS",
    href: "tel:1-800-628-8737",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#2ab8b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "123 Sleep Science Blvd, Suite 100\nAtlanta, GA 30301",
    href: null,
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#2ab8b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Hours",
    value: "Mon – Fri: 9am – 6pm EST\nSat: 10am – 3pm EST",
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "General Question",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate submission
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  const inputClass =
    "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[#0f2044] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ab8b8] focus:border-transparent transition-all";

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f2044] to-[#0d3d4a] py-20 px-6 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/70 text-xl">
            Questions about our products, wholesale pricing, or hospitality partnerships? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-20 px-6 bg-[#f7f9fc]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0f2044] mb-2">We&apos;re Here to Help</h2>
              <p className="text-gray-500 leading-relaxed">
                Whether you&apos;re a homeowner curious about MattressFresh, an Airbnb host looking to upgrade your guest experience, or a hotel operator exploring bulk pricing — our team is ready.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2ab8b8]/10 flex items-center justify-center shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="text-[#0f2044] hover:text-[#2ab8b8] font-medium transition-colors whitespace-pre-line">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-[#0f2044] font-medium whitespace-pre-line">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Use Cases highlight */}
            <div className="bg-[#0f2044] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-3">Bulk & Wholesale</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                Hotels, property managers, and retailers get preferential pricing on orders of 50+ units. Contact us to receive a custom quote.
              </p>
              <div className="flex flex-col gap-2 text-sm">
                {["Hotels & Motels", "Airbnb Hosts (10+ properties)", "Retail Partners", "Corporate Housing"].map((u) => (
                  <div key={u} className="flex items-center gap-2 text-[#2ab8b8]">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {u}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#0f2044] mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will get back to you within 1 business day.</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", subject: "", message: "", type: "General Question" }); }}
                  className="px-6 py-2 bg-[#2ab8b8] text-white rounded-full font-semibold hover:bg-[#4dd4d4] transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#0f2044] mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0f2044] mb-1.5">Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0f2044] mb-1.5">Email *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f2044] mb-1.5">Inquiry Type</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {inquiryTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f2044] mb-1.5">Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What can we help you with?"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0f2044] mb-1.5">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your needs..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white font-bold rounded-xl transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  <p className="text-center text-gray-400 text-xs">
                    We typically respond within 1 business day. For urgent orders, please call us directly.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Use Case Cards */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#2ab8b8] font-semibold text-sm uppercase tracking-widest mb-3">Partnerships</p>
            <h2 className="text-4xl font-bold text-[#0f2044]">Built for Every Environment</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                emoji: "🏠",
                title: "Homeowners",
                desc: "Maintain a cleaner, allergen-reduced bedroom for your whole family with our 16 oz or 32 oz options.",
              },
              {
                emoji: "🏨",
                title: "Hotels & Motels",
                desc: "Give every guest a sanitized, fresh sleeping surface. Bulk pricing available for 50+ unit orders.",
              },
              {
                emoji: "🔑",
                title: "Airbnb Hosts",
                desc: "Earn 5-star reviews with a mattress that smells and feels as clean as it looks. Our #1 recommended use case.",
              },
            ].map((c) => (
              <div key={c.title} className="bg-[#f7f9fc] rounded-2xl p-8 border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{c.emoji}</div>
                <h3 className="text-xl font-bold text-[#0f2044] mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
