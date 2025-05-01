import React, { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as Font from "expo-font";
import SplashScreen from "./splash";
import Toast, { BaseToastProps } from "react-native-toast-message";
import CustomToast from '@/components/CustomToast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useShowToast from "@/hooks/useShowToast";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isSplashVisible, setSplashVisible] = useState(true);
  const router = useRouter();
  const showToast = useShowToast();

  const toastConfig = {
    success: (props: BaseToastProps) => <CustomToast {...props} type="success" />,
    error: (props: BaseToastProps) => <CustomToast {...props} type="error" />,
    info: (props: BaseToastProps) => <CustomToast {...props} type="info" />,
  }

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
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) {
        console.warn('토큰이 없습니다. 로그인을 해주세요.');
        showToast('error', '로그인 필요', '로그인이 필요합니다.');  
      }
      router.replace('/signIn');
    };

    if (!isSplashVisible) {
      checkLoginStatus();
    }
  }, [isSplashVisible]);

  useEffect(() => {
    if (isReady) {
      setSplashVisible(true);
    }
  }, [isReady]);

  return isSplashVisible ? (
    <SplashScreen onFinish={() => setSplashVisible(false)} />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="signIn" options={{headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
