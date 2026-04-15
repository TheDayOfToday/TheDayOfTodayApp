import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import useShowToast from './useShowToast';

import { useFetchToken } from '@/src/queries/useAuthQuery';

export const useSignIn = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const { fetchToken, loading, error } = useFetchToken();

  const login = async (email: string, password: string, autoLogin: boolean) => {
    try {
      await fetchToken(email, password);
      if (autoLogin) {
        await SecureStore.setItemAsync('autoLogin', 'true');
      } else {
        await SecureStore.deleteItemAsync('autoLogin');
      }
      router.replace('/(tabs)');
    } catch {
      showToast('error', '로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  const goToSignUp = () => {
    router.push('/signUp');
  };

  return { login, goToSignUp, loading, error };
};
