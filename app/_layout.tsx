import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Font from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState, useEffect, useCallback } from 'react';
import Toast, { BaseToastProps } from 'react-native-toast-message';

import SplashScreen from './splash';

import { CustomToast } from '@/src/components/common/CustomToast';
import useShowToast from '@/src/hooks/useShowToast';
import { commonStyles } from '@/src/styles/commonStyles';

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
  };

  useEffect(() => {
    async function loadFonts() {
      /* eslint-disable @typescript-eslint/no-require-imports */
      await Font.loadAsync({
        'Hakgyoansim': require('../assets/fonts/Hakgyoansim-Geurimilgi.otf'),
        'Pretendard9': require('../assets/fonts/Pretendard-Black.otf'),
        'Pretendard8': require('../assets/fonts/Pretendard-ExtraBold.otf'),
        'Pretendard7': require('../assets/fonts/Pretendard-Bold.otf'),
        'Pretendard6': require('../assets/fonts/Pretendard-SemiBold.otf'),
        'Pretendard5': require('../assets/fonts/Pretendard-Medium.otf'),
        'Pretendard4': require('../assets/fonts/Pretendard-Regular.otf'),
        'Pretendard3': require('../assets/fonts/Pretendard-Light.otf'),
        'Pretendard2': require('../assets/fonts/Pretendard-ExtraLight.otf'),
        'Pretendard1': require('../assets/fonts/Pretendard-Thin.otf'),
      });
      /* eslint-enable @typescript-eslint/no-require-imports */
      setIsReady(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await SecureStore.getItemAsync('accessToken');
      const autoLogin = await SecureStore.getItemAsync('autoLogin');

      if (token && autoLogin === 'true') {
        router.replace('/(tabs)');
      } else {
        showToast('info', '로그인 필요', '로그인이 필요합니다.');
        router.replace('/signIn');
      }
    };

    if (!isSplashVisible) {
      checkLoginStatus();
    }
  }, [isSplashVisible, router, showToast]);

  useEffect(() => {
    if (isReady) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSplashVisible(true);
    }
  }, [isReady]);

  const handleSplashFinish = useCallback(() => setSplashVisible(false), []);

  return isSplashVisible ? (
    <SplashScreen onFinish={handleSplashFinish} />
  ) : (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="signIn" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: true, title: '', headerShadowVisible: false, headerStyle: commonStyles.headerStyle, headerTintColor: '#D6DEFD', }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
        <Stack.Screen name="setting" options={{ headerShown: true, title: '', headerShadowVisible: false, headerStyle: commonStyles.headerStyle, headerTintColor: '#D6DEFD',}} />
        <Stack.Screen name="edit-password" options={{ headerShown: true, title: '', headerShadowVisible: false, headerStyle: commonStyles.headerStyle, headerTintColor: '#D6DEFD',}} />
        <Stack.Screen name="recording" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
