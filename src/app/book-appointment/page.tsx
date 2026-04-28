"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { CLINIC, DOCTOR, SERVICE_CATEGORIES } from "@/lib/constants";

export default function BookAppointmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const allServices = SERVICE_CATEGORIES.flatMap((cat) =>
    cat.services.map((s) => `${s.title} (${cat.subtitle})`)
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      date: String(data.get("date") || ""),
      time: String(data.get("time") || ""),
      service: String(data.get("service") || ""),
      message: String(data.get("message") || ""),
    };
    setSubmitting(true);
    try {
      const res = await fetch("/api/book-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setErrorMsg(
          json.error ||
            "We couldn't submit your request. Please try again or call us directly."
        );
        return;
      }
      form.reset();
      setSubmitted(true);
    } catch {
      setErrorMsg(
        "Network error. Please check your connection and try again, or call us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="flex min-h-screen items-center bg-cream-50 pt-24">
        <div className="mx-auto max-w-lg px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="mt-6 font-serif text-3xl font-semibold text-charcoal-800">
            Appointment Requested!
          </h2>
          <p className="mt-4 text-base leading-relaxed text-charcoal-400">
            Thank you for choosing {CLINIC.shortName}. We have received your appointment
            request and our team will contact you shortly to confirm.
          </p>
          <p className="mt-4 text-sm text-charcoal-400">
            For immediate assistance, call us at{" "}
            <a href={`tel:${CLINIC.phones[0].replace(/\s/g, "")}`} className="font-semibold text-burgundy-600">
              {CLINIC.phones[0]}
            </a>
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy-600 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-burgundy-700"
          >
            Book Another Appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-burgundy-50 to-gold-50 opacity-50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
              Schedule a Visit
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl lg:text-6xl">
              Book Your Appointment
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-400">
              Take the first step toward your transformation. Fill out the form below
              and our team will confirm your appointment promptly.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-5">
            {/* Form */}
            <AnimateOnScroll className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                      Full Name <span className="text-burgundy-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-2 block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                      Phone Number <span className="text-burgundy-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="mt-2 block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Preferred Date */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                      Preferred Date <span className="text-burgundy-400">*</span>
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      className="mt-2 block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label htmlFor="time" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                      Preferred Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      className="mt-2 block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                    >
                      <option value="">Select a time slot</option>
                      <option value="10:00-12:00">10:00 AM — 12:00 PM</option>
                      <option value="12:00-14:00">12:00 PM — 2:00 PM</option>
                      <option value="14:00-16:00">2:00 PM — 4:00 PM</option>
                      <option value="16:00-18:00">4:00 PM — 6:00 PM</option>
                      <option value="18:00-21:00">6:00 PM — 9:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                    Treatment / Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="mt-2 block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                  >
                    <option value="">Select a treatment (optional)</option>
                    <option value="general">General Consultation</option>
                    {allServices.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-2 block w-full resize-none rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                    placeholder="Briefly describe your concern or any specific requirements..."
                  />
                </div>

                {errorMsg && (
                  <div
                    role="alert"
                    className="rounded-xl border border-burgundy-200 bg-burgundy-50 px-4 py-3 text-sm text-burgundy-700"
                  >
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-burgundy-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-burgundy-700 hover:shadow-xl hover:shadow-burgundy-600/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {submitting ? "Sending…" : "Book Now"}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </form>
            </AnimateOnScroll>

            {/* Sidebar */}
            <AnimateOnScroll delay={200} className="lg:col-span-2">
              <div className="sticky top-32 space-y-8">
                {/* Info Card */}
                <div className="rounded-2xl border border-cream-200 bg-cream-50 p-8">
                  <h3 className="font-serif text-lg font-semibold text-charcoal-800">
                    Clinic Information
                  </h3>
                  <div className="luxury-divider mt-3" />

                  <div className="mt-6 space-y-5">
                    <div className="flex gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-burgundy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <p className="text-sm text-charcoal-500">{CLINIC.address}</p>
                    </div>
                    <div className="flex gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-burgundy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm text-charcoal-500">{CLINIC.timing}</p>
                        <p className="text-sm text-charcoal-500">{CLINIC.days}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-burgundy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      <div className="space-y-0.5">
                        {CLINIC.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="block text-sm text-charcoal-500 hover:text-burgundy-600"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Call */}
                <div className="rounded-2xl bg-burgundy-600 p-8 text-center">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    Prefer to Call?
                  </h3>
                  <p className="mt-2 text-sm text-burgundy-100">
                    Speak directly with our team for immediate assistance.
                  </p>
                  <a
                    href={`tel:${CLINIC.phones[0].replace(/\s/g, "")}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-burgundy-600 transition-all duration-300 hover:shadow-lg"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Call Now
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
