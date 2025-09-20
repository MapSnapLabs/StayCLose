import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import Constants from "expo-constants";

// ✅ Support both Expo Go (manifest) and EAS builds (expoConfig)
const extra =
  Constants.expoConfig?.extra ||
  Constants.manifest?.extra ||
  {};

const firebaseConfig = {
  apiKey: extra.firebaseApiKey,
  authDomain: extra.firebaseAuthDomain,
  projectId: extra.firebaseProjectId,
  storageBucket: extra.firebaseStorageBucket,
  messagingSenderId: extra.firebaseMessagingSenderId,
  appId: extra.firebaseAppId,
  measurementId: extra.firebaseMeasurementId,
};

// ✅ Initialize only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ✅ Auto anonymous login
signInAnonymously(auth)
  .then(() => console.log("✅ Firebase anonymous sign-in successful"))
  .catch((err) => console.error("🔥 Firebase anonymous sign-in failed:", err));

// ✅ Track auth state
onAuthStateChanged(auth, (user) => {
  if (user) console.log("👤 Signed in:", user.uid);
  else console.log("🚪 Signed out");
});