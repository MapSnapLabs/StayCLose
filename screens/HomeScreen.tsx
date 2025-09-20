import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getWhat3Words, reverseGeocode } from "../utils/location";

export default function HomeScreen() {
  const [region, setRegion] = useState<any>(null);
  const [address, setAddress] = useState<string>("Fetching address...");
  const [w3w, setW3W] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setAddress("⚠️ Location permission denied");
          return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        };

        setRegion({
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        // Reverse geocode
        const rev = await reverseGeocode(coords.latitude, coords.longitude);
        setAddress(rev || "Address unavailable");

        // What3Words
        const w3wResult = await getWhat3Words(coords.latitude, coords.longitude);
        setW3W(w3wResult || "Not available");
      } catch (err: any) {
        console.error("HomeScreen error:", err);
        setAddress("❌ Error fetching location");
        Alert.alert("Error", err.message || "Could not fetch location");
      }
    })();
  }, []);

  if (!region) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region}>
        <Marker coordinate={region} title="You are here" pinColor="red" />
      </MapView>

      <View style={styles.infoPanel}>
        <Text style={styles.title}>📍 Current Location</Text>
        <Text numberOfLines={2}>{address}</Text>
        <Text style={styles.w3w}>/// {w3w}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  infoPanel: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  w3w: { fontStyle: "italic", color: "#4CAF50", marginTop: 6 },
});