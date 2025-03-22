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
        "Hakgyoansim": require("../assets/fonts/Hakgyoansim-Geurimilgi.otf"),
        "Pretendard9": require("../assets/fonts/Pretendard-Black.otf"),
        "Pretendard8": require("../assets/fonts/Pretendard-ExtraBold.otf"),
        "Pretendard7": require("../assets/fonts/Pretendard-Bold.otf"),
        "Pretendard6": require("../assets/fonts/Pretendard-SemiBold.otf"),
        "Pretendard5": require("../assets/fonts/Pretendard-Medium.otf"),
        "Pretendard4": require("../assets/fonts/Pretendard-Regular.otf"),
        "Pretendard3": require("../assets/fonts/Pretendard-Light.otf"),
        "Pretendard2": require("../assets/fonts/Pretendard-ExtraLight.otf"),
        "Pretendard1": require("../assets/fonts/Pretendard-Thin.otf"),
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
      <Stack.Screen name="signIn" options={{headerShown: false}}/>
      <Stack.Screen name="SignUp" options={{headerShown: false}}/>
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
