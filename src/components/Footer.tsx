import Link from "next/link";
import { CLINIC, DOCTOR, NAV_LINKS, SERVICE_CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal-800 text-white">
      {/* Top CTA Band */}
      <div className="border-b border-white/10 bg-burgundy-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
          <div>
            <h3 className="font-serif text-xl font-semibold text-white">
              Ready to Transform Your Smile?
            </h3>
            <p className="mt-1 text-sm text-burgundy-100">
              Book your premium consultation with {DOCTOR.name} today.
            </p>
          </div>
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-burgundy-600"
          >
            Book Appointment
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Clinic Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy-600">
                <span className="font-serif text-lg font-bold text-white">S</span>
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-white leading-tight">
                  {CLINIC.shortName}
                </p>
                <p className="text-[10px] tracking-[0.2em] text-gold-400 uppercase">
                  Medical & Dental Care
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-300">
              {CLINIC.description}
            </p>
            <div className="mt-6 luxury-divider" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-300 transition-colors duration-300 hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book-appointment"
                  className="text-sm text-charcoal-300 transition-colors duration-300 hover:text-gold-400"
                >
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
              Our Services
            </h4>
            <ul className="mt-4 space-y-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/services#${cat.id}`}
                    className="text-sm text-charcoal-300 transition-colors duration-300 hover:text-gold-400"
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
              Visit Us
            </h4>
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-sm leading-relaxed text-charcoal-300">
                  {CLINIC.address}
                </p>
              </div>
              <div className="flex gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <div className="space-y-1">
                  {CLINIC.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="block text-sm text-charcoal-300 transition-colors hover:text-gold-400"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-sm text-charcoal-300">{CLINIC.timing}</p>
                  <p className="text-sm text-charcoal-300">{CLINIC.days}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          <p className="text-xs text-charcoal-400">
            &copy; {new Date().getFullYear()} {CLINIC.name}. All rights reserved.
          </p>
          <p className="text-xs text-charcoal-400">
            Crafted with care in Delhi
          </p>
        </div>
      </div>
    </footer>
  );
}
