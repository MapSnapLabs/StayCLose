import React, { useRef, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Video } from "expo-av";

export default function VideoRecorder() {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
      setHasPermission(status === "granted" && audioStatus === "granted");
    })();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        setVideoUri(video.uri);
        setIsRecording(false);
      } catch (err) {
        console.error("Video recording error:", err);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <View><Button title="No access to camera/microphone" disabled /></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      {!videoUri ? (
        <Camera
          style={{ flex: 1 }}
          type={CameraType.back}
          ref={cameraRef}
        >
          {isRecording ? (
            <Button title="Stop Recording" onPress={stopRecording} />
          ) : (
            <Button title="Start Recording" onPress={startRecording} />
          )}
        </Camera>
      ) : (
        <Video
          source={{ uri: videoUri }}
          style={{ flex: 1 }}
          useNativeControls
          resizeMode="contain"
          shouldPlay
        />
      )}
    </View>
  );
}