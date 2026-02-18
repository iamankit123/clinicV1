"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, CLINIC } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-gold-200/30 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-burgundy-600 transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif text-lg font-bold text-white">S</span>
          </div>
          <div className="hidden sm:block">
            <p className="font-serif text-lg font-semibold text-charcoal-800 leading-tight">
              {CLINIC.shortName}
            </p>
            <p className="text-[11px] tracking-[0.2em] text-gold-500 uppercase">
              Medical & Dental Care
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                pathname === link.href
                  ? "text-burgundy-600"
                  : "text-charcoal-500 hover:text-charcoal-800"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-gold-400" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 rounded-full bg-burgundy-600 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-burgundy-700 hover:shadow-lg hover:shadow-burgundy-600/20"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 rounded-full bg-charcoal-700 transition-all duration-300 ${
                isMobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-charcoal-700 transition-all duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 rounded-full bg-charcoal-700 transition-all duration-300 ${
                isMobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-500 lg:hidden ${
          isMobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="glass border-t border-gold-200/30 px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-3 text-base font-medium transition-colors ${
                pathname === link.href
                  ? "text-burgundy-600"
                  : "text-charcoal-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book-appointment"
            className="mt-4 block rounded-full bg-burgundy-600 px-6 py-3 text-center text-sm font-medium text-white"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
