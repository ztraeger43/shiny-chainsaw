"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/tech", label: "Technology" },
  { href: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0f2044]/95 backdrop-blur-md shadow-lg" : "bg-[#0f2044]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2ab8b8] to-[#0f2044] flex items-center justify-center border-2 border-[#2ab8b8]/60">
            <span className="text-white font-bold text-xs tracking-tight">MF</span>
          </div>
          <span className="text-white font-bold text-lg tracking-wide hidden sm:block">
            MATTRESSFRESH
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href
                  ? "text-[#2ab8b8]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/products"
            className="ml-4 px-4 py-2 bg-[#2ab8b8] hover:bg-[#4dd4d4] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Shop Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <div className={`w-5 h-0.5 bg-white mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0f2044] border-t border-white/10 px-6 pb-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-white/5 ${
                pathname === l.href ? "text-[#2ab8b8]" : "text-white/80"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/products"
            className="block mt-4 text-center py-2 bg-[#2ab8b8] text-white text-sm font-semibold rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </a>
        </div>
      )}
    </nav>
  );
}
