import React from "react";
import { View, Text } from "react-native";
import VideoRecorder from "../components/VideoRecorder";

export default function AlertScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>🚨 Alert Triggered!</Text>
      <VideoRecorder />
    </View>
  );
}