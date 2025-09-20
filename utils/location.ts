import * as Location from "expo-location";

// Google Maps + What3Words API keys from .env
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const W3W_API_KEY = process.env.EXPO_PUBLIC_W3W_API_KEY;

export async function getCurrentLocation() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return null; // gracefully fail
    }
    return await Location.getCurrentPositionAsync({});
  } catch (err) {
    console.error("getCurrentLocation error:", err);
    return null;
  }
}

export async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "OK" && data.results?.length > 0) {
      return data.results[0].formatted_address;
    }
    return "Unknown address";
  } catch (err) {
    console.error("reverseGeocode error:", err);
    return "Unknown address";
  }
}

export async function getWhat3Words(lat: number, lng: number): Promise<string> {
  try {
    const url = `https://api.what3words.com/v3/convert-to-3wa?coordinates=${lat},${lng}&key=${W3W_API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data?.words) return data.words;
    return "Unknown words";
  } catch (err) {
    console.error("getWhat3Words error:", err);
    return "Unknown words";
  }
}