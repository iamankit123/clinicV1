interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {label && (
        <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
          {label}
        </p>
      )}
      <h2
        className={`mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-charcoal-800"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
            light ? "text-charcoal-300" : "text-charcoal-400"
          } ${centered ? "" : "mx-0"}`}
        >
          {subtitle}
        </p>
      )}
      <div className={`luxury-divider mt-6 ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
