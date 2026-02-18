import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { CLINIC, DOCTOR, SERVICE_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Explore 27+ premium dental, skin, and aesthetic treatments at ${CLINIC.name}. Smile design, PRP, laser hair removal, skin brightening, and more.`,
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-br from-gold-50 to-burgundy-50 opacity-50 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
              Our Expertise
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl lg:text-6xl">
              Premium Treatments
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-400">
              Comprehensive dental, skin, and aesthetic services delivered with
              precision, care, and a commitment to exceptional results.
            </p>
          </AnimateOnScroll>

          {/* Quick nav */}
          <AnimateOnScroll delay={200}>
            <div className="mt-10 flex flex-wrap gap-3">
              {SERVICE_CATEGORIES.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white px-5 py-2.5 text-sm font-medium text-charcoal-600 transition-all duration-300 hover:border-burgundy-200 hover:text-burgundy-600 hover:shadow-sm"
                >
                  {cat.title}
                  <span className="text-xs text-charcoal-300">
                    ({cat.services.length})
                  </span>
                </a>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Service Categories */}
      {SERVICE_CATEGORIES.map((category, catIdx) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-24 sm:py-32 ${catIdx % 2 === 0 ? "bg-white" : "bg-cream-50"}`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="flex items-start gap-4">
                <span className="font-serif text-6xl font-bold text-cream-200 sm:text-7xl">
                  {String(catIdx + 1).padStart(2, "0")}
                </span>
                <div>
                  <SectionHeading
                    label={category.subtitle}
                    title={category.title}
                    subtitle={category.description}
                    centered={false}
                  />
                </div>
              </div>
            </AnimateOnScroll>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.services.map((service, idx) => (
                <AnimateOnScroll key={service.title} delay={idx * 60}>
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    index={idx}
                  />
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="bg-burgundy-600 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl font-semibold text-white sm:text-4xl">
            Not Sure Which Treatment Is Right for You?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-burgundy-100">
            Book a personal consultation with {DOCTOR.name} and receive a customised
            treatment plan tailored to your unique needs and goals.
          </p>
          <Link
            href="/book-appointment"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-burgundy-600 transition-all duration-300 hover:shadow-xl"
          >
            Book Your Consultation
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
