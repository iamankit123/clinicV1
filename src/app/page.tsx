import Link from "next/link";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import {
  CLINIC,
  DOCTOR,
  SERVICE_CATEGORIES,
  TESTIMONIALS,
} from "@/lib/constants";

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-cream-50">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-burgundy-50 to-gold-50 opacity-60 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-gold-50 to-burgundy-50 opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-600 shadow-sm backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Premium Dental & Aesthetic Clinic — Delhi
            </div>

            {/* Main heading */}
            <h1 className="mt-8 font-serif text-4xl font-semibold leading-[1.15] text-charcoal-800 sm:text-5xl md:text-6xl lg:text-7xl">
              Where Science
              <br />
              Meets{" "}
              <span className="text-gold-gradient">Elegance</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal-400 sm:text-xl">
              Experience world-class dental, skin, and aesthetic treatments delivered with the precision and care you deserve.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 rounded-full bg-burgundy-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-burgundy-700 hover:shadow-xl hover:shadow-burgundy-600/20"
              >
                Book Your Consultation
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-charcoal-200 bg-white px-8 py-4 text-sm font-semibold text-charcoal-700 transition-all duration-300 hover:border-gold-300 hover:shadow-lg"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center gap-8 border-t border-cream-200 pt-8">
              <div>
                <p className="font-serif text-3xl font-bold text-burgundy-600">10+</p>
                <p className="text-xs text-charcoal-400">Years Experience</p>
              </div>
              <div className="h-8 w-px bg-cream-200" />
              <div>
                <p className="font-serif text-3xl font-bold text-burgundy-600">5000+</p>
                <p className="text-xs text-charcoal-400">Happy Patients</p>
              </div>
              <div className="h-8 w-px bg-cream-200" />
              <div>
                <p className="font-serif text-3xl font-bold text-burgundy-600">27+</p>
                <p className="text-xs text-charcoal-400">Treatments</p>
              </div>
            </div>
          </div>

          {/* Right — clinic photo */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl shadow-burgundy-900/20">
              <Image
                src="/clinic-images/clinic1.png"
                alt="Dr. Shivani Medical & Dental Care"
                fill
                priority
                className="object-cover"
                sizes="50vw"
              />
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/90 px-5 py-4 backdrop-blur-sm shadow-lg">
                <p className="font-serif text-base font-semibold text-charcoal-800">{CLINIC.name}</p>
                <p className="mt-0.5 text-xs text-charcoal-400">{CLINIC.address}</p>
              </div>
            </div>
            {/* Decorative accents */}
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-3xl bg-gold-100/60" />
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-2xl bg-burgundy-50" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About Preview ─── */
function AboutPreview() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <AnimateOnScroll>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src="/clinic-images/clinic1.png"
                  alt="Dr. Shivani Medical & Dental Care clinic interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Doctor name overlay */}
              <div className="absolute bottom-0 left-0 right-0 rounded-b-3xl bg-gradient-to-t from-charcoal-900/80 to-transparent p-6">
                <h3 className="font-serif text-xl font-semibold text-white">{DOCTOR.name}</h3>
                <p className="text-sm text-gold-300">{DOCTOR.qualifications} · {DOCTOR.title}</p>
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl bg-gold-400/10" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div>
              <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
                Your Doctor
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-charcoal-800 sm:text-4xl">
                Trusted Expertise,{" "}
                <span className="text-burgundy-600">Compassionate Care</span>
              </h2>
              <div className="luxury-divider mt-6" />
              <p className="mt-6 text-base leading-relaxed text-charcoal-400">
                {DOCTOR.bio[0]}
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal-400">
                {DOCTOR.bio[2]}
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-burgundy-600 transition-colors hover:text-burgundy-700"
              >
                Learn More About {DOCTOR.name}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Preview ─── */
function ServicesPreview() {
  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            label="Our Expertise"
            title="Premium Treatments"
            subtitle="Comprehensive dental, skin, and aesthetic services tailored to reveal the most confident version of you."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {SERVICE_CATEGORIES.map((category, idx) => (
            <AnimateOnScroll key={category.id} delay={idx * 150}>
              <Link href={`/services#${category.id}`} className="group block">
                <div className="relative overflow-hidden rounded-3xl border border-cream-200 bg-white p-8 transition-all duration-500 hover:shadow-xl hover:shadow-gold-100/50 sm:p-10">
                  {/* Category number */}
                  <span className="font-serif text-5xl font-bold text-cream-200 transition-colors group-hover:text-gold-100">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal-800">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium tracking-wide text-gold-500 uppercase">
                    {category.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal-400">
                    {category.description}
                  </p>

                  {/* Service count */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-charcoal-300">
                    <span className="font-serif font-semibold text-burgundy-500">
                      {category.services.length}
                    </span>
                    <span>treatments available</span>
                  </div>

                  {/* Hover accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-burgundy-500 to-gold-400 transition-all duration-500 group-hover:w-full" />
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-burgundy-200 px-8 py-3.5 text-sm font-semibold text-burgundy-600 transition-all duration-300 hover:bg-burgundy-600 hover:text-white"
          >
            View All Treatments
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─── */
function WhyChooseUs() {
  const reasons = [
    {
      title: "Advanced Technology",
      description: "State-of-the-art equipment including laser systems, digital imaging, and rotary endodontics for precision results.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
    },
    {
      title: "Personalised Treatment",
      description: "Every treatment plan is uniquely designed around your specific needs, goals, and comfort level.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
    },
    {
      title: "Painless Procedures",
      description: "Minimally invasive techniques and gentle care that prioritise your comfort throughout every treatment.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
    },
    {
      title: "Premium Environment",
      description: "A calm, luxurious clinic environment designed to make every visit a comfortable, stress-free experience.",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            label="Why Choose Us"
            title="The Gold Standard of Care"
            subtitle="Every detail of our practice is designed to deliver exceptional results in an environment of comfort and trust."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, idx) => (
            <AnimateOnScroll key={reason.title} delay={idx * 100}>
              <div className="group text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-burgundy-50 text-burgundy-600 transition-all duration-300 group-hover:bg-burgundy-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-burgundy-200">
                  {reason.icon}
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-charcoal-800">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-400">
                  {reason.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Clinic Gallery ─── */
function ClinicGallery() {
  const images = [
    { src: "/clinic-images/clinic1.png", alt: "Clinic reception and waiting area" },
    { src: "/clinic-images/clinic2.png", alt: "Modern dental treatment room" },
    { src: "/clinic-images/clinic3.png", alt: "Skin & aesthetics treatment suite" },
    { src: "/clinic-images/clinic4.png", alt: "Clinic exterior and entrance" },
  ];

  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            label="Our Clinic"
            title="A Space Built for Excellence"
            subtitle="Step inside Dr. Shivani Medical & Dental Care — where premium aesthetics meet world-class medical care."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, idx) => (
            <AnimateOnScroll key={img.src} delay={idx * 100}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  return (
    <section className="bg-cream-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimateOnScroll>
          <SectionHeading
            label="Patient Stories"
            title="Trusted by Thousands"
            subtitle="Real experiences from patients who chose excellence for their smile, skin, and confidence."
          />
        </AnimateOnScroll>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <AnimateOnScroll key={t.name} delay={idx * 100}>
              <TestimonialCard {...t} index={idx} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal-800 py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900/30 to-transparent" />
      <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <AnimateOnScroll>
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-400 uppercase">
            Begin Your Transformation
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Your Journey to Radiance
            <br />
            Starts Here
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-charcoal-300">
            Book a consultation with {DOCTOR.name} and discover personalised treatments
            designed exclusively for you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-8 py-4 text-sm font-semibold text-charcoal-900 transition-all duration-300 hover:bg-gold-300 hover:shadow-xl hover:shadow-gold-400/20"
            >
              Book Appointment
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
          <p className="mt-8 text-sm text-charcoal-400">
            {CLINIC.timing} · {CLINIC.days}
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ─── Home Page ─── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <ClinicGallery />
      <TestimonialsSection />
      <FinalCTA />
    </>
  );
}
