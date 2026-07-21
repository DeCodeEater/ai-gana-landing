import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";
import type { Property, Testimonial, Lead } from "./data";
import type { SiteConfig } from "./config";

// ─── Properties CRUD ─────────────────────────────────────────────

export async function getAllProperties(): Promise<Property[]> {
  try {
    const snapshot = await getDocs(collection(db, "properties"));
    const items = snapshot.docs.map((d: QueryDocumentSnapshot) => ({
      id: d.id,
      ...d.data(),
    })) as Property[];
    return items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch (error) {
    console.error("Error fetching all properties:", error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  try {
    const docRef = doc(db, "properties", id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Property;
  } catch (error) {
    console.error("Error fetching property by id:", error);
    return null;
  }
}

export async function uploadPropertyImage(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `properties/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
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
    return snapshot.docs.map((d: QueryDocumentSnapshot) => ({
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
    return snapshot.docs.map((d: QueryDocumentSnapshot) => {
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

// ─── Site Settings & Assets ──────────────────────────────────────

export async function uploadSiteImage(file: File, assetName: string): Promise<string> {
  const fileExt = file.name.split(".").pop() || "jpg";
  const fileName = `site_assets/${assetName}_${Date.now()}.${fileExt}`;
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

export async function getSiteSettings(): Promise<Partial<SiteConfig> | null> {
  try {
    const docRef = doc(db, "site_settings", "general");
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return snap.data() as Partial<SiteConfig>;
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function updateSiteSettings(
  data: Partial<SiteConfig>
): Promise<void> {
  const docRef = doc(db, "site_settings", "general");
  await setDoc(docRef, data, { merge: true });
}
