import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import * as Font from "expo-font";
import SplashScreen from "./splash";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "EulyooR": require("../assets/fonts/Eulyoo1945-Regular.ttf"),
        "EulyooB": require("../assets/fonts/Eulyoo1945-SemiBold.ttf"),
        "SCDream1": require("../assets/fonts/SCDream1.otf"),
        "SCDream2": require("../assets/fonts/SCDream2.otf"),
        "SCDream3": require("../assets/fonts/SCDream3.otf"),
        "SCDream4": require("../assets/fonts/SCDream4.otf"),
        "SCDream5": require("../assets/fonts/SCDream5.otf"),
        "SCDream6": require("../assets/fonts/SCDream6.otf"),
        "SCDream7": require("../assets/fonts/SCDream7.otf"),
        "SCDream8": require("../assets/fonts/SCDream8.otf"),
        "SCDream9": require("../assets/fonts/SCDream9.otf"),
      });
      setIsReady(true);
    }
    
    loadFonts();
  }, []);

  useEffect(() => {
    if (isReady) {
      setSplashVisible(true);
    }
  }, [isReady]);

  return isSplashVisible ? (
    <SplashScreen onFinish={() => setSplashVisible(false)} />
  ) : (
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
