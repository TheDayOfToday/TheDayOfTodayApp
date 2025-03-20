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
        "MaruBuri5": require("../assets/fonts/MaruBuri-Bold.otf"),
        "MaruBuri4": require("../assets/fonts/MaruBuri-SemiBold.otf"),
        "MaruBuri3": require("../assets/fonts/MaruBuri-Regular.otf"),
        "MaruBuri2": require("../assets/fonts/MaruBuri-Light.otf"),
        "MaruBuri1": require("../assets/fonts/MaruBuri-ExtraLight.otf"),
        "NanumSquare5": require("../assets/fonts/NanumSquareNeoOTF-Hv.otf"),
        "NanumSquare4": require("../assets/fonts/NanumSquareNeoOTF-Eb.otf"),
        "NanumSquare3": require("../assets/fonts/NanumSquareNeoOTF-Bd.otf"),
        "NanumSquare2": require("../assets/fonts/NanumSquareNeoOTF-Rg.otf"),
        "NanumSquare1": require("../assets/fonts/NanumSquareNeoOTF-Lt.otf"),
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
      <Stack.Screen name="signIn" />
      <Stack.Screen name="SignUp" />
      <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
