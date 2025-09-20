import React, { useEffect } from "react";
import { Text } from "react-native";
import { Audio } from "expo-av";

type Props = {
  onVoiceStart?: () => void;
};

export default function VoiceDetector({ onVoiceStart }: Props) {
  useEffect(() => {
    const start = async () => {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return;

      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();

      if (onVoiceStart) onVoiceStart();
    };

    start();
  }, []);

  return <Text>VoiceDetector Active</Text>;
}