"use client";

import { useState } from "react";

interface TestimonialCardProps {
  name: string;
  date: string;
  text: string;
  rating: number;
  index: number;
}

const PREVIEW_LENGTH = 140;

export default function TestimonialCard({
  name,
  date,
  text,
  rating,
  index,
}: TestimonialCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > PREVIEW_LENGTH;
  const displayText =
    !expanded && isLong ? text.slice(0, PREVIEW_LENGTH).trimEnd() + "…" : text;

  return (
    <div
      className="relative flex h-full flex-col rounded-2xl border border-cream-200 bg-white p-8 transition-all duration-500 hover:shadow-lg hover:shadow-gold-100/30"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Quote mark */}
      <svg
        className="absolute right-6 top-6 h-10 w-10 text-cream-200"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
      </svg>

      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-gold-400" : "text-cream-200"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Text */}
      <p className="mt-4 text-sm leading-relaxed text-charcoal-500 italic">
        &ldquo;{displayText}&rdquo;
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 self-start text-xs font-semibold tracking-wide text-burgundy-600 uppercase transition-colors hover:text-burgundy-700"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {/* Author */}
      <div className="mt-auto flex items-center gap-3 pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-burgundy-50">
          <span className="font-serif text-sm font-semibold text-burgundy-600">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal-800">{name}</p>
          <p className="text-xs text-gold-500">{date}</p>
        </div>
      </div>
    </div>
  );
}
