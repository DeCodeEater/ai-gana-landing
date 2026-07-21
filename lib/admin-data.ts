import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Property, Testimonial, Lead } from "./data";

// ─── Properties CRUD ─────────────────────────────────────────────

export async function getAllProperties(): Promise<Property[]> {
  try {
    const q = query(collection(db, "properties"), orderBy("sortOrder", "asc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Property[];
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return [];
  }
}

export async function createProperty(
  data: Omit<Property, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "properties"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProperty(
  id: string,
  data: Partial<Omit<Property, "id">>
): Promise<void> {
  const docRef = doc(db, "properties", id);
  await updateDoc(docRef, data);
}

export async function deleteProperty(id: string): Promise<void> {
  await deleteDoc(doc(db, "properties", id));
}

// ─── Testimonials CRUD ───────────────────────────────────────────

export async function getAllTestimonials(): Promise<Testimonial[]> {
  try {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Testimonial[];
  } catch (error) {
    console.error("Error fetching all testimonials:", error);
    return [];
  }
}

export async function createTestimonial(
  data: Omit<Testimonial, "id" | "createdAt">
): Promise<string> {
  const docRef = await addDoc(collection(db, "testimonials"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateTestimonial(
  id: string,
  data: Partial<Omit<Testimonial, "id">>
): Promise<void> {
  const docRef = doc(db, "testimonials", id);
  await updateDoc(docRef, data);
}

export async function deleteTestimonial(id: string): Promise<void> {
  await deleteDoc(doc(db, "testimonials", id));
}

// ─── Leads Read ──────────────────────────────────────────────────

export async function getLeads(): Promise<Lead[]> {
  try {
    const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        source: data.source || "",
        propertyId: data.propertyId || undefined,
        propertyTitle: data.propertyTitle || undefined,
        timestamp:
          data.timestamp instanceof Timestamp
            ? data.timestamp.toDate()
            : new Date(data.timestamp || Date.now()),
        userAgent: data.userAgent || "",
        referrer: data.referrer || "",
      };
    }) as Lead[];
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
}
