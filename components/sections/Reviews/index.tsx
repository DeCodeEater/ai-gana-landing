import React from "react";
import { Testimonial } from "@/lib/data";
import { ReviewsDesktop } from "./ReviewsDesktop";
import { ReviewsMobile } from "./ReviewsMobile";

interface ReviewsProps {
  testimonials: Testimonial[];
}

export const Reviews: React.FC<ReviewsProps> = (props) => {
  return (
    <>
      <div className="block md:hidden">
        <ReviewsMobile {...props} />
      </div>
      <div className="hidden md:block">
        <ReviewsDesktop {...props} />
      </div>
    </>
  );
};
