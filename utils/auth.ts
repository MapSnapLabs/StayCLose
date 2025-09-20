import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

/**
 * Watches the Firebase auth state and fires callback with user object.
 */
export function watchAuth(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}