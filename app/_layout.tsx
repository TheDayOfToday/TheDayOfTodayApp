import React, { useState } from "react";
import { Stack } from "expo-router";
import SplashScreen from "./splash";

export default function RootLayout() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  return isSplashVisible ? (
    <SplashScreen onFinish={() => setSplashVisible(false)} />
  ) : (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
