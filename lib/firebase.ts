import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { progressKeys } from "./progress";

const firebaseConfig = {
  apiKey: "AIzaSyAsH422hZ4LOU6mf9q_pSakPi5fWmEI_uw",
  authDomain: "aclan-english-coach.firebaseapp.com",
  projectId: "aclan-english-coach",
  storageBucket: "aclan-english-coach.firebasestorage.app",
  messagingSenderId: "648501320850",
  appId: "1:648501320850:web:ef455f8d5a55cbaf25da4b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const syncedStorageKeys = Object.values(progressKeys);

export type CloudProgress = {
  storage: Record<string, string>;
  updatedAt: string;
  deviceName: string;
};

export async function ensureAnonymousUser() {
  if (auth.currentUser) return auth.currentUser;
  const credential = await signInAnonymously(auth);
  return credential.user;
}

export async function syncCodeToId(syncCode: string) {
  const normalized = syncCode.trim();
  const bytes = new TextEncoder().encode(normalized);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function collectLocalProgress() {
  return syncedStorageKeys.reduce<Record<string, string>>((storage, key) => {
    const value = localStorage.getItem(key);
    if (value !== null) storage[key] = value;
    return storage;
  }, {});
}

export function applyCloudProgress(storage: Record<string, string>) {
  syncedStorageKeys.forEach((key) => {
    if (storage[key] !== undefined) {
      localStorage.setItem(key, storage[key]);
    }
  });
}

export async function loadCloudProgress(syncId: string) {
  await ensureAnonymousUser();
  const snapshot = await getDoc(doc(db, "syncs", syncId));
  return snapshot.exists() ? (snapshot.data() as CloudProgress) : null;
}

export async function saveCloudProgress(syncId: string) {
  await ensureAnonymousUser();
  const payload: CloudProgress = {
    storage: collectLocalProgress(),
    updatedAt: new Date().toISOString(),
    deviceName: navigator.platform || "web"
  };

  await setDoc(doc(db, "syncs", syncId), payload, { merge: true });
  return payload;
}
