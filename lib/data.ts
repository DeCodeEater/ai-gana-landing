import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  type: "apartment" | "house" | "land" | "commercial";
  purpose: "rent" | "sale";
  opinion?: string;
  imageUrl: string;
  whatsappMessage: string;
  published: boolean;
  sortOrder: number;
  createdAt?: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  source: "google" | "manual";
  rating?: number;
  published: boolean;
  createdAt?: Date;
}

export interface Lead {
  id?: string;
  source: string;
  propertyId?: string;
  propertyTitle?: string;
  timestamp: Date;
  userAgent: string;
  referrer: string;
}

// ─── Property Queries ────────────────────────────────────────────

export async function getProperties(): Promise<Property[]> {
  try {
    const q = query(
      collection(db, "properties"),
      where("published", "==", true),
      orderBy("sortOrder", "asc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Property[];
  } catch (error) {
    console.error("Error fetching properties from Firestore:", error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, "properties", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Property;
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return null;
  }
}

// ─── Testimonial Queries ─────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(
      collection(db, "testimonials"),
      where("published", "==", true)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error("Error fetching testimonials from Firestore:", error);
    return [];
  }
}

// ─── Lead Logging ────────────────────────────────────────────────

export async function logLead(lead: Omit<Lead, "id">): Promise<void> {
  try {
    await addDoc(collection(db, "leads"), {
      ...lead,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    // Silently fail — don't break the user experience for analytics
    console.error("Failed to log lead:", error);
  }
}
