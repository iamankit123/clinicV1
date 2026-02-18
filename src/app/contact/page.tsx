"use client";

import { useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionHeading from "@/components/SectionHeading";
import { CLINIC, DOCTOR } from "@/lib/constants";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute left-0 bottom-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/4 rounded-full bg-gradient-to-tr from-gold-50 to-burgundy-50 opacity-50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
              Get in Touch
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-400">
              We&apos;d love to hear from you. Reach out for appointments, inquiries,
              or any questions about our treatments.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Contact Details */}
            <AnimateOnScroll>
              <div>
                <SectionHeading
                  label="Visit Our Clinic"
                  title="We're Here for You"
                  centered={false}
                />

                <div className="mt-10 space-y-8">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-charcoal-800">
                        Address
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-400">
                        {CLINIC.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-charcoal-800">
                        Phone
                      </h3>
                      <div className="mt-1 space-y-1">
                        {CLINIC.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="block text-sm text-charcoal-400 transition-colors hover:text-burgundy-600"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-charcoal-800">
                        Email
                      </h3>
                      <a
                        href={`mailto:${CLINIC.email}`}
                        className="mt-1 block text-sm text-charcoal-400 transition-colors hover:text-burgundy-600"
                      >
                        {CLINIC.email}
                      </a>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-600">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-semibold text-charcoal-800">
                        Working Hours
                      </h3>
                      <p className="mt-1 text-sm text-charcoal-400">{CLINIC.timing}</p>
                      <p className="text-sm text-charcoal-400">{CLINIC.days}</p>
                    </div>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-10 overflow-hidden rounded-2xl border border-cream-200">
                  <iframe
                    title="Clinic Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.5!2d77.16!3d28.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSwaroop+Nagar+Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale transition-all duration-500 hover:grayscale-0"
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Contact Form */}
            <AnimateOnScroll delay={200}>
              <div className="rounded-3xl border border-cream-200 bg-cream-50 p-8 sm:p-10">
                <h3 className="font-serif text-2xl font-semibold text-charcoal-800">
                  Send Us a Message
                </h3>
                <p className="mt-2 text-sm text-charcoal-400">
                  Have a question? Fill out the form and we&apos;ll get back to you promptly.
                </p>
                <div className="luxury-divider mt-4" />

                {sent ? (
                  <div className="mt-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                      <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h4 className="mt-4 font-serif text-xl font-semibold text-charcoal-800">
                      Message Sent!
                    </h4>
                    <p className="mt-2 text-sm text-charcoal-400">
                      Thank you for reaching out. We&apos;ll respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-6 text-sm font-semibold text-burgundy-600 hover:text-burgundy-700"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                        Your Name <span className="text-burgundy-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        className="mt-2 block w-full rounded-xl border border-cream-200 bg-white px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                        placeholder="Full name"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                          Email <span className="text-burgundy-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          required
                          className="mt-2 block w-full rounded-xl border border-cream-200 bg-white px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          className="mt-2 block w-full rounded-xl border border-cream-200 bg-white px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="contact-subject"
                        className="mt-2 block w-full rounded-xl border border-cream-200 bg-white px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold tracking-wide text-charcoal-600 uppercase">
                        Message <span className="text-burgundy-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={5}
                        className="mt-2 block w-full resize-none rounded-xl border border-cream-200 bg-white px-4 py-3.5 text-sm text-charcoal-800 outline-none transition-all duration-300 placeholder:text-charcoal-300 focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-burgundy-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-burgundy-700 hover:shadow-xl hover:shadow-burgundy-600/20"
                    >
                      Send Message
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Quick Contact Band */}
      <section className="bg-burgundy-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <h3 className="font-serif text-xl font-semibold text-white">
                Need Immediate Assistance?
              </h3>
              <p className="mt-1 text-sm text-burgundy-100">
                Our team is available during clinic hours to help you.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {CLINIC.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-burgundy-600"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
