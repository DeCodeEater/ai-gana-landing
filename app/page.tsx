import { getProperties, getTestimonials } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { Properties } from "@/components/sections/Properties";
import { AboutMe } from "@/components/sections/AboutMe";
import { WhyWorkWithMe } from "@/components/sections/WhyWorkWithMe";
import { GetToKnowMe } from "@/components/sections/GetToKnowMe";
import { Reviews } from "@/components/sections/Reviews";
import { LetsTalk } from "@/components/sections/LetsTalk";

export default async function HomePage() {
  const properties = await getProperties();
  const testimonials = await getTestimonials();

  return (
    <>
      <Hero />
      <Properties properties={properties} />
      <AboutMe />
      <WhyWorkWithMe />
      <GetToKnowMe />
      <Reviews testimonials={testimonials} />
      <LetsTalk />
    </>
  );
}
