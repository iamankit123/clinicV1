interface ServiceCardProps {
  title: string;
  description: string;
  index: number;
}

export default function ServiceCard({ title, description, index }: ServiceCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-cream-200 bg-white p-6 transition-all duration-500 hover:border-gold-300 hover:shadow-xl hover:shadow-gold-100/50 sm:p-8"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Subtle top accent */}
      <div className="absolute left-0 top-0 h-1 w-0 rounded-r-full bg-gradient-to-r from-burgundy-500 to-gold-400 transition-all duration-500 group-hover:w-full" />

      {/* Number */}
      <span className="font-serif text-3xl font-bold text-cream-200 transition-colors duration-500 group-hover:text-gold-200">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="mt-3 font-serif text-lg font-semibold text-charcoal-800 transition-colors duration-300 group-hover:text-burgundy-600">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-charcoal-400">
        {description}
      </p>
    </div>
  );
}
