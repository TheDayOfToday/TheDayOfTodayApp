import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

function useShowToast() {
  const showToast = useCallback((type: ToastType, title: string, message: string) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      visibilityTime: 1500,
    });
  }, []);

  return showToast;
}

export default useShowToast;
