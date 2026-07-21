/**
 * Build-time data generation script.
 *
 * Tries to fetch published properties and testimonials from Firestore.
 * If Firestore is unavailable or returns empty, falls back to local JSON files.
 *
 * Writes data/static-props.json and data/static-testimonials.json
 * which the homepage imports at build time for instant rendering.
 *
 * Usage: npx tsx scripts/generate-static-data.ts
 */

import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import * as dotenv from "dotenv";
import * as path from "node:path";
import * as fs from "node:fs";

import { siteConfig } from "../lib/config";

// Load .env.local (for local builds; CI uses env vars directly)
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const DATA_DIR = path.resolve(process.cwd(), "data");

function syncFavicon() {
  const relPath = siteConfig.profileImage.startsWith("/")
    ? siteConfig.profileImage.slice(1)
    : siteConfig.profileImage;
  const profileImgPath = path.resolve(process.cwd(), "public", relPath);
  if (fs.existsSync(profileImgPath)) {
    const targets = [
      path.resolve(process.cwd(), "app", "favicon.ico"),
      path.resolve(process.cwd(), "app", "icon.png"),
      path.resolve(process.cwd(), "public", "favicon.ico"),
      path.resolve(process.cwd(), "public", "icon.png"),
    ];
    for (const target of targets) {
      fs.copyFileSync(profileImgPath, target);
    }
    console.log(`🖼️  Synced face favicon from ${siteConfig.profileImage} to icon assets.`);
  }
}

interface StaticProperty {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  type: string;
  purpose: string;
  opinion?: string;
  imageUrl: string;
  whatsappMessage: string;
}

interface StaticTestimonial {
  id: string;
  name: string;
  quote: string;
  source: string;
  rating?: number;
}

async function fetchFromFirestore(): Promise<{
  properties: StaticProperty[];
  testimonials: StaticTestimonial[];
} | null> {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!apiKey || !projectId) {
    console.log("⚠️  Firebase env vars not set — skipping Firestore fetch.");
    return null;
  }

  try {
    const app =
      getApps().length === 0
        ? initializeApp({
            apiKey,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId:
              process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          })
        : getApps()[0];

    const db = getFirestore(app);

    // Fetch properties
    const propsQuery = query(
      collection(db, "properties"),
      where("published", "==", true),
      orderBy("sortOrder", "asc")
    );
    const propsSnap = await getDocs(propsQuery);
    const properties: StaticProperty[] = propsSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title,
        price: data.price,
        location: data.location,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        type: data.type,
        purpose: data.purpose,
        opinion: data.opinion || "",
        imageUrl: data.imageUrl,
        whatsappMessage: data.whatsappMessage,
      };
    });

    // Fetch testimonials
    const testsQuery = query(
      collection(db, "testimonials"),
      where("published", "==", true)
    );
    const testsSnap = await getDocs(testsQuery);
    const testimonials: StaticTestimonial[] = testsSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name,
        quote: data.quote,
        source: data.source,
        rating: data.rating || 5,
      };
    });

    if (properties.length === 0 && testimonials.length === 0) {
      console.log(
        "⚠️  Firestore returned 0 properties and 0 testimonials — falling back to local JSON."
      );
      return null;
    }

    console.log(
      `✅ Fetched ${properties.length} properties and ${testimonials.length} testimonials from Firestore.`
    );
    return { properties, testimonials };
  } catch (error) {
    console.error("⚠️  Firestore fetch failed — falling back to local JSON.");
    console.error("   Error:", (error as Error).message);
    return null;
  }
}

function loadLocalFallback(): {
  properties: StaticProperty[];
  testimonials: StaticTestimonial[];
} {
  const propertiesPath = path.join(DATA_DIR, "properties.json");
  const testimonialsPath = path.join(DATA_DIR, "testimonials.json");

  const properties: StaticProperty[] = JSON.parse(
    fs.readFileSync(propertiesPath, "utf-8")
  );
  const testimonials: StaticTestimonial[] = JSON.parse(
    fs.readFileSync(testimonialsPath, "utf-8")
  );

  console.log(
    `📦 Loaded ${properties.length} properties and ${testimonials.length} testimonials from local JSON.`
  );
  return { properties, testimonials };
}

async function main() {
  console.log("🔧 Generating static data for build...\n");
  syncFavicon();

  let data = await fetchFromFirestore();
  if (!data) {
    data = loadLocalFallback();
  }

  // Write output files
  const propsOut = path.join(DATA_DIR, "static-props.json");
  const testsOut = path.join(DATA_DIR, "static-testimonials.json");

  fs.writeFileSync(propsOut, JSON.stringify(data.properties, null, 2), "utf-8");
  fs.writeFileSync(
    testsOut,
    JSON.stringify(data.testimonials, null, 2),
    "utf-8"
  );

  console.log(`\n✅ Wrote ${propsOut}`);
  console.log(`✅ Wrote ${testsOut}`);
  console.log("\n🎉 Static data ready for build.");

  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Static data generation failed:", err);
  process.exit(1);
});
