import React from "react";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/data";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  return (
    <div className="bg-bg rounded-md p-6 md:p-8 border border-border shadow-resting flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <Quote className="w-8 h-8 text-accent/20 mb-2" />
        <p className="text-ink text-base leading-relaxed italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <span className="font-display font-semibold text-ink">{testimonial.name}</span>
        <span className="text-xs text-ink-soft capitalize">
          via {testimonial.source}
        </span>
      </div>
    </div>
  );
};
