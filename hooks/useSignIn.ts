import { useRouter } from 'expo-router';
import { useFetchToken } from './useFetchToken';
import useShowToast from './useShowToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSignIn = () => {
  const router = useRouter();
  const showToast = useShowToast();
  const { fetchToken, loading, error } = useFetchToken();

  const login = async (email: string, password: string, autoLogin: boolean) => {
  try {
    await fetchToken(email, password);
    if (autoLogin) {
      await AsyncStorage.setItem('autoLogin', 'true');
    } else {
      await AsyncStorage.removeItem('autoLogin');
    }
    router.replace('/(tabs)');
  } catch (err: any) {
    showToast('error', '로그인 실패', '이메일 또는 비밀번호가 잘못되었습니다.');
  }
};

  const goToSignUp = () => {
    router.push('/signUp');
  };

  return { login, goToSignUp, loading, error };
};
