"use client";

import { useEffect, useState } from "react";
import { getProperties, getTestimonials, Property, Testimonial } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Properties } from "@/components/sections/Properties";
import { AboutMe } from "@/components/sections/AboutMe";
import { Reviews } from "@/components/sections/Reviews";
import { LetsTalk } from "@/components/sections/LetsTalk";

export default function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [props, tests] = await Promise.all([
          getProperties(),
          getTestimonials(),
        ]);
        setProperties(props);
        setTestimonials(tests);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-ink-soft text-sm font-medium">Loading properties...</p>
        </div>
      </div>
    );
  }

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
