import 'dotenv/config';

export default {
  name: "StayClose",
  slug: "StayClose",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    bundleIdentifier: "com.mapsnaplabs.stayclose",
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  android: {
    package: "com.mapsnaplabs.stayclose",
    permissions: ["CAMERA", "ACCESS_FINE_LOCATION", "SEND_SMS"],
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  extra: {
    // 🔑 Firebase keys from .env
    firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    firebaseMeasurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,

    // Maps & What3Words
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    w3wApiKey: process.env.EXPO_PUBLIC_W3W_API_KEY,

    // ✅ Important: Add this so Constants knows it's public
    eas: {
      projectId: "stayclose-2c73f", // Your Firebase projectId (safe to expose)
    }
  },
};