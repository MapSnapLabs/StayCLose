import React, { useEffect } from "react";
import { Text } from "react-native";
import { Accelerometer } from "expo-sensors";

type Props = {
  onShake?: () => void;
};

export default function ShakeDetector({ onShake }: Props) {
  useEffect(() => {
    let subscription: any;
    let lastX = 0, lastY = 0, lastZ = 0;
    let lastUpdate = 0;

    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const now = Date.now();
      if (now - lastUpdate > 100) {
        const diffTime = now - lastUpdate;
        lastUpdate = now;

        const speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000;
        if (speed > 800 && onShake) {
          onShake();
        }
        lastX = x;
        lastY = y;
        lastZ = z;
      }
    });

    return () => subscription && subscription.remove();
  }, []);

  return <Text>ShakeDetector Active</Text>;
}