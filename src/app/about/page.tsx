import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionHeading from "@/components/SectionHeading";
import { CLINIC, DOCTOR } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Dr. Shivani Singh",
  description: `Learn about ${DOCTOR.name} (${DOCTOR.qualifications}) — founder of ${CLINIC.name}. Premium dental, skin, and aesthetic care in Delhi.`,
};

export default function AboutPage() {
  const milestones = [
    { year: "B.D.S", label: "Bachelor of Dental Surgery" },
    { year: "PGDCC", label: "PG Diploma in Clinical Cosmetology" },
    { year: "MIDA", label: "Member of Indian Dental Association" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-burgundy-50 to-gold-50 opacity-50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
              Meet Your Doctor
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl lg:text-6xl">
              {DOCTOR.name}
            </h1>
            <p className="mt-2 text-lg text-gold-500">{DOCTOR.qualifications}</p>
            <p className="mt-1 text-sm tracking-wide text-charcoal-400 uppercase">
              {DOCTOR.title}
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-5">
            {/* Profile Card */}
            <AnimateOnScroll className="lg:col-span-2">
              <div className="sticky top-32 overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-br from-cream-50 to-white p-8 text-center sm:p-10">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-burgundy-600 shadow-lg shadow-burgundy-200">
                  <span className="font-serif text-5xl font-bold text-white">S</span>
                </div>
                <h2 className="mt-6 font-serif text-2xl font-semibold text-charcoal-800">
                  {DOCTOR.name}
                </h2>
                <p className="mt-1 text-sm text-gold-500">{DOCTOR.qualifications}</p>
                <div className="luxury-divider mx-auto mt-6" />

                {/* Qualifications */}
                <div className="mt-8 space-y-4">
                  {milestones.map((m) => (
                    <div key={m.year} className="flex items-center gap-3 text-left">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burgundy-50 font-serif text-xs font-bold text-burgundy-600">
                        {m.year}
                      </span>
                      <span className="text-sm text-charcoal-500">{m.label}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/book-appointment"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-burgundy-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-burgundy-700"
                >
                  Book Consultation
                </Link>
              </div>
            </AnimateOnScroll>

            {/* Bio Content */}
            <AnimateOnScroll delay={200} className="lg:col-span-3">
              <div>
                <SectionHeading
                  label="Philosophy & Vision"
                  title="Dedicated to Your Transformation"
                  centered={false}
                />

                <div className="mt-10 space-y-6">
                  {DOCTOR.bio.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-charcoal-400"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Specializations */}
                <div className="mt-12">
                  <h3 className="font-serif text-xl font-semibold text-charcoal-800">
                    Areas of Expertise
                  </h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {DOCTOR.specializations.map((spec) => (
                      <div
                        key={spec}
                        className="flex items-center gap-3 rounded-xl border border-cream-200 bg-cream-50 p-4 transition-all duration-300 hover:border-gold-200 hover:shadow-sm"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-burgundy-600">
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-charcoal-700">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mission */}
                <div className="mt-12 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-cream-50 p-8">
                  <h3 className="font-serif text-xl font-semibold text-charcoal-800">
                    Our Promise
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-charcoal-500">
                    Every patient who walks through our doors deserves the highest
                    standard of medical care delivered in an environment of warmth,
                    comfort, and absolute trust. We don&apos;t just treat conditions — we
                    transform lives by restoring confidence, one smile at a time.
                  </p>
                  <p className="mt-4 font-serif text-sm italic text-burgundy-600">
                    — {DOCTOR.name}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading
              label="Inside Our Clinic"
              title="See the Space"
              subtitle="A welcoming, modern environment designed to put you at ease from the moment you walk in."
            />
          </AnimateOnScroll>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { src: "/clinic-images/clinic1.png", alt: "Clinic interior" },
              { src: "/clinic-images/clinic2.png", alt: "Treatment room" },
              { src: "/clinic-images/clinic3.png", alt: "Aesthetics suite" },
              { src: "/clinic-images/clinic4.png", alt: "Clinic entrance" },
            ].map((img, idx) => (
              <AnimateOnScroll key={img.src} delay={idx * 100}>
                <div className="group relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Info */}
      <section className="bg-cream-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading
              label="The Clinic"
              title="A Space Designed for Comfort"
              subtitle="Our clinic combines medical excellence with a calming, luxurious environment — because you deserve both."
            />
          </AnimateOnScroll>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Sterilisation Standards",
                desc: "Hospital-grade sterilisation protocols ensuring complete safety for every procedure.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
              {
                title: "Modern Equipment",
                desc: "Latest dental chairs, laser systems, and digital imaging for precise, comfortable treatments.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5" />
                  </svg>
                ),
              },
              {
                title: "Calming Ambience",
                desc: "Thoughtfully designed interiors that ease anxiety and create a serene, welcoming atmosphere.",
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
              },
            ].map((item) => (
              <AnimateOnScroll key={item.title}>
                <div className="rounded-2xl border border-cream-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-burgundy-50 text-burgundy-600">
                    {item.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-charcoal-800">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-400">
                    {item.desc}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
