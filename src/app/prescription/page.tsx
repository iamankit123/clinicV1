import type { Metadata } from "next";
import Link from "next/link";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionHeading from "@/components/SectionHeading";
import { CLINIC, DOCTOR, SERVICE_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Prescription & Clinic Info",
  description: `Official clinic information, departments, and services at ${CLINIC.name}. Dental, Skin, Hair, Physician, Gynae, and Ortho departments.`,
};

export default function PrescriptionPage() {
  const departments = [
    {
      name: "Dental",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
        </svg>
      ),
      description: "Complete dental care from routine check-ups to advanced surgeries.",
    },
    {
      name: "Skin",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      description: "Clinical cosmetology and aesthetic skin treatments.",
    },
    {
      name: "Physician",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      description: "General physician consultation and healthcare services.",
    },
    {
      name: "Gynae",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      description: "Women's health and gynaecological care.",
    },
    {
      name: "Ortho",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      description: "Orthopaedic consultation and musculoskeletal care.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tl from-burgundy-50 to-gold-50 opacity-40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
              Clinic Information
            </p>
            <h1 className="mt-3 font-serif text-4xl font-semibold text-charcoal-800 sm:text-5xl lg:text-6xl">
              Prescription & Details
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal-400">
              Complete clinic information, departments, and facility details for your reference.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Clinic Official Card */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="overflow-hidden rounded-3xl border border-cream-200 shadow-lg">
              {/* Header — mimicking the prescription's maroon band */}
              <div className="bg-burgundy-600 px-8 py-8 text-center sm:px-12">
                <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                  {CLINIC.name}
                </h2>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-sm text-burgundy-100">
                  {departments.map((dept, idx) => (
                    <span key={dept.name} className="flex items-center gap-1">
                      {idx > 0 && <span className="mr-2 text-burgundy-300">|</span>}
                      {dept.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="bg-white p-8 sm:p-12">
                {/* Doctor info */}
                <div className="text-center">
                  <h3 className="font-serif text-xl font-semibold text-charcoal-800">
                    {DOCTOR.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gold-500">
                    {DOCTOR.qualifications}
                  </p>
                </div>

                <div className="luxury-divider mx-auto my-8" />

                {/* Contact grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burgundy-50 text-burgundy-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal-300 uppercase">Address</p>
                      <p className="mt-1 text-sm text-charcoal-600">{CLINIC.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burgundy-50 text-burgundy-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal-300 uppercase">Phone</p>
                      <div className="mt-1 space-y-0.5">
                        {CLINIC.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, "")}`}
                            className="block text-sm text-charcoal-600 hover:text-burgundy-600"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burgundy-50 text-burgundy-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal-300 uppercase">Timing</p>
                      <p className="mt-1 text-sm text-charcoal-600">{CLINIC.timing}</p>
                      <p className="text-sm text-charcoal-600">{CLINIC.days}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burgundy-50 text-burgundy-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-charcoal-300 uppercase">Email</p>
                      <a
                        href={`mailto:${CLINIC.email}`}
                        className="mt-1 block text-sm text-charcoal-600 hover:text-burgundy-600"
                      >
                        {CLINIC.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-cream-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading
              label="Departments"
              title="Multi-Specialty Care"
              subtitle="Our clinic houses multiple departments to provide comprehensive healthcare under one roof."
            />
          </AnimateOnScroll>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {departments.map((dept, idx) => (
              <AnimateOnScroll key={dept.name} delay={idx * 100}>
                <div className="rounded-2xl border border-cream-200 bg-white p-6 text-center transition-all duration-300 hover:border-gold-200 hover:shadow-lg">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-600">
                    {dept.icon}
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-charcoal-800">
                    {dept.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-charcoal-400">
                    {dept.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Summary */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimateOnScroll>
            <SectionHeading
              label="Facilities"
              title="Dental & Skin Facilities"
              subtitle="Complete list of treatments and facilities available at our clinic."
            />
          </AnimateOnScroll>

          <div className="mt-16 grid gap-12 lg:grid-cols-2">
            {SERVICE_CATEGORIES.slice(0, 2).map((category) => (
              <AnimateOnScroll key={category.id}>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-charcoal-800">
                    {category.title}
                  </h3>
                  <div className="luxury-divider mt-3" />
                  <ul className="mt-6 space-y-3">
                    {category.services.map((service) => (
                      <li key={service.title} className="flex items-start gap-3">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-sm text-charcoal-600">{service.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 rounded-full bg-burgundy-600 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-burgundy-700"
            >
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
