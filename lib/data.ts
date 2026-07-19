import propertiesData from "@/data/properties.json";
import testimonialsData from "@/data/testimonials.json";

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  type: "apartment" | "house" | "land" | "commercial";
  imageUrl: string;
  whatsappMessage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  source: "google" | "manual";
  rating?: number;
}

export async function getProperties(): Promise<Property[]> {
  return propertiesData as Property[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonialsData as Testimonial[];
}
