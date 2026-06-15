import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MattressFresh | All-Natural Core Vitalizer",
  description:
    "Revitalize Your Mattress. Rest Your Soul. All-natural mattress spray that sanitizes, eliminates dust mites, removes odors, and is foam-safe.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#0f2044]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-[#0f2044] text-white/70 py-10 px-6 text-sm">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
            <div>
              <span className="text-white font-bold text-lg tracking-wide">MATTRESSFRESH</span>
              <p className="mt-2 text-white/50 max-w-xs">
                Revitalize Your Mattress. Rest Your Soul.™
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-white font-semibold mb-2">Pages</p>
                <ul className="space-y-1">
                  <li><a href="/" className="hover:text-white transition">Home</a></li>
                  <li><a href="/products" className="hover:text-white transition">Products</a></li>
                  <li><a href="/tech" className="hover:text-white transition">Technology</a></li>
                  <li><a href="/contact" className="hover:text-white transition">Contact Us</a></li>
                </ul>
              </div>
              <div>
                <p className="text-white font-semibold mb-2">Products</p>
                <ul className="space-y-1">
                  <li><a href="/products#8oz" className="hover:text-white transition">8 oz Commercial</a></li>
                  <li><a href="/products#16oz" className="hover:text-white transition">16 oz Consumer</a></li>
                  <li><a href="/products#32oz" className="hover:text-white transition">32 oz Pro</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-white/40 text-xs">
            © {new Date().getFullYear()} MattressFresh. All rights reserved. | All-Natural · Zero VOC · Foam-Safe
          </div>
        </footer>
      </body>
    </html>
  );
}
