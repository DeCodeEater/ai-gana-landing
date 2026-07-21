/**
 * One-time seed script: uploads existing JSON data to Firestore.
 *
 * Usage:
 *   1. Make sure .env.local has all NEXT_PUBLIC_FIREBASE_* values filled in
 *   2. Run: npx tsx scripts/seed-firestore.ts
 *   3. Check Firebase Console → Firestore to verify data
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as dotenv from "dotenv";
import * as path from "node:path";
import * as fs from "node:fs";

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const missing = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length > 0) {
  console.error("❌ Missing Firebase config values in .env.local:", missing.join(", "));
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("🔥 Seeding Firestore...\n");

  // ─── Properties ──────────────────────────────────────────────
  const propertiesPath = path.resolve(process.cwd(), "data/properties.json");
  const propertiesRaw = fs.readFileSync(propertiesPath, "utf-8");
  const properties = JSON.parse(propertiesRaw);

  console.log(`📦 Seeding ${properties.length} properties...`);
  for (let i = 0; i < properties.length; i++) {
    const prop = properties[i];
    await addDoc(collection(db, "properties"), {
      title: prop.title,
      price: prop.price,
      location: prop.location,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      type: prop.type,
      purpose: prop.purpose,
      opinion: prop.opinion || "",
      imageUrl: prop.imageUrl,
      whatsappMessage: prop.whatsappMessage,
      published: true,
      sortOrder: i,
      createdAt: new Date(),
    });
    console.log(`  ✅ ${prop.title}`);
  }

  // ─── Testimonials ────────────────────────────────────────────
  const testimonialsPath = path.resolve(process.cwd(), "data/testimonials.json");
  const testimonialsRaw = fs.readFileSync(testimonialsPath, "utf-8");
  const testimonials = JSON.parse(testimonialsRaw);

  if (testimonials.length > 0) {
    console.log(`\n📦 Seeding ${testimonials.length} testimonials...`);
    for (const test of testimonials) {
      await addDoc(collection(db, "testimonials"), {
        name: test.name,
        quote: test.quote,
        source: test.source,
        rating: test.rating || 5,
        published: true,
        createdAt: new Date(),
      });
      console.log(`  ✅ ${test.name}`);
    }
  } else {
    console.log("\n📦 No testimonials to seed (empty array).");
  }

  console.log("\n🎉 Seeding complete! Check Firebase Console → Firestore.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
