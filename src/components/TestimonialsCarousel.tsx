"use client";

import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

interface Testimonial {
  name: string;
  date: string;
  rating: number;
  text: string;
}

interface Props {
  testimonials: Testimonial[];
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative mt-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 hidden items-center justify-between md:flex">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          className="pointer-events-auto -ml-4 flex h-12 w-12 items-center justify-center rounded-full border border-cream-200 bg-white text-charcoal-700 shadow-md transition-all duration-300 hover:border-burgundy-200 hover:text-burgundy-600 disabled:cursor-not-allowed disabled:opacity-40 lg:-ml-6"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          className="pointer-events-auto -mr-4 flex h-12 w-12 items-center justify-center rounded-full border border-cream-200 bg-white text-charcoal-700 shadow-md transition-all duration-300 hover:border-burgundy-200 hover:text-burgundy-600 disabled:cursor-not-allowed disabled:opacity-40 lg:-mr-6"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 lg:-mx-8 lg:px-8"
      >
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            data-slide
            className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <TestimonialCard {...t} index={idx} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3 md:hidden">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-200 bg-white text-charcoal-700 shadow-sm transition-all duration-300 hover:border-burgundy-200 hover:text-burgundy-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-200 bg-white text-charcoal-700 shadow-sm transition-all duration-300 hover:border-burgundy-200 hover:text-burgundy-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
