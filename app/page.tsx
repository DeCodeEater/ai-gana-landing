import { Hero } from "@/components/sections/Hero";
import { Properties } from "@/components/sections/Properties";
import { AboutMe } from "@/components/sections/AboutMe";
import { Reviews } from "@/components/sections/Reviews";
import { LetsTalk } from "@/components/sections/LetsTalk";
import type { Property, Testimonial } from "@/lib/data";
import staticProperties from "@/data/static-props.json";
import staticTestimonials from "@/data/static-testimonials.json";

export default function HomePage() {
  const properties = staticProperties as Property[];
  const testimonials = staticTestimonials as Testimonial[];

  return (
    <>
      <Hero />
      <Properties properties={properties} />
      <AboutMe />
      <Reviews testimonials={testimonials} />
      <LetsTalk />
    </>
  );
}
