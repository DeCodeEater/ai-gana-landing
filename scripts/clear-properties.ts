/**
 * Purges all property documents from Firestore and clears static-props.json.
 *
 * Usage: npx tsx scripts/clear-properties.ts
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import * as dotenv from "dotenv";
import * as path from "node:path";
import * as fs from "node:fs";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function clearProperties() {
  console.log("🧹 Clearing all properties...\n");

  // 1. Clear local data files
  const propertiesPath = path.resolve(process.cwd(), "data/properties.json");
  const staticPropsPath = path.resolve(process.cwd(), "data/static-props.json");

  fs.writeFileSync(propertiesPath, "[]\n", "utf-8");
  fs.writeFileSync(staticPropsPath, "[]\n", "utf-8");
  console.log("✅ Cleared data/properties.json and data/static-props.json");

  // 2. Clear Firestore if credentials present
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.log("⚠️ Firebase credentials missing in env — skipping Firestore purge.");
    return;
  }

  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const existingProps = await getDocs(collection(db, "properties"));
    if (!existingProps.empty) {
      console.log(`🧹 Purging ${existingProps.size} property document(s) from Firestore...`);
      for (const d of existingProps.docs) {
        await deleteDoc(doc(db, "properties", d.id));
        console.log(`  - Deleted: ${d.id}`);
      }
      console.log("✅ Firestore properties collection is now completely empty.");
    } else {
      console.log("ℹ️ Firestore properties collection was already empty.");
    }
  } catch (err) {
    console.error("⚠️ Error purging Firestore properties:", err);
  }
}

clearProperties().catch(console.error);
