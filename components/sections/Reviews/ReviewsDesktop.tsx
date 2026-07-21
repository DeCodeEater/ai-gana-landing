import React from "react";
import { Testimonial } from "@/lib/data";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

interface ReviewsProps {
  testimonials: Testimonial[];
}

export const ReviewsDesktop: React.FC<ReviewsProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <SectionContainer id="reviews" surface={true}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="font-display text-4xl font-bold text-ink tracking-tight">
          What Clients Say
        </h2>
        <p className="text-ink-soft mt-3 text-lg">
          Feedback from people I&apos;ve helped find properties in Abuja.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </SectionContainer>
  );
};
