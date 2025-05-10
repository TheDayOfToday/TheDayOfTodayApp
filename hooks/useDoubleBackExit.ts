import { useEffect, useRef } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function useDoubleBackExit(enabled = true) {
  const isFocused = useIsFocused();
  const backPressedOnceRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled || !isFocused) return;

    const onBackPress = () => {
      if (backPressedOnceRef.current) {
        BackHandler.exitApp();
        return true;
      }

      backPressedOnceRef.current = true;
      ToastAndroid.show('한 번 더 누르면 앱이 종료됩니다.', ToastAndroid.SHORT);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        backPressedOnceRef.current = false;
      }, 2000);

      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      subscription.remove();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [enabled, isFocused]);
}
