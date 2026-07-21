import React from "react";
import { Testimonial } from "@/lib/data";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

interface ReviewsProps {
  testimonials: Testimonial[];
}

export const ReviewsMobile: React.FC<ReviewsProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <SectionContainer id="reviews" surface={true}>
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="font-display text-3xl font-bold text-ink tracking-tight">
          What Clients Say
        </h2>
        <p className="text-ink-soft mt-2 text-base">
          Feedback from people I&apos;ve helped find properties in Abuja.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    </SectionContainer>
  );
};
