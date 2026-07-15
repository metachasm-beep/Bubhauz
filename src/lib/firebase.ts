import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize if we actually have a config (or dummy for build)
const app = !getApps().length ? initializeApp(firebaseConfig.apiKey ? firebaseConfig : {
  ...firebaseConfig,
  apiKey: "dummy-key-for-build-time-ignore",
}) : getApp();

export const db = getFirestore(app);

let auth: Auth | null = null;
try {
  // Prevent build errors when API key is missing/dummy
  if (firebaseConfig.apiKey) {
    auth = getAuth(app);
  }
} catch (e) {
  console.warn("Firebase Auth not initialized (likely build time).");
}

export { auth };
export default app;
