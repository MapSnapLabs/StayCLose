const fs = require("fs");
const path = require("path");

const structure = {
  "assets": {
    "icon.png": "",
    "splash.png": ""
  },
  "components": {
    "ShakeDetector.tsx": `import React, { useEffect } from "react";
import { Text } from "react-native";
import { Accelerometer } from "expo-sensors";

export default function ShakeDetector() {
  useEffect(() => {
    const sub = Accelerometer.addListener(({ x, y, z }) => {
      const totalForce = Math.sqrt(x * x + y * y + z * z);
      if (totalForce > 2.5) {
        console.log("Shake detected!");
      }
    });
    return () => sub && sub.remove();
  }, []);

  return <Text>Shake to trigger SOS</Text>;
}`,
    "VideoRecorder.tsx": `import React from "react";
import { Text, View } from "react-native";

export default function VideoRecorder() {
  return (
    <View>
      <Text>Video Recorder (to be implemented)</Text>
    </View>
  );
}`,
    "VoiceDetector.tsx": `import React from "react";
import { Text, View } from "react-native";

export default function VoiceDetector() {
  return (
    <View>
      <Text>Listening for Safe Word...</Text>
    </View>
  );
}`
  },
  "screens": {
    "SetupScreen.tsx": `import React from "react";
import { View, Text, Button } from "react-native";

export default function SetupScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to StayClose</Text>
      <Button title="Continue to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}`,
    "HomeScreen.tsx": `import React from "react";
import { View, Text, Button } from "react-native";
import ShakeDetector from "../components/ShakeDetector";
import VoiceDetector from "../components/VoiceDetector";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <ShakeDetector />
      <VoiceDetector />
      <Button title="Go to Alert" onPress={() => navigation.navigate("Alert")} />
    </View>
  );
}`,
    "AlertScreen.tsx": `import React from "react";
import { View, Text } from "react-native";
import VideoRecorder from "../components/VideoRecorder";

export default function AlertScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🚨 Alert Triggered!</Text>
      <VideoRecorder />
    </View>
  );
}`
  },
  "utils": {
    "firebase.ts": `import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

signInAnonymously(auth).catch((err) => console.error("Anon sign-in failed:", err));

export { auth, db, storage };`,
    "auth.ts": `import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export function watchAuth(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}`,
    "location.ts": `import * as Location from "expo-location";

export async function getCurrentLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    throw new Error("Location permission denied");
  }
  return await Location.getCurrentPositionAsync({});
}`,
    "sms.ts": `import * as SMS from "expo-sms";

export async function sendSMS(phone: string, message: string) {
  const { result } = await SMS.sendSMSAsync([phone], message);
  return result;
}`
  },
  "App.tsx": `import "./utils/firebase";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SetupScreen from "./screens/SetupScreen";
import HomeScreen from "./screens/HomeScreen";
import AlertScreen from "./screens/AlertScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Setup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Setup" component={SetupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Alert" component={AlertScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`
};

// create recursively
function createFiles(base, obj) {
  for (const key in obj) {
    const val = obj[key];
    const filePath = path.join(base, key);

    if (typeof val === "object") {
      if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);
      createFiles(filePath, val);
    } else {
      fs.writeFileSync(filePath, val, "utf8");
    }
  }
}

createFiles(".", structure);
console.log("✅ StayClose Phase 2 scaffold complete!");